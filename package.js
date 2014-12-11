Package.describe({
  summary: "Provides Meteor collections for common stock market instruments, synced with a market data provider."
});

Package.on_use(function (api, where) {
  api.add_files('lib/market_data_provider.js', ['client', 'server']);
  api.add_files('lib/providers/yahoo.js', ['client', 'server']);
  api.add_files('lib/dividends.js', ['client', 'server']);
  
  Npm.depends({'csv':"0.3.6"});

  api.export('MarketDataProvider', ['client', 'server']);
  api.export('YahooFinance', ['client', 'server']);
  api.export('Dividends', ['client', 'server']);

});

Package.on_test(function (api) {
  api.use('meteor-finance');
  api.use('tinytest', ['client', 'server']);

  api.add_files('test/market_data_provider_test.js', ['client', 'server']);
  api.add_files('test/dividends_test.js', ['client', 'server']);
});
