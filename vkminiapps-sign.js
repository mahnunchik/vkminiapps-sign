import { createHmac } from 'crypto';

export default function signature(secret, _params = {}) {
  const params = new URLSearchParams(_params);

  if (!params.has('sign')) {
    throw new Error('no sign parameter');
  }

  const ordered = new URLSearchParams();
  for (const [key, value] of params.entries()) {
    if (key.startsWith('vk_')) {
      ordered.append(key, value);
    }
  }
  ordered.sort();

  const hash = createHmac('sha256', secret)
    .update(ordered.toString())
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '');

  return hash === params.get('sign');
}
