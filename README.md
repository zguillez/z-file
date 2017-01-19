# z-file
Nodejs tools for file streams

## Install
```
npm i z-file
```
# Usage
```
const file = require('z-file');
```

## Read file

```
file.read('./src/data.csv').then((data) => {
  console.log(data);
});
```

## Write file  

Will create the path folders if not exits.

```
file.write('./src/data.csv', data).then((data) => {
  console.log(data);
});
```

## Check if folder exists

```
console.log( file.folder('./src/data') ); //true or false
```

### Create folder if not exists

```
console.log( file.folder('./src/data', true) ); //true
```

# Use as object
```
let f = file.create();
f.load('./src/data.csv').then(() => {
  f.data = 'Hello world!;
  f.save().then(() => {
    console.log(f.data);
  });
});
```

### Creating new file and load content from existing file

```
let f = file.create('./src/newfile.csv');
f.load('./src/oldfile.csv').then(() => {
  f.data = 'Hello world!;
  f.save().then(() => {
    console.log(f.path); //file is saved on './src/newfile.csv'
  });
});
```

## Saving as a new file

```
let f = file.create();
f.load('./src/file.csv').then(() => {
  f.data = 'Hello world!;
  f.save('./src/newfile.csv').then(() => {
    console.log(f.path); //file is saved on './src/newfile.csv'
  });
});
```

# Contributing and issues
Contributors are welcome, please fork and send pull requests! If you have any ideas on how to make this project better then please submit an issue or send me an [email](mailto:mail@zguillez.io).

# License
©2017 Zguillez.io

Original code licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License) Open Source projects used within this project retain their original licenses.

# Changelog

### v0.1.0 (January 12, 2017)
* Basic implementation for file