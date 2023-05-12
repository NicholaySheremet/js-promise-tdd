const UserPromise = require('./promise');

const promise = new UserPromise((resolve, reject) => {
  return setTimeout(() => {
    return resolve('Test Some Data');
  }, 222);
});

promise
  .then(data => data.toUpperCase())
  .then(data => console.log('UserPromise return:', data))
  .catch(err => console.log('Error:', err))
  .finally(() => console.log('Finally end'));