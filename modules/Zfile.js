'use strict';
const fs = require('fs');
const fileType = require('file-type');
const ZfileObject = require('./ZfileObject.js');
/**
 * Class Zfile
 */
class Zfile {
  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Lee un fichero
   * @param {string} filename - El nombre del fichero
   * @returns {Promise}
   */
  read(filename) {
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

  /**
   * Guarda un fichero
   * @param {string} filename - El nombre del fichero
   * @param {string} data - Los datos para guardar
   * @returns {Promise}
   */
  write(filename, data) {
    return new Promise((resolve, reject) => {
      let arr = filename.split('/');
      let name = arr[arr.length - 1];
      let dir = filename.replace(name, '');
      this.checkIfFolderExists(dir, true);
      fs.writeFile(filename, data, (err) => {
        if(err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  };

  /**
   * Comprueba si una ruta de carpetas existe
   * @param {string} dir - Ruta de la carpeta
   * @param {boolean} create - Indica si se debe de crear las carpetas inexistentes
   * @returns {boolean}
   */
  checkIfFolderExists(dir, create = false) {
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

  /**
   * Genera una instancia de ZfileObject
   * @param {string} path - Ruta donde crear el fichero
   * @returns {Zfile}
   */
  create(path) {
    return new ZfileObject(this, path);
  }
}
/**
 *
 * @type {Zfile}
 */
module.exports = new Zfile();