#!/usr/local/bin/node
'use strict';
let file = require('../src/Zfile.js');
// file.checkIfFolderExists('.temp', true);
// let f = file.create('.temp/test.txt');
// f.load('bin/test.js').then(() => f.save());
// let f = file.checkIfFileExists('.temp/test.txt', true);
// let f = file.clean(['doc', 'doc_']);
// let f = file.remove(['doc_']);
let f = file.files('./');
console.log(f);

