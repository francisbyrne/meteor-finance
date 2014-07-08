Tinytest.add('MarketDataProvider: constructor', function(test) {
  var dummy = new MarketDataProvider({
    url: 'http://google.com',
    fields: YAHOO_FIELDS
  });

  test.equal(dummy.url, 'http://google.com');
  test.include(dummy.fields, '')
});