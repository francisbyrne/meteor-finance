var addBHP = function() {
  Dividends.insert({'symbol': 'BHP.AX', 'date': new Date('July 7, 2014'), 'amount': 0.64});
};

Tinytest.add('Dividends: Collection works', function(test) {
  test.equal(Dividends.find({}).count(), 0);
  
  Dividends.insert({'symbol': 'BHP.AX', 'date': new Date('July 7, 2014'), 'amount': 0.64});

  var div = Dividends.findOne({'symbol': 'BHP.AX'});
  test.equal(div && div.amount, 0.64);

  Dividends.update(div._id, {$set: {'amount': 1.20}});

  var divUpdated = Dividends.findOne({'symbol': 'BHP.AX'});
  test.equal(divUpdated && divUpdated.amount, 1.20);

  Dividends.remove(divUpdated._id);

  test.equal(Dividends.find({}).count(), 0);
});

// Tinytest.add('Dividends: refresh single dividend', function(test) {
//   test.equal( Dividends.find({'symbol': 'BHP.AX'}).count(), 0 );
//   Dividends.refresh({'symbol': 'BHP.AX'}, function(error, result) {
//     test.equal( Dividends.find({'symbol': 'BHP.AX', 'date': new Date('Mar 6, 2013'), 'amount': 0.57}).count(), 1 );
//   });
// });