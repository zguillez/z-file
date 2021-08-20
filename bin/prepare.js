#! /usr/bin/env node
const zlog = require('@zguillez/z-log');
const zversion = require('@zguillez/z-version');
const zgit = require('@zguillez/z-git');
// -----------------------------------
zversion.update();
zgit.push('main', 'update');
zlog.force('=> Done!');
