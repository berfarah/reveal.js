#!/usr/bin/env node

'use strict';

var path = require('path');

var FIRST_ARGUMENT = 2;
if (process.argv[FIRST_ARGUMENT] === 'init') {
  var fs = require('fs');
  var copyFile = function(from, to, callback) {
    var writer = fs.createWriteStream(to);
    fs.createReadStream(from).pipe(writer);
    writer.on('close', callback);
  };

  copyFile(
    path.join(__dirname, '../index.html'),
    path.join(process.cwd(), 'index.html'),
    function() {
      console.log("Generated index.html starter template");
    }
  );

  return;
}

var grunt = require('grunt');
// Disable Gruntfile lookup
grunt.task.init = function() {};
require(path.join(__dirname, '../Gruntfile.js'))(grunt);
grunt.tasks(['serve']);
