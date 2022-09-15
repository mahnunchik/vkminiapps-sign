# vkminiapps-sign

Module to verify signature in VK Mini Apps.

## Usage

Koa.js example usage:

```js
import signature from 'vkminiapps-sign';

const VK_SECRET = '...';

app.use(async (ctx, next) => {
  if (!signature(VK_SECRET, ctx.query)) {
    ctx.throw(400, 'VK signature not match');
  }
  await next();
});
```
