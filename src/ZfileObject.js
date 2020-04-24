'use strict';
const fileType = require('file-type');

/**
 * Class ZfileObject
 * Genera un objecto que puede leer y guardar datos en ficheros
 */
class ZfileObject {
  /**
   * @param {string} engine
   * @param {string} path - El nombre del fichero
   */
  constructor(engine, path) {
    /**
     * Zfile class
     */
    this.engine = engine;
    /**
     * Ruta del fichero de origen
     * @type {string}
     */
    this.path = path;
    /**
     * Nombre del fichero de destino
     * @type {null}
     */
    this.filename = null;
    /**
     * Datos del fichero
     * @type {string}
     */
    this.data = '';
  }

  /**
   * Lee datos de un fichero
   * @param {string} filename
   * @return {Promise}
   */
  load(filename) {
    this.filename = (filename) ? filename : this.path;
    this.path = (this.path) ? this.path : this.filename;
    return new Promise((resolve, reject) => {
      if (!this.filename && !this.path) {
        reject(new Error('Null filepath'));
      } else {
        this.engine.read(this.filename).then((data) => {
          this.data = data;
          resolve(this);
        });
      }
    });
  };

  /**
   * Guarda datos en un fichero
   * @param {string} path
   * @return {Promise}
   */
  save(path) {
    this.path = (path) ? path : this.path;
    return new Promise((resolve, reject) => {
      this.engine.write(this.path, this.data).then(() => {
        resolve(this);
      });
    });
  };

  /**
   * Obtiene el tipo de datos
   * @return {string}
   */
  getFileType() {
    let type = fileType(this.data);
    if (!type) {
      const arr = this.path.split('.');
      type = {
        ext: arr[arr.length - 1],
        mime: 'text/plain',
      };
    }
    return type;
  };
}

/**
 * @type {ZfileObject}
 */
module.exports = ZfileObject;
