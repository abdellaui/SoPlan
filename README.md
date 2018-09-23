# SoPlan

## install tools
- nodejs
- git
- sourcetree  (gui for git)
- mysql
- mysqlworkbranch (gui for mysql)
(perhaps we'll use postresql)

## features for vscode
- Angular Files ^1.6.2
- Debugger for Chrome ^4.10.1
- EditorConfig for VS Code ^0.12.4
- TSLint ^1.0.39
- TypeScript Hero ^2.3.2
- TypeScript Import ^1.17.0

## run for init project
```
git clone https://github.com/abdellaui/SoPlan.git
cd SoPlan/
npm i -g @angular/cli
npm i --save
npm start
```
## libaries
**Please** read the apis of following frameworks/libs:
* typescript (javascript)
    * rx/js
* angular
    * testing languages:
        * jasmine
        * protractor
* electron
    * testing:
        * spectron
* typeorm
    * decorators:
        * relation
        * validation
* bootstrap
* nebular (ui-kit)
    * theme: components

## mock-server
angular is just a client-side framework, but we want to use native resources etc. So we need a bridge between backend and fronted.
We are communicating on ipc (inter-process-communication), which is a module of electron api. Electron is not aviable on the browser.
The communication is between `ipcRendererServices` (inside angular) and `**/*.slot.ts` files.
`./database/slot.ts` shows adaptering the ipcMain to a http-server (express).
`./src/app/services/ipcRendererServices.ts` shows adaptering the ipcRenderer to a http-client.

Why we not use http always? so, we want to create a standalone executable application, which doesnt only wrap a webpage into a webview and we wont let run a ghost server which listen always to a port, and how we can know to handle with taken ports? 

## *.slot.ts file
use following schema for *.slot.ts files!
```javascript
import { on, send } from './../../slots';

export function init() {

    on('get/channel/name', (event: any, arg: any) => {
        // doSmth();
        send(event, 'get/channel/name', arg);

        // end(event);
    });
    
    // ...
}

```

## how to use git
**please** always develop on the `develop` branch. Do your experiments always on a new branches spawned from `develop` branch. if your experiment goals, then merge it back to `develop`. run the test, if anything causes problem, merge it to `master`. never branch from `master` for solving new problems. 

**please** set your editor correctly, `.editorconfig` will help you. maybe you can import it directly, otherwise check if your auto-formatter changes some correct codes or change you editor, `vscode` is good option. If nothing changes on auto-formatting, you're ready to use git. **This step is very important to save useless change-reports by git.**

**use sourcetree!**

## nice to know

electron starts at `main.ts`. On `serve mode` it will just wrap `http://localhost:4200`, on `build mode` it will wrap and include `/dist`.

you can disactivate "Developer Tools" by commenting `win.webContents.openDevTools();` in `main.ts`.

library imported in `main.ts` (electron) should be installed per npm dependencies (not devDependencies) with `npm install --save`. It will be loaded by electron during build phase and added to the final package.


## browser mode
note that you can't use electron or nodejs native libraries in this case inside angular.

## commands

|Command|Description|
|---|---|
|`npm start`| Execute the app (electron on `serve mode`) |
|`npm run electron:local`| Execute the app (electron on `build mode`) |
|`npm run ng:web`| Execute the app in the browser |
|`npm run clear`|  Removes `/out-tsc` `/release` `/dist` folders |
|`npm run test`| Runs angular unit-testing |
|`npm run e2e`|  Rungs angular end-to-end testing |
|`npm run compile:linux`| Builds your application and creates an app consumable on linux system |
|`npm run compile:windows`| On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems |
|`npm run compile:mac`|  On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

** Application is optimised. Only `/dist` folder and node dependencies are included in the executable.**

## keep calm
npm will show something like `scroll to bottom`, because we use packages like karma and protractor, which are test-frameworks. it is usual, that test-frameworks arent safe.

````
found 36 vulnerabilities (6 low, 22 moderate, 8 high) in 45411 scanned packages
````

