import { app, shell } from 'electron';
import { printPug, printPugToPdf } from 'electron-pug-printer';
import * as Settings from 'electron-settings';
import * as fs from 'fs-extra';
import * as path from 'path';

import { ErrorRequest } from '../models/errorRequest.class';
import { end, on, send } from '../slots';

function dateToString(date: Date): string {
  const split = date.toISOString().split('T');
  return split[0];
}
export function init() {
  const appDataPugPath = path.join(app.getPath('userData'), '/pugfiles').replace('\\\\', '\\');
  fs.ensureDir(appDataPugPath);
  const _pO_PDF = {
    marginsType: 0,
    printBackground: false,
    printSelectionOnly: false,
    landscape: false
  };

  on('put/pugfiles', (event: any, arg: File) => {
    let newPath = path.join(appDataPugPath, arg.name);
    if (arg.name.toLowerCase().includes('.pug')) {
      newPath = path.join(appDataPugPath, new Date().getTime().toString() + '-' + arg.name.replace(/-/g, ''));
    }

    fs.copy(arg.path, newPath)
      .then(() => {
        send(event, 'put/pugfiles', arg);
      })
      .catch((err: any) => {
        send(event, 'put/pugfiles', ErrorRequest.create(err, arg));
      });

  });

  on('get/pugfiles', (event: any, arg: any) => {

    fs.readdir(appDataPugPath, (err: any, flist: string[]) => {
      if (err) {
        send(event, 'get/pugfiles', ErrorRequest.create(err, arg));
      } else {
        const newArr = [];
        for (let i = 0; i < flist.length; i++) {
          const filenname = flist[i];
          const splitAttr = filenname.split('-');
          if (filenname.toLowerCase().includes('.pug') && splitAttr.length === 2) {
            const newFile = {
              name: splitAttr[1],
              created: new Date(Number(splitAttr[0])).toLocaleString('de-DE'),
              id: filenname.replace('\\\\', '\\')
            };
            newArr.push(newFile);
          }
        }
        send(event, 'get/pugfiles', newArr);
      }
    });
  });



  on('put/pdf', (event: any, arg: { pugname: string, locals: Object, filename?: string }) => {
    try {
      printPugToPdf({
        pugOptions: {
          filePath: path.join(appDataPugPath, arg.pugname),
          locals: arg.locals
        },
        printOptions: _pO_PDF
      }).then((data: any) => {
        const now = new Date();

        const splitPugName = arg.pugname.split('.');
        const pdfFileDir = path.join(appDataPugPath, dateToString(now), splitPugName[0]);

        fs.ensureDir(pdfFileDir)
          .then(() => {
            const pdfFilePath = (arg.filename)
              ? path.join(pdfFileDir, arg.filename)
              : path.join(pdfFileDir, now.getTime().toString() + '.pdf');

            fs.writeFile(pdfFilePath, data, (error: any) => {
              if (error) {
                send(event, 'put/pdf', ErrorRequest.create(error, arg));
              } else {
                send(event, 'put/pdf', { file: pdfFilePath, input: arg });
              }
            });
          })
          .catch((error: any) => {
            send(event, 'put/pdf', ErrorRequest.create(error, arg));
          });


      }).catch((error: any) => {
        send(event, 'put/pdf', ErrorRequest.create(error, arg));
      });
    } catch (e) {
      send(event, 'put/pdf', ErrorRequest.create(e, arg));
    }
  });

  on('put/pdf/print', (event: any, arg: { pugname: string, locals: Object, filename?: string }) => {
    try {
      printPug({
        pugOptions: {
          filePath: path.join(appDataPugPath, arg.pugname),
          locals: arg.locals
        },
        printOptions: {
          silent: true,
          printBackground: false,
          deviceName: Settings.get('printer')
        }
      }).then(() => {
        send(event, 'put/pdf/print', { input: arg });
      }).catch((error: any) => {
        send(event, 'put/pdf/print', ErrorRequest.create(error, arg));
      });
    } catch (e) {
      send(event, 'put/pdf/print', ErrorRequest.create(e, arg));
    }
  });


  on('get/pdf/buffer', (event: any, arg: { pugname: string, locals: Object }) => {
    try {
      printPugToPdf({
        pugOptions: {
          filePath: path.join(appDataPugPath, arg.pugname),
          locals: arg.locals
        },
        printOptions: _pO_PDF
      }).then((data: any) => {
        send(event, 'get/pdf/buffer', { input: arg, buffer: data });
      }).catch((error: any) => {
        send(event, 'get/pdf/buffer', ErrorRequest.create(error, arg));
      });
    } catch (e) {
      send(event, 'put/pdf/buffer', ErrorRequest.create(e, arg));
    }
  });

  on('get/pdf/fullscreen', (event: any, arg: { filename: string }) => {
    shell.openItem(arg.filename);
    end(event);
  });

  on('get/pugfolder', (event: any, _: any) => {
    shell.openItem(appDataPugPath);
    end(event);
  });

  on('get/pdf/folder', (event: any, arg: { pugname: string }) => {
    const now = new Date();
    const splitPugName = arg.pugname.split('.');
    const pdfFileDir = path.join(appDataPugPath, dateToString(now), splitPugName[0]);
    shell.openItem(pdfFileDir);
    end(event);
  });
}
