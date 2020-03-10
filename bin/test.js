#!/usr/local/bin/node
'use strict';
const zfile = require('../src/Zfile.js');
// zfile.checkIfFolderExists('.temp', true);
// let f = zfile.create('.temp/test.txt');
// f.load('bin/test.js').then(() => f.save());
// let f = zfile.checkIfFileExists('.temp/test.txt', true);
// let f = zfile.clean(['doc', 'doc_']);
// let f = zfile.remove(['doc_']);
// const f = zfile.files('./');
// console.log(f);
// zfile.replace('./package.json', '0.4.2', '0.4.3');
/* zfile.psdToJpg('300x250.psd', '300x250.jpg', 80)
    .then(() => console.log('ok'))
    .catch((err) => console.log(err));*/
// zfile.dummy(300, 250, '#FF2200', 'dummy.jpg');
zfile.dummy(300, 250, '#ffb65b', 'dummy.gif');
console.log('done!');
