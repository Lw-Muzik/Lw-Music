'use strict';

import { readdirSync,  statSync, writeFileSync } from "fs";
import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
// import { setupTitlebar, attachTitlebarToWindow } from "custom-electron-titlebar";
const isDevelopment = process.env.NODE_ENV !== 'production'
import { extname, join } from 'path';
const { musixmatch } = require('4lyrics');
const { axios } = require('axios');
const cheerio = require('cheerio');
var MediaLibrary = require('media-library');
const mm = require('music-metadata-browser');
const { streams,processed } = require("./Main/System/Paths.js");

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);
// setupTitlebar();
let temp = [];
//   let db =[];
  let directories = [];
 // recursively moves through directories looking for .mp3 files
 var recursiveFolders = (dir)=>{
  var store = readdirSync(dir);
  store.forEach((track,index)=>{
      //  
      let newPath = dir+'/'+track;
      if(statSync(newPath).isDirectory() == true){
           recursiveFolders(newPath);
           directories = [...directories,{dir:newPath}]
      }else if(statSync(newPath).isFile() == true && extname(newPath) == ".mp3"){
          // console.log(`${newPath}`);
          temp = [...temp,{corePath:`${newPath}`}];

      }
      // writeFileSync("./store.json",JSON.stringify(temp));
      // console.log(temp);
});
 }


async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    // alwaysOnTop:true,
    // frame:false,
    height: 600,
    webPreferences: {
      preload:join(__dirname,"preload.js"),
           nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: process.env.ELECTRON_NODE_INTEGRATION,
            enableBlinkFeatures:process.env.ELECTRON_NODE_INTEGRATION,
            nodeIntegrationInSubFrames:process.env.ELECTRON_NODE_INTEGRATION,
            nodeIntegrationInWorker:process.env.ELECTRON_NODE_INTEGRATION
    }
  });
  // attachTitlebarToWindow(win);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    // console.log(appStore);
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }
  // save user playlist
  // ipcMain.on('saveUserData',(event,args) => {
    // writeFileSnyc(processed,JSON.stringify(args));
  // })
/**
 * load tracks from selected directory
 */
         ipcMain.on('openDir',(event,args)=>{
          // choose music directorty
              dialog.showOpenDialog(win,{
                  properties:['openDirectory'],
                  defaultPath:app.getPath("music"),
                  buttonLabel:"Select music folder",
                  title:"Choose a folder"

              }).then((filePath)=>{
              recursiveFolders(filePath.filePaths[0]);
              });
       });
    /*
    Get hot 100 
    */
            let stream = [];
       ipcMain.on('hot100',(e,url)=>{
           axios.get(url).then((response)=>{
              var dom = response.data;
            //   console.log(dom);
              
              const ch = cheerio.load(dom);
              let trackList = ch('.hot100')
              // let trackPic = ch('img.imagefillstr');
          trackList.each((index,element)=>{
              let hot100 = {
                  title:`${element.children[0].children[5].children[0].children[0].data}`,
                  artist:`${element.children[0].children[5].children[1].children[0].data}`,
                  artWork:`${element.children[0].children[3].children[1].attribs.data}`,
                  url:element.children[2].children[3].children[1].attribs.src
              }
              stream = [...stream,hot100];
            
              writeFileSync(streams,JSON.stringify(stream));
            });
          var songs = (JSON.parse(readFileSync(streams)));
          console.log(songs)
          //  e.sender.send('stream',songs);
         });

    });
  /**
   * 
   * fetch lyrics
   */
   ipcMain.on('fetchLyrics',(e,data)=>{
        musixmatch.getURL(`${data[0]} ${data[1]}`).then((url)=>{
            musixmatch.getLyrics(url).then((lyrics)=>{
              console.log(lyrics);
            e.sender.send('lyrics',lyrics);
            }).catch((error) => dialog.showErrorBox("Lyrics Error",`${error}`))
        });
      });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
