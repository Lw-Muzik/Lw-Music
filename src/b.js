// "use strict";
// import { autoUpdater } from "electron-updater"
// import { app, protocol,BrowserWindow, ipcMain ,dialog} from 'electron';
// import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
// import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
// const isDevelopment = process.env.NODE_ENV !== "production";
// // import { readdirSync,  statSync, writeFileSync } from "fs";
// import { extname, join } from 'path';
// const { musixmatch } = require('4lyrics');
// const { axios } = require('axios');
// const cheerio = require('cheerio');
// var MediaLibrary = require('media-library');

// protocol.registerSchemesAsPrivileged([
//   { scheme: "app", privileges: { secure: true, standard: true } },
// ]);
// function createWindow() {
//     const win = new BrowserWindow({
//         height: 600,
//         width: 1295,
//         darkTheme:true,
//         // frame:false,
//         alwaysOnTop:true,
//         webPreferences: {
//             nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
//             contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
//             enableRemoteModule: process.env.ELECTRON_NODE_INTEGRATION,
//             enableBlinkFeatures:process.env.ELECTRON_NODE_INTEGRATION,
//             nodeIntegrationInSubFrames:process.env.ELECTRON_NODE_INTEGRATION,
//             nodeIntegrationInWorker:process.env.ELECTRON_NODE_INTEGRATION

//         },
//         icon:isDevelopment?join(__dirname,'./assets/pAudio.png'):'./pAudio.png',
//     });
  


//       ipcMain.on('focus',(e,args)=>{
//         // app.show();
//         win.show();
//         win.focus();
//           // app.focus();
//       })
//        ipcMain.on('dataList',(e,args)=>{
//         // var library = new MediaLibrary({
//         //   // persistent storage location (optional)
//         //   dataPath: '/home/blabs/Music',
//         //   // the paths to scan
//         //   paths: [ '/home/blabs/Music' ]
//         // });
//         //  library.scan().on('done', () => {
//         //   // listing all tracks
//         //   library.tracks((err, tracks) => e.sender.send('lib',tracks));
//         // });
         
//        })

     
//      });
//      if (process.env.WEBPACK_DEV_SERVER_URL) {
//       // Load the url of the dev server if in development mode
//        win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
//     } else {
//       createProtocol('app');
      
//       win.loadURL(`app://./index.html`);
//       win.webContents.openDevTools();
//       //  Load the index.html when not in development
//       autoUpdater.checkForUpdatesAndNotify();// for auto updates
//     }
  
// }
// app.whenReady().then(()=>{
//     if (isDevelopment && !process.env.IS_TEST) {
     
//          installExtension(VUEJS_DEVTOOLS).then((message)=>{
//            console.log(`installation mesage ${message}`);
//          }).catch((error)=>{
//           console.error(`Vue Devtools failed to install: ${error.toString()}`);
//          })
     
//       }
//        // With
//   if (!process.env.WEBPACK_DEV_SERVER_URL) {
//     createProtocol('app')
//   }
//     createWindow();
// });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });

// app.on('activate', () => {
//     if (BrowserWindow.getAllWindows().length === 0) {
//         createWindow();
//     }
// });

/**
 *  "media-library": "^1.2.4",
 * "node-sass":"^8.12.0"
 */
