
// Field conversions for Yahoo Finance
var YAHOO_FIELDS = {
  'change'            : 'c1',
  'changePercent'     : 'p2',
  'daysRange'         : 'm',
  'dividendYield'     : 'y',
  'earningsPerShare'  : 'e',
  'error'             : 'e1',
  'fiftyTwoWeekHigh'  : 'k',
  'lastTrade'         : 'l1',
  'marketCap'         : 'j1',
  'name'              : 'n',
  'priceEarningsRatio': 'r',
  'sharesOwned'       : 's1',
  'symbol'            : 's',
  'volume'            : 'v'
};

YahooFinance = new MarketDataProvider({
  quotesUrl: 'http://download.finance.yahoo.com/d/quotes.csv',
  fields: YAHOO_FIELDS
});