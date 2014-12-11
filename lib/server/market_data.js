// Constructor takes MarketDataProvider, defaults to YahooFinance
MarketData = function(provider) {
  this.provider = provider || YahooFinance;
};

MarketData.prototype = {
  // configure: function(options) {
  //   var self = this;
  //   options = options || {};
  //   // Only override passed options, don't reset this.options
  //   self.options = self.options || {};
  //   _.extend(self.options, options);
  //   return self;
  // },

  /*
  options: {
    dataType: 'stock',
    symbols: ['BHP.AX'],
    fields: ['symbol', 'name', 'lastTrade'],
    dataHandler: function(item) {Stocks.insert(item);},
  }
  */
  refresh: function(options, callback) {

    // Make HTTP request to market data provider for given data type
    try {
      var results = HTTP.get( urls[ options.dataType ], { params: {
        s: options.symbols.join(','),
        f: options.fields.join('')
      } } );
    } catch(error) {
      callback(error);
    }

  }

};