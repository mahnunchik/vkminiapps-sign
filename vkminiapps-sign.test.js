import assert from 'assert';
import signature from './vkminiapps-sign.js';

const SECRET = '12345';

describe('vkminiapps-sign', () => {
  it('correct signature', () => {
    assert.equal(signature(SECRET, {
      vk_param: 'abc',
      sign: '0vM1WROBoMBnMSI0CdlYXaDSKmu_2OqA3F1Dy9522Wc',
    }), true);
  });

  it('params as sting', () => {
    assert.equal(signature(SECRET, 'vk_param=abc&sign=0vM1WROBoMBnMSI0CdlYXaDSKmu_2OqA3F1Dy9522Wc'), true);
  });

  it('multiple params', () => {
    assert.equal(signature(SECRET, 'vk_b=1&vk_a=2&sign=LrJJO-Izi067PcydWhh7Z-4350vC4xCCiihwuSskc-4'), true);
  })

  it('incorrect signature', () => {
    assert.equal(signature(SECRET, {
      vk_param: 'abc',
      sign: '42',
    }), false);
  });

  it('no sign parameter', () => {
    assert.throws(() => {
      signature(SECRET, {
        vk_param: 'abc',
        foo: 'bar',
      });
    }, {
      message: 'no sign parameter',
    });
  });
});
