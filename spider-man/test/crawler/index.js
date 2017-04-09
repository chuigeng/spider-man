'use strict';

const co = require('co');

const crawler = require('./../../app/crawler');

// mm131.com
co(function* () {
  let urls = [
    // www.mm131.com - index.js
    // 'http://www.mm131.com',
    // www.mm131.com - category.js
    // 'http://www.mm131.com/xinggan/',
    // www.mm131.com - item.js
    // 'http://www.mm131.com/xinggan/2853_2.html',
  ];
  
  for (let url of urls) {
    let result = yield crawler.work(url);
    console.log(url, result);
  }

}).catch(function (err) {
  console.error(err);
});