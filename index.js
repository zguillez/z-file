'use strict';
const fs = require('fs');
module.exports = {
  read: (filename) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, 'utf-8', (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  write: (data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, data, (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
};
