const fs = require('fs-extra');
const glob = require('glob');


const f_angular = 'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';
const f_datbase = 'database/autoload.ts';
const args = process.argv.slice(1);
const isElectronConfigure = args.some(val => val === '--electron');
const isWebConfigure = args.some(val => val === '--web');
const isClearConfigure = args.some(val => val === '--clear');
const isDatabaseAutoload = args.some(val => val === '--dbauto');


if (isClearConfigure) {
  fs.removeSync('out-tsc');
  fs.removeSync('release');
  fs.removeSync('dist');
}

if (isDatabaseAutoload) {

  var importString = '';
  var executeString = '';

  glob(__dirname + '/database/**/*.slot.ts', {}, (err, files) => {
    files.forEach((file) => {
      let fileRelPath = file.replace(__dirname + '/database', '');
      fileRelPath = fileRelPath.replace('.ts', '');
      let fileName = fileRelPath.replace('.slot', '');
      fileName = 'slot' + fileName.replace(/\//g, '_');

      importString += `import { init as ${fileName} } from '.${fileRelPath}';\n`;
      executeString += `    ${fileName}();\n`;
    });

    importString = `<import>\n${importString}// </import>`;
    executeString = `<execute>\n${executeString}    // </execute>`;
    fs.readFile(f_datbase, 'utf8', function (err, data) {
      if (err) return console.log(err);
      var result = data.replace(/<import>(.*?)<\/import>/s, importString);
      result = result.replace(/<execute>(.*?)<\/execute>/s, executeString);
      fs.writeFile(f_datbase, result, 'utf8', function (err) {
        if (err) return console.log(err);
      });
    });
  });

}

// Allow angular using electron module (native node modules)
if (isElectronConfigure || isWebConfigure) {
  fs.readFile(f_angular, 'utf8', function (err, data) {
    if (err) return console.log(err);

    var result = data.replace(/target: "electron-renderer",/g, '');
    result = result.replace(/target: "web",/g, '');

    if (isElectronConfigure) {
      var regPlace = 'return {target: "electron-renderer",';
    } else {
      var regPlace = 'return {target: "web",';
    }

    result = result.replace(/return \{/g, regPlace);

    fs.writeFile(f_angular, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}