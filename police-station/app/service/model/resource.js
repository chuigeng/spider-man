'use strict';

let _ = require('underscore');
let mysql = require('node-mysql-cz');

module.exports = app => {

  class Resource extends app.Service {

    constructor(ctx) {
      super(ctx);

      this.fields = [
        'resourceId',
        'domain',
        'url',
        'urlMd5',
        'tag',
        'weight',
        'lastCrawlResult',
        'lastCrawlAt',
        'createAt',
        'updateAt',
      ];
      this.likeFields = [];
    }

    * create(resource) {
      resource.createAt = Date.now();
      yield mysql.query(
        'INSERT INTO resource SET ?',
        resource
      );
      return yield this.get(resource.resourceId);
    }

    * get(resourceId) {
      let resources = yield mysql.query(
        'SELECT * FROM resource WHERE resourceId = ?',
        [resourceId]
      );
      return resources[0] || null;
    }

    * del(resourceId) {
      return yield mysql.query(
        'DELETE FROM resource WHERE resourceId = ?',
        [resourceId]
      );
    }

    * update(resource) {
      resource.updateAt = Date.now();
      return yield mysql.query(
        'UPDATE resource SET ? WHERE resourceId = ?',
        [
          resource,
          resource.resourceId
        ]
      );
    }

    * search(filter, offset, limit, orderBy, order) {
      // 设置默认值
      offset = offset ? offset : 0;
      limit = limit ? limit : 20;
      orderBy = orderBy ? orderBy : 'createAt';
      order = order ? order : 'desc';

      // 过滤无效参数
      filter = _.pick(filter, this.fields);
      filter = _.pick(filter, function(value) {
        return value !== undefined;
      });

      // 查询
      let sql = 'SELECT * FROM resource';
      if (filter) {
        sql += ' WHERE 1=1';
        for (let key of _.keys(filter)) {
          if (this.likeFields.indexOf(key) === -1) {
            sql += ' AND ' + key + ' = ?';
          } else {
            sql += ' AND ' + key + ' LIKE ?';
            filter[key] = '%' + filter[key] + '%';
          }
        }
      }
      sql += ' ORDER BY ' + orderBy + ' ' + order + ' LIMIT ?, ?';

      return mysql.query(
        sql,
        _.values(filter).concat([offset, limit])
      );
    }
  }

  return Resource;
};