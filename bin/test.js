#!/usr/local/bin/node
'use strict';
let file = require('../src/Zfile.js');
file.checkIfFolderExists('.temp', true);
let f = file.create('.temp/test.txt');
f.load('bin/test.js').then(() => f.save());

