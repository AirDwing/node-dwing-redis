# Dwing Redis

[![npm](https://img.shields.io/npm/v/@dwing/redis.svg?style=plastic)](https://npmjs.org/package/@dwing/redis) [![npm](https://img.shields.io/npm/dt/@dwing/redis.svg?style=plastic)](https://npmjs.org/package/@dwing/redis)

## 安装

```
npm install @dwing/redis --save
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
