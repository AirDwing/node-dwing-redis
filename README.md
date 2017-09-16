# Dwing Redis

[![github](https://img.shields.io/github/followers/willin.svg?style=social&label=Follow)](https://github.com/willin) [![npm](https://img.shields.io/npm/v/@dwing/redis.svg)](https://npmjs.org/package/@dwing/redis) [![npm](https://img.shields.io/npm/dt/@dwing/redis.svg)](https://npmjs.org/package/@dwing/redis) [![codecov](https://codecov.io/gh/AirDwing/node-dwing-redis/branch/master/graph/badge.svg)](https://codecov.io/gh/AirDwing/node-dwing-redis) [![Travis-CI](https://travis-ci.org/AirDwing/node-dwing-redis.svg?branch=master)](https://travis-ci.org/AirDwing/node-dwing-redis) [![codebeat badge](https://codebeat.co/badges/9a510e01-2f09-4112-86c7-4dc780d868c5)](https://codebeat.co/projects/github-com-airdwing-node-dwing-redis-master)

## 安装

```
yarn add @dwing/redis
```

## ES7 使用

```js
const redis = require('@dwing/redis');

const client = redis({
  host: '127.0.0.1',
  port: 6379,
  db: 0
});

(async()=>{
  // 直接用默认的数据库
  console.log(await client.get('test'));

  // 或者选择数据库
  const db1 = client.select(1);
  console.log(await db1.get('test'));
})();
```

注意：

```js
(async()=>{
  // Select DB将会返回实例
  client.select(1);
  // 这里依然用的默认的 db（可能是db0，根据配置，默认0）进行操作
  console.log(await client.get('test'));
})();
```

## License

MIT

通过支付宝捐赠：

![qr](https://cloud.githubusercontent.com/assets/1890238/15489630/fccbb9cc-2193-11e6-9fed-b93c59d6ef37.png)
