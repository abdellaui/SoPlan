const path = require('path');
const electron = require('electron');
const fs = require('fs');
let loadedLanguage;
let app = electron.app ? electron.app : electron.remote.app;

module.exports = i18n;

function i18n() {
  const appDir = app.getAppPath();
  const translationPath = 'src/translation/';
  loadedLanguage = JSON.parse(fs.readFileSync(path.join(appDir, translationPath, 'en.json'), 'utf8'));
  /*if(fs.existsSync(path.join(__dirname, app.getLocale() + '.js'))) {
         loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, app.getLocale() + '.js'), 'utf8'));
    }
    else {
         loadedLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, 'en.js'), 'utf8'));
    }*/
}
 /*
i18n.prototype.__ = function(phrase) {
    let translation = loadedLanguage[phrase];
    if (translation === undefined) {
         translation = phrase;
    }
    // return translation;
    // For test purpose
    return translation + '_i18n';
};*/
