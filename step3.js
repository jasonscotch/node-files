const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, output) {
    fs.readFile(path, 'utf8', (err,data) => {
        if (err) {
            console.log(`Error reading ${path}:`, err);
            process.exit(1);
        } else {
            decide(data, output);
        }
    });
}

async function webCat(url, output) {
    try {
        let res = await axios.get(url);
        decide(res.data, output);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

function decide(text, output) {
    if (output) {
        fs.writeFile(output, text, 'utf8', (err) => {
            if (err) {
                console.log(`Error writing ${output}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  }

let output;
let entry;

if (process.argv[2] === '--out') {
    output = process.argv[3];
    entry = process.argv[4];
} else {
    entry = process.argv[2]
}

if (isValidURL(entry) === true) {
    webCat(entry, output);
} else {
    cat(entry, output);
}
