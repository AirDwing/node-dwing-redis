const { list } = require('redis-commands');
const redis = require('redis');
const { md5 } = require('@dwing/common');
const { promisify } = require('util');

// SELECT FOR SPECIAL TREATMENT
list.splice(list.indexOf('select'), 1);

const db = {};
/**
 * 创建连接
 * @param  {obj} options Redis连接参数
 * @return {obj} Redis Client
 */
/* eslint-disable no-console, no-multi-assign */
module.exports = function createRedisClient(options = {}, logger = console.log) {
  const key = md5(JSON.stringify(options));
  const createClient = (selectedDB) => {
    if (!db[key]) {
      db[key] = {};
    }
    if (!db[key][selectedDB]) {
      db[key][selectedDB] = redis.createClient(options);
      db[key][selectedDB].select(selectedDB || 0);
      /* istanbul ignore next */
      db[key][selectedDB].on('error', (err) => {
        logger('dwing:redis:client', err);
        db[key][selectedDB] = null;
      });
    }
    const result = {};
    result.select = createClient;
    list.forEach((method) => {
      result[method] = exports[method] = (...args) => {
        /* istanbul ignore if */
        if (db[key][selectedDB] === null) {
          // 异步,不然请求会阻塞
          (() => {
            createClient(selectedDB);
          })();
          return null;
        }
        const promiseFn = promisify(db[key][selectedDB][method]).bind(db[key][selectedDB]);
        return promiseFn(args);
      };
    });
    result.client = db[key][selectedDB];
    return result;
  };
  return createClient(options.db || 0);
};
