'use strict';

module.exports = appInfo => {
  const config = {};

  // 中间件
  config.middleware = [
    'error',
    'mysql'
  ];

  // should change to your own
  config.keys = appInfo.name + '_1490628919420_6237';

  // application/json 的请求忽略 csrf 安全校验
  config.security = {
    csrf: {
      ignoreJSON: true,
    },
  };

  return config;
};