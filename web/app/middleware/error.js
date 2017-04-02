'use strict';



module.exports = (options, app) => {
  return function* error(next) {
    try {
      yield next;
    } catch (error) {
      this.body = {
        error: {
          message: error.message
        }
      };
    }
  };
};