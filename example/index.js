'use strict';
const zfile = require('../src/Zfile.js');
zfile.folder('.temp', true);
const f = zfile.create('.temp/test.txt');
f.load('bin/prepare.js').then(() => f.save());
// const f = zfile.file('.temp/test.txt', true);
// const f = zfile.clean(['doc', 'doc_']);
// let f = zfile.remove(['doc_']);
// const f = zfile.files('./');
// console.log(f);
// zfile.replace('./package.json', '0.4.2', '0.4.3');
/* zfile.psdToJpg('300x250.psd', '300x250.jpg', 80)
    .then(() => console.log('ok'))
    .catch((err) => console.log(err));*/
zfile.dummy(300, 250, '#ff2200', '.temp/dummy.jpg');
// zfile.dummy(300, 250, '#ffb65b', 'dummy.gif');
console.log('done!');
