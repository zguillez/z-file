'use strict';
const fs = require('fs');
const fileType = require('file-type');
const readfile = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      } else {
        if(fileType(data)) {
          resolve(data);
        } else {
          resolve(data.toString());
        }
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
  this.fileType = () => {
    let type = fileType(this.data);
    if(! type) {
      let arr = this.path.split(".");
      type = {
        ext: arr[arr.length - 1],
        mime: 'text/plain'
      };
    }
    return type;
  };
}

