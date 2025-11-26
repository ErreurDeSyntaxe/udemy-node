const fs = require('fs');

// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// const reply = fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File written');

// Non-block, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (err1, data1) => {
  if (err1) return console.log('ERROR!');

  fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err2, data2) => {
    console.log('data2', data2);
    fs.readFile('./txt/append.txt', 'utf-8', (err3, data3) => {
      console.log('data3', data3);

      fs.writeFile(
        './txt/final.txt',
        data2.concat('\n').concat(data3),
        'utf-8',
        (err) => {
          console.log('Your file has been written.');
        }
      );
    });
  });
});
console.log('Reading file...');
