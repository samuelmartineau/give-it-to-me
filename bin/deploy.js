#!/usr/bin/env node
var shell = require('shelljs');

shell.exec('[npm version', process.argv[2]].join(''));
shell.exec('git push origin dev');

shell.exec('git checkout release');
shell.exec('git fetch');
shell.exec('git rebase origin/dev');
shell.exec('git push origin release');
