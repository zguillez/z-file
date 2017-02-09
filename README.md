# z-file
Nodejs tools for file streams

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

# Contributing and issues
Contributors are welcome, please fork and send pull requests! If you have any ideas on how to make this project better then please submit an issue or send me an [email](mailto:mail@zguillez.io).

# License
©2017 Zguillez.io

Original code licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License) Open Source projects used within this project retain their original licenses.

# Changelog

### v0.3.0 (January 27, 2017)
* Read files and folders functions

### v0.2.0 (January 21, 2017)
* Core update with ES6 classes

### v0.1.0 (January 12, 2017)
* Basic implementation for file