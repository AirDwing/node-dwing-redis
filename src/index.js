const { list } = require('redis-commands');
const redis = require('promise-redis');
const { md5 } = require('@dwing/common');

// SELECT FOR SPECIAL TREATMENT
list.splice(list.indexOf('select'), 1);

const db = {};
/**
 * 创建连接
 * @param  {obj} options Redis连接参数
 * @return {obj} Redis Client
 */
/* eslint no-console: 0 */
module.exports = function createRedisClient(options = {}, logger = console.log) {
  const key = md5(JSON.stringify(options));
  const createClient = (selectedDB) => {
    if (!db[key]) {
      db[key] = {};
    }
    if (!db[key][selectedDB]) {
      db[key][selectedDB] = redis().createClient(options);
      db[key][selectedDB].select(selectedDB || 0);
      db[key][selectedDB].on('error', (err) => {
        logger('wulian:redis:client', err);
        db[key][selectedDB] = null;
      });
    }
  };
  const dbN = options.db || 0;
  createClient(dbN);
  const result = {};
  result.select = (dbX) => {
    createClient(dbX);
    const methods = {};
    list.forEach((method) => {
      methods[method] = exports[method] = async (...args) => {
        if (db[key][dbX] === null) {
          // 异步,不然请求会阻塞
          (() => {
            createClient(dbX);
          })();
          return null;
        }
        return await db[key][dbX][method](args);
      };
    });
    return methods;
  };
  list.forEach((method) => {
    result[method] = exports[method] = async (...args) => {
      if (db[key][dbN] === null) {
        // 异步,不然请求会阻塞
        (() => {
          createClient(dbN);
        })();
        return null;
      }
      return await db[key][dbN][method](args);
    };
  });
  return result;
};
