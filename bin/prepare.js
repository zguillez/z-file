#! /usr/bin/env node
/* eslint no-unused-vars: "off", no-restricted-modules: "off" */
const colors = require('colors');
const shell = require('shelljs');
const zversion = require('@zguillez/z-version');
const zgit = require('@zguillez/z-git');
// -----------------------------------
zversion.update();
zgit.push('master', 'update');
console.log(`=> Done!\n`.green);
