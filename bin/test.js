'use strict';
const file = require('../index.js');
let f = file.create();
f.load('package.json').then(() => {
//f.load('./bin/test.png').then(() => {
  console.log(f.data);
  console.log(f.fileType());
});