'use strict';

const mysqlCz = require('node-mysql-cz');

module.exports = options => {
  return function* mysql(next) {
    mysqlCz.create(options);
    try {
      yield next;
    } catch (error) {
      mysqlCz.end();
      throw error;
    }
    mysqlCz.end();
  };
};