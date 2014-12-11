MarketDataProvider = function(options) {
  var self = this;

  self.fields = options.fields || {};
  self.getDividends = options.getDividends;
};

MarketDataProvider.prototype = {
  convertField: function(field) {
    return this.fields[field];
  },
  convertFields: function(fields) {
    var self = this;
    return _.map(fields, self.convertField, self);
  }
};