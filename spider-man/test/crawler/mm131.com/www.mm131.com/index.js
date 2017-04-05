'use strcit';

const co = require('co');

const crawler = require('../../../../app/crawler/mm131.com/www.mm131.com/index');

co(function* () {
  let url = 'http://www.mm131.com';
  let result = yield crawler.work(url);
  console.log(result);
}).catch(function (err) {
    console.error(err);
});