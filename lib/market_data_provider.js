MarketDataProvider = function(options) {
  var self = this;

  self.quotesUrl = options.quotesUrl || '';
  self.fields    = options.fields || {};
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