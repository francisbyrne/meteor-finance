var createDummyProvider = function() {
  return new MarketDataProvider({
    quotesUrl: 'http://google.com',
    fields: {
      'lastTrade' : 't',
      'name'      : 'n',
      'symbol'    : 's'
    }
  });
};

Tinytest.add('MarketDataProvider: constructor', function(test) {
  var dummy = createDummyProvider();

  test.equal(dummy.quotesUrl, 'http://google.com');
  test.include(dummy.fields, 'symbol');
});

Tinytest.add('MarketDataProvider: convertField', function(test) {
  var dummy = createDummyProvider();
  test.equal( dummy.convertField('symbol'), 's' );
  test.equal( dummy.convertField('lastTrade'), 't' );
  test.equal( dummy.convertField('name'), 'n' );
});

Tinytest.add('MarketDataProvider: convertFields', function(test) {
  var dummy = createDummyProvider();
  test.equal( dummy.convertFields(['symbol', 'name', 'lastTrade']), ['s', 'n', 't'] );
});