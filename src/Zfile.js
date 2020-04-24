'use strict';
const fs = require('fs');
const del = require('del');
const fileType = require('file-type');
const Jimp = require('jimp');
const {GifFrame, GifUtil} = require('gifwrap');
const PSD = require('psd');
const pngToJpg = require('png-jpg');
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
      let index = 1;
      const total = filenames.length;
      const that = this;
      const data = [];
      const _read = function (id) {
        that.read(filenames[index - 1]).then((_data) => {
          data.push(_data);
          if (index < total) {
            index++;
            _read(index);
          } else {
            resolve(data);
          }
        }).catch((err) => reject(err));
      };
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
      const arr = filename.split('/');
      const name = arr[arr.length - 1];
      const dir = filename.replace(name, '');
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
   * Sustituye un string del fichero
   * @param {string} filename - El nombre del fichero
   * @param {string} data1 - Los datos a buscar
   * @param {string} data2 - Los datos a introducir
   * @return {Promise}
   */
  replace(filename, data1, data2) {
    return new Promise((resolve, reject) => {
      this.read(filename).then((data) => {
        const regexp = new RegExp(data1, 'ig');
        data = data.replace(regexp, data2);
        this.write(filename, data).then(() => resolve(true)).catch(() => reject(err));
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
    const dirs = [];
    if (Array.isArray(dir)) {
      for (const d of dir) {
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
    const dirs = [];
    if (Array.isArray(dir)) {
      for (const d of dir) {
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

  /**
   * Genera un archivo PNG a partir de un PSD
   * @param {string} input - Ruta del fichero PSD
   * @param {string} output - Ruta del fichero PNG
   * @return {Promise}
   */
  psdToPng(input, output) {
    return new Promise((resolve, reject) => {
      PSD.open(input).then((psd) => {
        psd.image.saveAsPng(output).then(() => {
          resolve(true);
        }).catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  /**
   * Genera un archivo JPEG a partir de un PSD
   * @param {string} input - Ruta del fichero PSD
   * @param {string} output - Ruta del fichero JPEG
   * @param {string} quality - Nivel compresión JPEG
   * @return {Promise}
   */
  psdToJpg(input, output, quality) {
    return new Promise((resolve, reject) => {
      this.psdToPng(input, `${output}.png`).then(() => {
        pngToJpg({
          input: `${output}.png`,
          output: output,
          options: {
            quality: quality,
          },
        }, () => {
          fs.unlink(`${output}.png`, (err) => {
            if (err) {
              reject(err);
            } else {
              resolve(true);
            }
          });
        });
      }).catch((err) => reject(err));
    });
  }

  /**
   * Genera un archivo Jpeg dummy de imagen
   * @param {number} width - Ancho del fichero JPG
   * @param {number} height - Alto del fichero JPG
   * @param {string} color - Color fichero JPG
   * @param {string} output - Ruta del fichero JPG
   * @return {Promise}
   */
  dummy(width, height, color, output) {
    return new Promise((resolve, reject) => {
      new Jimp(width, height, color, (err, image) => {
        if (!err) {
          Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then((font) => {
            image.opaque();
            image.print(font, 0, 0, {
              text: `${width}x${height}`,
              alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
              alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
            }, width, height);
            if (output.split('.')[1] === 'gif') {
              const frame = new GifFrame(width, height, {
                delayCentisecs: 100,
              });
              frame.bitmap = image.bitmap;
              GifUtil.write(output, [frame]);
            } else {
              image.quality(80);
              image.write(output);
            }
          });
        }
      });
    });
  }

  /**
   * Genera un archivo Gif dummy de imagen
   * @param {string} output - Ruta del fichero GIF
   * @return {Promise}
   */
  dummyGif(output) {
    return new Promise((resolve, reject) => {
    });
  }
}

/**
 *
 * @type {Zfile}
 */
module.exports = new Zfile();
