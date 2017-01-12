'use strict';
const fs = require('fs');
module.exports = {
  read: (filename) => {
    fs.readFileAsync = function(filename) {
      return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(err, data) {
          if(err) reject(err); else
            resolve(data);
        });
      });
    };
  },
};
