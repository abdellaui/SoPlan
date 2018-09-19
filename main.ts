import 'reflect-metadata';
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { setExpressServer } from './database/slots';
import { Database } from './database/database';

let mainWindow: any = null;

// detect mode
const args: any = process.argv.slice(1);
const serve: boolean = args.some(val => val === '--serve');
const test: boolean = args.some(val => val === '--test');

const mockPort: Number = 3030;
const testDatabaseConfigs: Object = {
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '666666',
    database: 'tests'
};

function init(): void {

    const shouldQuit = makeSingleInstance();
    if (shouldQuit) { return app.quit(); }

    if (test) {
        return createMockServer();
    } else {
        return createWindow();
    }

}

function createWindow(): void {


    Database.initialize();

    mainWindow = new BrowserWindow({ width: 1000, height: 800, backgroundColor: '#2e2c29', show: false });


    if (serve) {
        // get dynamic version from localhost:4200
        require('electron-reload')(__dirname, {
            electron: require(path.join(__dirname, '../', '/node_modules/electron'))
        });
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
    mainWindow.webContents.openDevTools();
    // mainWindow.maximize();
    // require('devtron').install();
    // end devTools

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

function createMockServer(): void {
    const expressApp = express();
    expressApp.use(bodyParser.json());
    expressApp.use((req: any, res: any, next: any) => {
        console.log(req.method, req.url, req.body);
        res.header('Content-Type', 'application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    setExpressServer(expressApp);
    Database.initialize(testDatabaseConfigs);

    expressApp.listen(mockPort, () => {
        console.log(`mock server is running on http://localhost:${mockPort}/`);
    });
    mainWindow = true;
}

function makeSingleInstance(): boolean {
    if (process.mas) { return false; }

    return app.makeSingleInstance(() => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) { mainWindow.restore(); }
            mainWindow.focus();
        }
    });
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
