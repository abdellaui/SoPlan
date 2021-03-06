import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';
import * as express from 'express';
import * as path from 'path';
import * as url from 'url';

import { Database } from './backend/database';
import { DatabaseConfig } from './backend/models/configs.class';
import { setExpressServer } from './backend/slots';

let mainWindow: any = null;
let database: Database;

// detect mode
const args: any = process.argv.slice(1);
const serve: boolean = args.some(val => val === '--serve');
const test: boolean = args.some(val => val === '--test');

const mockPort: Number = 3030;

const testDatabaseConfigs: DatabaseConfig = {
  host: 'localhost',
  port: 3306,
  username: 'tester',
  password: 'password',
  database: 'tests'
};

function init(): void {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit(); // Quit second instance
  } else {
    if (test) { createMockServer(); } else { createWindow(); }
  }
}

/**
 * If someone tries to run a new instance, but we already have one, bring it to the front
 */
app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
});

app.on('ready', () => {
});

function createWindow(): void {

  database = new Database();
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 640,
    minHeight: 360,
    backgroundColor: '#ebeff5',
    show: false,
    webPreferences: {
      plugins: true,
      experimentalFeatures: true
    }
  });


  const templatey: MenuItemConstructorOptions[] = [
    {
      label: 'SoPlan',
      submenu: [
        { accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { accelerator: 'CmdOrCtrl+V', role: 'paste' },
        { accelerator: 'CmdOrCtrl+A', role: 'selectAll' }
      ]
    }
  ];

  const template: MenuItemConstructorOptions[] = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        // { role: 'toggledevtools' },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      role: 'window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    }
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    });


    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      { role: 'front' }
    ];
  }


  Menu.setApplicationMenu(Menu.buildFromTemplate(template));

  if (serve) {
    // get dynamic version from localhost:4200
    mainWindow.loadURL('http://localhost:4200');
  } else {
    // load the dist folder from Angular
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, '../', '/dist/index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  // The following is optional and will open the DevTools:
  // please comment it on compiling to a executable
  // mainWindow.webContents.openDevTools();
  // mainWindow.maximize();
  // require('devtron').install();
  // end devTools

  mainWindow.on('closed', () => {
    mainWindow = null;
    database.close();
  });
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

}

function createMockServer(): void {

  const expressApp: any = express();

  // @ts-ignore
  expressApp.use(bodyParser.json());
  expressApp.use((req: any, res: any, next: any) => {
    console.log(req.method, req.url, req.body);
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  setExpressServer(expressApp);
  database = new Database(testDatabaseConfigs);

  expressApp.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(404).end();
  });

  expressApp.listen(mockPort, () => {
    console.log(`mock server is running on http://localhost:${mockPort}/`);
  });


  mainWindow = true;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.

  app.on('ready', init);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      database.close();
      app.quit();
    }
  });

  // initialize the app's main window
  app.on('activate', () => {
    if (mainWindow === null) {
      init();
    }
  });

} catch (e) {
  console.log(e);
}
