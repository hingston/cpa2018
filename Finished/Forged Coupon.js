const Cryptr = require('cryptr');
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const rl = readline.createInterface(fs.createReadStream('./passwords.list'), new stream);

rl.on('line', function (line) {
    const cryptr = new Cryptr(line);

    // Test if the current key was used to make a known encrypted coupon
    if (cryptr.encrypt('JAN16-20') === '73d18881deab6985d893cbe87c4b9986') {

        // The found key
        console.log('Key used: ' + line);

        // Create fake coupon
        console.log('Forged 80% off coupon: ' + cryptr.encrypt('JUL18-80'));
    }
});
