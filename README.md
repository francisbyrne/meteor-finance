Meteor Finance
======
Provides Meteor collections for common stock market instruments, allowing synced data with a market data provider, currently Yahoo Finance.

Overview
------
There are four collections provided by this package:
- Stocks
- Trades
- Holdings
- Dividends

There is an additional configuration object:
- MarketDataProvider

Each collection is a raw Meteor collection, which is extended with methods listed below, in order to sync data pulled from market data provider.

Unless specified by an overriden method below, you can still call any of the methods for regular Meteor collections, as per the [Meteor Docs](http://docs.meteor.com).

MarketDataProvider
------
This allows you to configure your own market data provider by setting the provider URLs and field mappings.

### Basic Usage
Instantiate a specific market data provider like so:
```
YahooFinance = new MarketDataProvider({
  quotesUrl: 'http://download.finance.yahoo.com/d/quotes.csv',
  fields: {
    symbol: 's',
    name  : 'n'
    // ...and so on
  }
});
```
Then call provider methods on the specific provider object:
```
YahooFinance.convertFields(['symbol', 'name']);
```

### Methods
- `MarketDataProvider.convertField(field)` - Takes a field name, e.g. `'symbol'`, returns the provider-specific field code, e.g. `'s'`.
- `MarketDataProvider.convertFields(fields)` - Takes an array of field names, e.g. `['symbol', 'name']`, returns an array of provider-specific field codes, e.g. `['s', 'n']`.

### YahooFinance
This is currently the default provider. the API can be viewed [here](https://code.google.com/p/yahoo-finance-managed/wiki/CSVAPI) and a full list of the stock field mappings can be found [here](http://cliffngan.net/a/13).

Field Mappings currently provided can be viewed [here](https://github.com/francisbyrne/meteor-finance/blob/master/lib/providers/yahoo.js).

Dividends
------
### Collection Schema
```
{
  'symbol' : 'BHP.AX', // Valid Yahoo Finance ticker
  'date'   : new Date("Aug 9, 2013"), // JS Date object indicating the ex-dividend date
  'amount' : 0.64325 // Dividend amount
}
```

### Methods
- `Dividends.refresh(selector)` - Calls market data provider to refresh dividend info for dividends given by `selector`, which is any [Mongo-style Selector](http://docs.meteor.com/#selectors)