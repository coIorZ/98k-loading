# 98k-loading
a loading plugin for [98k](https://github.com/coIorZ/98k)

## Install
```sh
$ npm install --save 98k-loading
```

## Quick start
`index.js`
```javascript
import Kar98k from '98k';
import createLoading from '98k-loading';

const app = Kar98k();

app.use(createLoading());
```

## Options
```javascript
createLoading({
  namespace: 'loading' //default to 'loading',
  include: ['^example/fetch'], //filter action types, regex enabled, default to empty
  exclude: ['^counter/']  //default to empty
})
```
