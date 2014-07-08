MarketData = function(options) {
  var self = this;
  self.options = options;
};

MarketData.prototype = {
  configure: function(options) {
    var self = this;
    options = options || {};
    // Only override passed options, don't reset this.options
    self.options = self.options || {};
    _.extend(self.options, options);
    return self;
  },
  processMarketData = function (url, params, dataHandler) {
    
  }
}

Meteor.methods({

  /* Performs an upsert on Stocks collection for a given set of fields 
  *  (Array: options.fields) of given stock symbols (Array: options.symbols) 
  */
  refreshStocks: function(options) {
    if (_.isUndefined(options)) { options = {}; }

    try {
      check(options, Match.ObjectIncluding({
        'symbols': [String],
        'fields' : Match.Optional([String])
      }));

      check( options.symbols, Match.Where(function(item) {
        return ! _.isEmpty(item);
      }));
    } catch(error) {
      console.log(error);
      throw new Meteor.Error(error.sanitizedError.error, 'Could not refresh stock prices, please contact technical support.');
    }

    // fetch standard fields if undefined
    if (!options.fields) {
      options.fields = ['s', 'n', 'l1', 'c1', 'p2', 'm', 'k', 'v', 'a2', 'j1', 'r', 'y', 'e', 'e1'];
    }

    // Avoid CSV column result mis-alignment (000,000,000).
    options.fields = _.without(options.fields, 't6', 'f6', 'j2', 'a5', 'b6', 'k3');

    var url = 'http://download.finance.yahoo.com/d/quotes.csv';

    // Get data from market data provider; throw connection error if unavilable
    try {
      var results = HTTP.get( url, { params: {
        s: options.symbols.join(','),
        f: options.fields.join('')
      } } );
    } catch(error) {
      throw new Meteor.Error(504, 'Market data provider unavailable. Stocks may be unavailable and/or prices etc. may be out of date.');
    }

    // FOR OFFLINE DEV
    // var results = {
    //   statusCode: 200,
    //   content: '"YHOO","Yahoo! Inc.",34.26,-1.50,"33.83 - 36.0499",41.72,41049936,41049936,34.582B,28.38,N/A,1.26'
    // };

    // Hack to handle invalid stock symbols
    if (results.content.substr(-6,3) != "N/A") {
      throw new Meteor.Error(404, "No such stock exists.");
    }

    // Grab CSV file from Yahoo Finance and for each stock, insert a new Stock to the collection
    try {
      if (results.statusCode == 200) {

        CSV().from.string(results.content).to.array( Meteor.bindEnvironment(function (data) {
          var items = _.map(data, function (line, i) {
            var result = {},
                symbol = options.symbols[i],
                lineIdx = 0,
                field,
                fieldIdx,
                value;

            for (fieldIdx = 0; fieldIdx < options.fields.length; ++fieldIdx) {
              field = options.fields[fieldIdx];
              value = line[lineIdx++];

              result[STOCK_FIELDS[field]] = value;
            }

            assert(line.length === lineIdx, 'CSV column mis-alignment error');

            return result;
          });
          // console.log('Loading Stock Prices...');

          _.each(items, function (item) {
            item.change        = numeral().unformat(item.change);
            item.changePercent = numeral().unformat(item.changePercent);
            item.lastTrade     = numeral().unformat(item.lastTrade);
            Stocks.upsert( { symbol: item.symbol }, item );
          });

        }) );
      }
    } catch(error) {
      throw new Meteor.Error(500, error.message);
    }
  }

});