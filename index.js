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
    let arr = filename.split('/');
    let name = arr[arr.length - 1];
    let dir = filename.replace(name, '');
    createFolderIfnotextist(dir, true);
    fs.writeFile(filename, data, (err) => {
      if(err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};
const createFolderIfnotextist = (dir, create = false) => {
  if(! fs.existsSync(dir)) {
    if(create) {
      fs.mkdirSync(dir);
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};
module.exports = {
  read: readfile,
  write: writefile,
  folder: createFolderIfnotextist,
  create: (path) => {
    return new File(path);
  },
};
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

