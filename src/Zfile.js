'use strict';
const fs = require('fs');
const del = require('del');
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
   * @return {Promise}
   */
  read(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data) => {
        if (err) {
          reject(err);
        } else {
          if (fileType(data)) {
            resolve(data);
          } else {
            resolve(data.toString());
          }
        }
      });
    });
  };

  /**
   * Lee un listado de ficheros
   * @param {Array} filenames - Los nombres de los ficheros
   * @return {Promise}
   */
  reads(filenames) {
    return new Promise((resolve, reject) => {
      let total = filenames.length;
      let index = 1;
      let that = this;
      let data = [];
      let _read = function (id) {
        that.read(filenames[index - 1]).then((_data) => {
          data.push(_data);
          if (index < total) {
            index++;
            _read(index);
          } else {
            resolve(data);
          }
        }).catch((err) => reject(err));
      }
      _read(index);
    });
  };

  /**
   * Guarda un fichero
   * @param {string} filename - El nombre del fichero
   * @param {string} data - Los datos para guardar
   * @return {Promise}
   */
  write(filename, data) {
    return new Promise((resolve, reject) => {
      let arr = filename.split('/');
      let name = arr[arr.length - 1];
      let dir = filename.replace(name, '');
      this.folder(dir, true);
      fs.writeFile(filename, data, (err) => {
        if (err) {
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
   * @return {boolean}
   */
  folder(dir, create = false) {
    if (!fs.existsSync(dir)) {
      if (create) {
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
   * Comprueba si una ruta de fichero existe
   * @param {string} file - Ruta del fichero
   * @param {boolean} create - Indica si se debe forzar el fichero
   * @return {boolean}
   */
  file(file, create = false) {
    try {
      return fs.statSync(file).isFile();
    } catch (e) {
      if (e.code === 'ENOENT') {
        if (create) {
          this.write(file, '');
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
  };

  /**
   * Devuelve las carpetas de una ruta
   * @param {String} dir - ruta del directorio
   * @return {Array} - Array con los nombre de las carpetas
   */
  folders(dir) {
    return fs.readdirSync(dir).filter((f) => fs.statSync(dir + '/' + f).isDirectory());
  }

  /**
   * Devuelve los ficheros de una ruta
   * @param {String} dir - ruta del directorio
   * @return {Array} - Array con los nombre de los ficheros
   */
  files(dir) {
    return fs.readdirSync(dir).filter((f) => fs.statSync(dir + '/' + f).isFile()).filter((f) => !(/(^|\/)\.[^\/\.]/g).test(f));
  }

  /**
   * Elimina el contenido de una o varias carpetas
   * @param {String|Array} dir - Ruta de la carpeta o lista de carpetas para vaciar
   * @return {Array} - Listado de ficheros eliminados
   */
  clean(dir) {
    let dirs = [];
    if (Array.isArray(dir)) {
      for (let d of dir) {
        dirs.push(`${d}/*`);
      }
    } else {
      dirs.push(`${dir}/*`);
    }
    return del.sync(dirs);
  }

  /**
   * Elimina una o varias carpetas
   * @param {String|Array} dir - Ruta de la carpeta o lista de carpetas para eliminar
   * @return {Array} - Listado de las carpetas eliminadas
   */
  remove(dir) {
    let dirs = [];
    if (Array.isArray(dir)) {
      for (let d of dir) {
        dirs.push(`${d}`);
      }
    } else {
      dirs.push(`${dir}`);
    }
    return del.sync(dirs);
  }

  /**
   * Genera una instancia de ZfileObject
   * @param {string} path - Ruta donde crear el fichero
   * @return {Zfile}
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
