import cloneDeep from './cloneDeep';

describe('cloneDeep', () => {
  it('output is matched with the input', () => {
    const given = [{ inner1: [{ inner2: 'a' }] }];

    expect(cloneDeep(given)).toStrictEqual(given);
  });

  it('output has different reference than input', () => {
    const given = [{ inner1: [{ inner2: 'a' }] }];

    expect(cloneDeep(given)).not.toBe(given);
  });
});
