import fs from 'fs';
import { pbkdf2, pbkdf2Sync } from 'crypto';

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 3;

// 2 or 3: Timer runs out but has to wait for the event loop
setTimeout(() => {
  console.log('Timer 1 finished');
}, 0);
// 2 or 3: Runs on the next tick (after all threads)
setImmediate(() => {
  console.log('Immediate 1 finished');
});
fs.readFile('./test-file.txt', 'utf-8', (err, data) => {
  // 4: A heavy task waits for completion
  console.log('typeof data', typeof data);
  console.log('I/O finished');

  console.log('--------------');
  // 7: Timer runs out but has to wait for the event loop
  setTimeout(() => {
    console.log('Timer 2 finished');
  }, 0);
  // 8: Slower than I/O
  setTimeout(() => {
    console.log('Timer 3 finished');
  }, 1000);
  // 6: Runs on the next tick (faster than 0 ms timer)
  setImmediate(() => {
    console.log('Immediate 2finished');
  });
  // 5: Happens between each phase
  process.nextTick(() => console.log('Next tick finished'));

  pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');
  pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');
  pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');
  pbkdf2Sync('password', 'salt', 100000, 1024, 'sha512');
  console.log(Date.now() - start, 'Password encrypted');
  // pbkdf2('password', 'salt', 100000, 1024, 'sha512', () =>
  //   console.log(Date.now() - start, 'Password encrypted')
  // );
});
// 1: Top-level code is executed first
console.log('Hello from the top-level code');
