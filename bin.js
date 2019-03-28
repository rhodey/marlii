#!/usr/bin/env node

var marlii = require('./')
marlii(process.stdin, process.stdout).catch(console.error)
