var YAHOO_FIELDS = {
  'symbol': 's',
  'lastTrade': 'l1',
  'dividendYield': 'y'
};

var Yahoo = new MarketDataProvider({
  url: 'http://download.finance.yahoo.com/d/quotes.csv',
  fields: YAHOO_FIELDS
});