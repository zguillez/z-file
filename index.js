'use strict';
const fs = require('fs');
const readfile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const writefile = (filename, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if(err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
module.exports = {
  read: readfile,
  write: writefile,
  create: (path) => {
    return new File(path);
  },
};
/**
 *
 * @constructor
 */
function File(path) {
  this.path = path;
  this.filename = null;
  this.data = '';
  //-------------------------
  this.load = (filename) => {
    this.filename = (filename) ? filename : this.path;
    this.path = (this.path) ? this.path : this.filename;
    return new Promise((resolve, reject) => {
      if(! this.filename && ! this.path) {
        reject(new Error("Null filepath"));
      } else {
        readfile(this.filename).then((data) => {
          this.data = data;
          resolve(this);
        });
      }
    });
  };
  this.save = (path) => {
    this.path = (path) ? path : this.path;
    return new Promise((resolve, reject) => {
      writefile(this.path, this.data).then(() => {
        resolve(this);
      });
    });
  };
}

