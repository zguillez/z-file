# z-file

[![npm version](https://badge.fury.io/js/z-file.svg)](https://badge.fury.io/js/z-file)
[![Build Status](https://travis-ci.org/zguillez/z-file.svg?branch=master)](https://travis-ci.org/zguillez/z-file)
[![Installs](https://img.shields.io/npm/dt/z-file.svg)](https://coveralls.io/r/zguillez/z-file)
[![Gitter](https://badges.gitter.im/zguillez/z-file.svg)](https://gitter.im/zguillez/z-file?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> [Zguillez](https://zguillez.io) | Guillermo de la Iglesia

## Nodejs tools for file streams

# Getting Started
## Install
```
npm i z-file
```
# Usage
```
const zfile = require('z-file');
```

## Read file

```
zfile.read('./src/data.csv').then((data) => {
  console.log(data);
});
```

## Write file

Will create the path folders if not exits.

```
zfile.write('./src/data.csv', data).then((data) => {
  console.log(data);
});
```

## Replace string in file

Will create the path folders if not exits.

```
file.replace('./package.json', '0.4.2', '0.4.3');
```

## Check if folder exists

```
console.log( zfile.folder('./src/data') ); //true or false
```

### Create folder if not exists

```
console.log( zfile.folder('./src/data', true) ); //true
```

## Check if file exists

```
console.log( zfile.file('./src/data.txt') ); //true or false
```

### Create file if not exists

```
console.log( zfile.file('./src/data.txt', true) ); //true
```

### Remove all files in a folder

```
console.log( zfile.clean('./src/data') );
console.log( zfile.clean(['./src/data', './src/assets']) );
```

### Remove a folder

```
console.log( zfile.remove('./src/data') );
console.log( zfile.remove(['./src/data', './src/assets']) );
```

# Use as object
```
let f1 = zfile.create('./data/file.txt');
f1.data = 'Hello world!;
f1.save();

let f2 = zfile.create();
f2.load(f1.path).then(() => {
  f2.data = 'Bye wold!';
  f2.save()
});
```

### Creating new file and load content from existing file

```
let f = zfile.create('./src/newfile.csv');
f.load('./src/oldfile.csv').then(() => {
  f.save().then(() => {
    console.log(f.path); //file is saved on './src/newfile.csv'
  });
});
```

## Saving as a new file

```
let f = zfile.create();
f.load('./src/file.csv').then(() => {
  f.save('./src/newfile.csv').then(() => {
    console.log(f.path); //file is saved on './src/newfile.csv'
  });
});
```

# Tools

## Read files on folder

```
zfile.files('./data').forEach((file) => {
    console.log(file);
  });
```

## Read folders on folder

```
zfile.folders('./data').forEach((folder) => {
    console.log(folder);
  });
```

## Create a PNG image from a PSD file

```
zfile.psdToPng('300x250.psd', '300x250.png')
  .then(() => console.log('Done!'))
  .catch((err) => console.log(err));
```

## Create a JPEG image from a PSD file

```
zfile.psdToJpg('300x250.psd', '300x250.jpg', 80)
  .then(() => console.log('Done!'))
  .catch((err) => console.log(err));
```

# Contributing and issues
Contributors are welcome, please fork and send pull requests! If you have any ideas on how to make this project better then please submit an issue or send me an [email](mailto:mail@zguillez.io).

# License
©2018 Zguillez.io

Original code licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License) Open Source projects used within this project retain their original licenses.

# Changelog

### v0.5.0 (November 25, 2018)
* Create PNG and JPEG images from PSD file

### v0.4.0 (November 20, 2018)
* Replace string on files function

### v0.3.0 (January 27, 2017)
* Read files and folders functions

### v0.2.0 (January 21, 2017)
* Core update with ES6 classes

### v0.1.0 (January 12, 2017)
* Basic implementation for file
