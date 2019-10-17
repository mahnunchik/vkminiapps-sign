
const qs = require('querystring');
const crypto = require('crypto');

module.exports = function signature(secret, _params = {}) {
  const params = (typeof _params === 'string') ? qs.parse(_params) : _params;

  if (!params.sign) {
    throw new Error('no sign parameter');
  }

  const ordered = {};
  Object.keys(params)
    .filter((key) => key.startsWith('vk_'))
    .sort()
    .forEach((key) => {
      ordered[key] = params[key];
    });

  const hash = crypto
    .createHmac('sha256', secret)
    .update(qs.stringify(ordered))
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '');

  return hash === params.sign;
};
