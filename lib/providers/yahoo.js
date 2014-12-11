
// Field conversions for Yahoo Finance
var YAHOO_FIELDS = {
  'change'            : 'c1',
  'changePercent'     : 'p2',
  'daysRange'         : 'm',
  'dividendYield'     : 'y',
  'earningsPerShare'  : 'e',
  'error'             : 'e1',
  'fiftyTwoWeekHigh'  : 'k',
  'lastTrade'         : 'l1',
  'marketCap'         : 'j1',
  'name'              : 'n',
  'priceEarningsRatio': 'r',
  'sharesOwned'       : 's1',
  'symbol'            : 's',
  'volume'            : 'v'
};

YahooFinance = new MarketDataProvider({
  fields: YAHOO_FIELDS,
  getDividends: function(/* symbols, start, end, callback */) {
    var self = this,
        args = _.toArray(arguments),
        url  = 'http://ichart.finance.yahoo.com/table.csv';
    
    var symbols  = args[0],
        start    = args[1],
        end      = args[2],
        callback = args[3];

    var results = {
      statusCode: 200,
      content: 'Date,Dividends\n2010-12-16,0.070000\n2010-09-30,0.060000\n2010-06-16,0.060000\n2010-03-17,0.060000'
    };

    try {

      CSV().from.string(results.content).to.array( Meteor.bindEnvironment( function (data) {

        console.log(data);
      } ) );

    } catch(error) {
      callback(error);
    }   
  },
  getStocks: function(symbols, fields, callback) {
    var self = this;
    var yahooFields = self.convertFields(fields);

    // Get data from market data provider; throw connection error if unavilable
    try {
      var results = HTTP.get( url, { params: {
        s: symbols.join(','),
        f: yahooFields.join('')
      } } );
    } catch(error) {
      // throw new Meteor.Error(504, 'Market data provider unavailable. Stocks may be unavailable and/or prices etc. may be out of date.');
      callback(error);
    }

    // FOR OFFLINE DEV
    // var results = {
    //   statusCode: 200,
    //   content: '"YHOO","Yahoo! Inc.",34.26,-1.50,"33.83 - 36.0499",41.72,41049936,41049936,34.582B,28.38,N/A,1.26'
    // };

    // Hack to handle invalid stock symbols
    if (results.content.substr(-6,3) != "N/A") {
      // throw new Meteor.Error(404, "No such stock exists.");
      callback({error: 404, reason: "No such stock exists."});
    }

    // Grab CSV file from Yahoo Finance and for each stock, insert a new Stock to the collection
    try {
      if (results.statusCode == 200) {

        CSV().from.string(results.content).to.array( Meteor.bindEnvironment( function (data) {
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