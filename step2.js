const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', (err,data) => {
        if (err) {
            console.log(`Error reading ${path}:`, err);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}


async function webCat(url) {
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (err) {
        console.log(`Error fetching ${url}: ${err}`);
        process.exit(1);
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

let entry = process.argv[2]; 

if (isValidURL(entry) === true) {
    webCat(entry);
} else {
    cat(entry);
}
