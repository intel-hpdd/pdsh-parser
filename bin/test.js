#!/usr/bin/env node

'use strict';

var Jasmine = require('jasmine');
var jasmine = new Jasmine();
require('intel-jasmine-n-matchers');

if (process.env.RUNNER === 'CI') {
  var jasmineJUnitReporter = require('intel-jasmine-junit-reporter');

  var junitReporter = jasmineJUnitReporter({
    specTimer: new jasmine.jasmine.Timer(),
    JUnitReportSavePath: process.env.SAVE_PATH || './',
    JUnitReportFilePrefix: process.env.FILE_PREFIX || 'pdsh-parser-results-' +  process.version,
    JUnitReportSuiteName: 'PDSH Parser Reports',
    JUnitReportPackageName: 'PDSH Parser Reports'
  });

  jasmine.jasmine.getEnv().addReporter(junitReporter);
}

jasmine.loadConfig({
  spec_dir: 'dist/test',
  spec_files: [
    '**/*-test.js'
  ],
  random: true
});

jasmine.execute();
