const UserPromise = require('./promise');

describe('Promise:', () => {
  let promise;
  let fn;

  const successResult = 42;
  const errorResult = 'Big error';

  beforeEach(() => {
    fn = jest.fn((resolve) => {
      return setTimeout(() => resolve(successResult), 150);
    });
    promise = new UserPromise(fn);
  });

  test('should exists', () => {
    expect(UserPromise).toBeDefined();
  });

  test('should be typeof function', () => {
    expect(typeof UserPromise).toBe('function');
  })

  test('instance should have method [then]', () => {
    expect(promise.then).toBeDefined();
    expect(typeof promise.then).toBe('function');
  })

  test('instance should have method [catch]', () => {
    expect(promise.catch).toBeDefined();
    expect(typeof promise.catch).toBe('function');
  })

  test('instance should have method [finally]', () => {
    expect(promise.finally).toBeDefined();
    expect(typeof promise.finally).toBe('function');
  })

  test('should call executor function', () => {
    expect(fn).toHaveBeenCalled();
  })

  test('should get data in [then] block and chain them', async () => {
    const result = await promise.then(num => num).then(num => num + 2);
    expect(result).toBe(successResult + 2);
  })

  test('should [catch] error', () => {
    const errorCallback = (_, reject) => setTimeout(
      () => {
        return reject(errorResult)
      }, 150
    );
    const errorPromise = new UserPromise(errorCallback);

    return new Promise(resolve => {
      errorPromise.catch(error => {
        expect(error).toBe(errorResult);
        resolve();
      })
    })
  })

  test('should call [finaly] method', async () => {
    const finallyCallback = jest.fn(() => {});
    await promise.finally(finallyCallback);

    expect(finallyCallback).toHaveBeenCalled();
  })
})