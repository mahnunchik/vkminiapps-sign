
const signature = require('./vkminiapps-sign');

const SECRET = '12345';

test('correct signature', () => {
  expect(signature(SECRET, {
    vk_param: 'abc',
    sign: '0vM1WROBoMBnMSI0CdlYXaDSKmu_2OqA3F1Dy9522Wc',
  })).toBe(true);
});

test('params as sting', () => {
  expect(signature(SECRET, 'vk_param=abc&sign=0vM1WROBoMBnMSI0CdlYXaDSKmu_2OqA3F1Dy9522Wc')).toBe(true);
});

test('incorrect signature', () => {
  expect(signature(SECRET, {
    vk_param: 'abc',
    sign: '42',
  })).toBe(false);
});

test('no sign parameter', () => {
  expect(() => {
    signature(SECRET, {
      vk_param: 'abc',
      foo: 'bar',
    });
  }).toThrow('no sign parameter');
});
