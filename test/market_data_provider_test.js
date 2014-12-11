var createDummyProvider = function() {
  return new MarketDataProvider({
    fields: {
      'lastTrade' : 't',
      'name'      : 'n',
      'symbol'    : 's'
    }
  });
};

Tinytest.add('MarketDataProvider: constructor', function(test) {
  var dummy = createDummyProvider();

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

// Tinytest.add('MarketDataProvider (Yahoo): getStocks', function(test) {
//   var dummy = createDummyProvider();
//   var csvString = '"BHP.AX","BHP BLT FPO",37.580\n"CTD.AX","CORP TRAV FPO",6.550';
//   var expected = [
//     {
//       symbol: 'BHP.AX',
//       name: 'BHP BLT FPO',
//       lastTrade: 37.580
//     },
//     {
//       symbol: 'CTD.AX',
//       name: 'CORP TRAV FPO',
//       lastTrade: 6.550
//     }
//   ];
//   test.equal( dummy.processCsv( csvString ), expected );
// });

Tinytest.add('MarketDataProvider (Yahoo): fields', function(test) {
  test.equal( YahooFinance.convertField('marketCap'), 'j1' );
});

Tinytest.addAsync('MarketDataProvider (Yahoo): getDividends', function(test, done) {  

  YahooFinance.getDividends(['WU'], new Date('2010-01-19'), new Date('2011-01-24'), function(error, results) {
    if (error) {
      test.exception(error);
    }
    var first = {
          symbol: 'WU',
          date: new Date('2010-12-16'),
          amount: 0.07
        },
        second = {
          symbol: 'WU',
          date: new Date('2010-09-30'),
          amount: 0.06
        },
        third = {
          symbol: 'WU',
          date: new Date('2010-06-16'),
          amount: 0.06
        },
        fourth = {
          symbol: 'WU',
          date: new Date('2010-03-17'),
          amount: 0.06
        };

    // Don't care which order dividends are in as long as they all exist
    test.equal( results.length, 4 );
    test.include( results, first );
    test.include( results, second );
    test.include( results, third );
    test.include( results, fourth );

    done();
  });

});