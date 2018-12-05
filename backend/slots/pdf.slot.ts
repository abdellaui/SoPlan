import { end, on, send } from '../slots';
import { app, BrowserWindow } from 'electron';
import { PugConfig, PdfConfig, PugToPdfConfig } from '../models/configs.class';

export function init() {
  on('convertPugToHtml', (event: any, arg: PugConfig) => {
    send(event, 'convertPugToHtml', convertPugToHtml(arg));
  });

  on('convertHtmlToPdf', (event: any, arg: PdfConfig) => {
    send(event, 'convertHtmlToPdf', convertHtmlToPdf(arg));
  });

  /**
   * Umwandlung eines pug-files zum html-file und anschließend drucken zum pdf-file.
   */
  on('convertPugToPdf', (event: any, arg: PugToPdfConfig) => {
    if (convertPugToHtml(new PugConfig(arg.filepathPug, arg.filepathGeneratedHtml, arg.pugConf))) {
      send(event, 'convertPugToPdf', convertHtmlToPdf(new PdfConfig(arg.filepathGeneratedHtml, arg.filepathGeneratedPdf, arg.pdfConf)));
    } else {
      send(event, 'convertPugToPdf', false);
    }
  });
}

/**
 * Konvertiert eine PUG-Datei zu einer HTML-Datei
 * @param pugConf Konfiguration für die Konvertierung
 * @returns Boolean: Umwandlung hat funktioniert
 */
function convertPugToHtml(pugConf: PugConfig): boolean {
  try {
    const pug = require('pug');
    // Kompilieren
    const compiledFunction = pug.compileFile(pugConf.filepath);
    // Rendern
    const fs = require('fs');
    fs.writeFileSync(pugConf.outputpath, compiledFunction(pugConf.config));
  } catch (err) {
    console.error('FAILED convertPugToHtml: ' + err);
    return false;
  }
  return true;
}

/**
 * Druckt eine HTML-Datei in eine PDF-Datei
 * @param conf Konfiguration für das Drucken
 * @returns Boolean: Umwandlung hat funktioniert
 */
function convertHtmlToPdf(conf: PdfConfig): boolean {
  // Todo
  const showWindow = false;
  const widthWindow = 800;
  const heightWindow = 1500;

  try {
    const browserWindow = createFileBrowserWindow(conf.filepath, widthWindow, heightWindow, showWindow);
    generatePDF(browserWindow, conf.outputpath, conf.config, showWindow);
   } catch (err) {
    console.error('FAILED convertHtmlToPdf: ' + err);
    return false;
  }


  return true;
}

/**
 * Lädt Website im neuen Fenster
 * @param urlToLoad Website die geladen werden soll
 * @param showWindow Soll das Fenster angezeigt werden
 * @returns BrowserWindow: Fenster
 */
function createUrlBrowserWindow(urlToLoad, width, height, showWindow) {
  const broswerWindow = new BrowserWindow({ width: width, height: height, show: showWindow });
  broswerWindow.loadURL(urlToLoad);
  return broswerWindow;
}

/**
 * Lädt HtmlFile im neuen Fenster
 * @param fileToLoad Datei die geladen werden soll
 * @param showWindow Soll das Fenster angezeigt werden
 * @returns BrowserWindow: Fenster
 */
function createFileBrowserWindow(fileToLoad, width, height, showWindow) {
  const broswerWindow = new BrowserWindow({ width: width, height: height, show: showWindow  });
  broswerWindow.loadFile(fileToLoad);
  return broswerWindow;
}

/**
 * Druckt ein BrowserWindow aus.
 * @param windowToPdf BrowserWindow welches ausgedruckt werden soll
 * @param filePath Speicherort (erstmal so...)
 */
function generatePDF(pdfWindow, filePath, pdfSettings, showWindow) {
  const fs = require('fs');

  pdfWindow.once('ready-to-show', () => {
    // PDF erzeugen
    pdfWindow.webContents.printToPDF(pdfSettings, function(err, data) {
      if (err) {
          console.error('Failed to generate file.');
          return;
      }
      try {
          fs.writeFileSync(filePath, data);
      } catch (err) {
          console.error('Failed to write file.');
          return;
      }
      if (showWindow) {
        pdfWindow.show();
      } else {
        pdfWindow.close();
        pdfWindow.destroy();
      }
    });
  });
}
