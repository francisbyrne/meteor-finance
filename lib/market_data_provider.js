MarketDataProvider = function(options) {
  var self = this;

  self.url    = options.url || '';
  self.fields = options.fields || {};
};

MarketDataProvider.prototype = {
  convertField: function(field) {
    return this.fields[field];
  },
  convertFields: function(fields) {
    return _.map(fields, convertField);
  }
};