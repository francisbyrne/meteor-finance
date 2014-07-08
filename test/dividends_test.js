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