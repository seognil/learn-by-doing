// * ------------------------------------------------ 基本使用

describe('描述：基本使用', () => {
  test('简单测试项', () => {
    // expect.hasAssertions();
    expect(2).toBe(2);
  });
  test('简单测试项2', () => {
    // expect.assertions(2);
    expect('hello').toEqual('hello');
    expect('hello').not.toEqual('world');
  });
});

describe('基本类型简单测试', () => {
  test('数字', () => {
    expect(0.1 + 0.2).not.toEqual(0.3);
    expect(0.1 + 0.2).toBeCloseTo(0.3);

    expect(1 + 2).toBeLessThanOrEqual(4);

    expect(Infinity / Infinity).toBeNaN();
  });
  test('字符串/数组', () => {
    expect('Quick fox').toMatch(/quick/i);

    expect('Quick fox').toContain('ck fo');
    expect(['Hello', 'world']).toContain('Hello');

    expect([{ id: 1 }, { id: 2 }]).not.toContain({ id: 1 });
    expect([{ id: 1 }, { id: 2 }]).toContainEqual({ id: 1 });
    expect([{ id: 1 }, { id: 2 }]).not.toContainEqual({ id: 1, name: 'John' });

    expect('Quick').toHaveLength(5);
    expect(['Hello', 'world']).toHaveLength(2);
  });
});

// * ------------------------------------------------ 假值检测

describe('Nullish', () => {
  test('', () => {
    const obj = {};

    // @ts-ignore
    expect(obj.key).toBeUndefined();
    expect(undefined).toBeUndefined();

    expect(undefined).not.toBeDefined();
    expect(null).toBeDefined();
    expect(0).toBeDefined();

    expect(null).toBeNull();
    expect(undefined).not.toBeNull();

    expect(0).toBeFalsy();
    expect('').toBeFalsy();
    expect(null).toBeFalsy();

    expect('0').toBeTruthy();
    expect([]).toBeTruthy();
  });
});

// * ------------------------------------------------ 容易混淆的相等性 API

describe('容易混淆的相等性 API，对象', () => {
  test('toBe', () => {
    expect({ hello: 'world' }).not.toBe({ hello: 'world' });

    const obj = { hello: 'world' };
    expect(obj).toBe(obj);
  });

  test('toEqual', () => {
    expect({ hello: 'world' }).toEqual({ hello: 'world' });
    expect({ hello: 'world' }).toEqual({ hello: 'world', verb: undefined });
  });

  test('toStrictEqual', () => {
    expect({ hello: 'world' }).toStrictEqual({ hello: 'world' });
    expect({ hello: 'world' }).not.toStrictEqual({ hello: 'world', verb: undefined });
  });

  test('toMatchObject', () => {
    expect({
      val: 2,
      arr: [4, 3, 2, 1],
      hello: 'world',
    }).toMatchObject({
      val: expect.any(Number),
      arr: expect.arrayContaining([1, 2]),
    });
  });
});

// * ------------------------------------------------ Mock 系列

describe('Mock 系列', () => {
  test('jest.fn', () => {
    const hello = (name = 'John') => `Hello ${name}`;
    const mockFn = jest.fn(hello);
    mockFn.mockName('hello there');

    mockFn('Chirs');

    // console.log(mockFn.getMockName()); // => hello there
    // console.log(mockFn.mock.calls); // => [ [ 'Chirs' ] ]
    // console.log(mockFn.mock.results); // => [ { type: 'return', value: 'Hello Chirs' } ]
    // console.log(mockFn.mock.instances); // => [ undefined ]

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith('Chirs');
    expect(mockFn).toHaveReturnedTimes(1);
    expect(mockFn).toHaveReturnedWith('Hello Chirs');
  });

  test('jest.spyOn', () => {
    const obj = { hello: (name = 'John') => `Hello ${name}` };

    const spyFn = jest.spyOn(obj, 'hello');

    obj.hello('Freddie');
    obj.hello('Bob');

    // console.log(spyFn.getMockName()); // => jest.fn()
    // console.log(spyFn.mock.calls); // => [ [ 'Freddie' ], [ 'Bob' ] ]
    // console.log(spyFn.mock.results); // =>
    // [
    //   { type: 'return', value: 'Hello Freddie' },
    //   { type: 'return', value: 'Hello Bob' }
    // ]

    // console.log(spyFn.mock.instances); // => [ { hello: [Function: mockConstructor] {} }, {...} ]

    expect(spyFn).toHaveBeenCalled();
    expect(spyFn).toHaveBeenCalledTimes(2);
    expect(spyFn).toHaveBeenCalledWith('Freddie');
    expect(spyFn).toHaveBeenLastCalledWith('Bob');
    expect(spyFn).toHaveBeenNthCalledWith(1, 'Freddie');
    expect(spyFn).toHaveReturned();
    expect(spyFn).toHaveReturnedTimes(2);
    expect(spyFn).toHaveReturnedWith('Hello Bob');
    expect(spyFn).toHaveLastReturnedWith('Hello Bob');
    expect(spyFn).toHaveNthReturnedWith(2, 'Hello Bob');
  });

  test('mock 实例方法', () => {
    // * ---------------- 等价写法
    {
      const hello = (name = 'John') => `Hello ${name}`;
      jest.fn(hello);
      jest.fn().mockImplementation(hello);
    }

    // * ---------------- mockImplementationOnce
    {
      const myMockFn = jest
        .fn()
        .mockImplementationOnce((cb) => cb(null, true))
        .mockImplementationOnce((cb) => cb(null, false));

      expect([myMockFn((err, val) => val), myMockFn((err, val) => val)]).toEqual([true, false]);
    }

    // * ---------------- mockReturnValueOnce
    {
      const myMockFn = jest
        .fn()
        .mockReturnValue('default')
        .mockReturnValueOnce('first call')
        .mockReturnValueOnce('second call');

      expect([myMockFn(), myMockFn(), myMockFn(), myMockFn()]).toEqual([
        'first call',
        'second call',
        'default',
        'default',
      ]);
    }
  });
});
