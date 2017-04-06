'use strcit';

const co = require('co');

const crawler = require('../../../../app/crawler/mm131.com/www.mm131.com/category');

co(function* () {
  let url = 'http://www.mm131.com/xinggan/';
  let result = yield crawler.work(url);
  console.log(result);
}).catch(function (err) {
    console.error(err);
});