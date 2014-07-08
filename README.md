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

Each collection is a raw Meteor collection, which is extended with methods listed below, in order to sync data pulled from market data provider.

Unless specified by an overriden method below, you can still call any of the methods for regular Meteor collections, as per the [Meteor Docs](http://docs.meteor.com).

Dividends
------
### Collection Schema
`{
  'symbol' : 'BHP.AX', // Valid Yahoo Finance ticker
  'date'   : new Date("Aug 9, 2013"), // JS Date object indicating the ex-dividend date
  'amount' : 0.64325 // Dividend amount
}`

### Methods
- `Dividends.refresh(selector)` - Calls market data provider to refresh dividend info for dividends given by `selector`, which is any [Mongo-style Selector](http://docs.meteor.com/#selectors)