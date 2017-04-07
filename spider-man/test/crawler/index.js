'use strict';

const co = require('co');

const crawler = require('./../../app/crawler');

let url;
let result;

// mm131.com
co(function* () {
  // www.mm131.com - index.js
  url = 'http://www.mm131.com';
  result = yield crawler.work(url);
  console.log(url, result);

  // www.mm131.com - category.js
  url = 'http://www.mm131.com/xinggan/';
  result = yield crawler.work(url);
  console.log(url, result);
}).catch(function (err) {
  console.error(err);
});