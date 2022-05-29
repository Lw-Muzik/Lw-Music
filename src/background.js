import { readdir,  readFileSync,  statSync, writeFileSync, existsSync } from "fs";
import { app, protocol,dialog, BrowserWindow, ipcMain,  Menu, Tray, nativeImage } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
// const /*{ setupTitlebar, attachTitlebarToWindow }*/ cs = require("custom-electron-titlebar");
const isDevelopment = process.env.NODE_ENV !== 'production'
import { extname, join } from 'path';
import { image }  from "./Core/default"
const { musixmatch } = require('4lyrics');
import { Axios } from 'axios';
const cheerio = require('cheerio');
const { streams,processed,art ,settings, favourite} = require("./Main/System/Paths.js");
import NodeID3 from "node-id3";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

let temp =  JSON.parse(`${readFileSync(processed)}`) , d = '';
var dPath = "";

 // recursively moves through directories looking for .mp3 files
 /**
  * 
  * @param {String } dir 
  */
 const recursiveFolders =  async (dir)=>{
   /**
    * Reads only mp3 files from directory
    */
  readdir(dir,async (error,files)=>{
    if (error) throw new Error(`Sync Error ${error}`);
  files.forEach(async (track, index) => {
      //  
      let newPath = dir + '/' + track;

      if (statSync(newPath).isDirectory() == true) {
        await recursiveFolders(newPath);
        d = track;
        dPath = newPath;
      } else if (statSync(newPath).isFile() == true && extname(newPath) == ".mp3") {

        // temp = [...temp,{corePath:`${newPath}`}];
        const tags = NodeID3.read(`${newPath}`)
     
        if(tags.image.imageBuffer != undefined && existsSync(join(art,track.replace(".mp3",".jpeg"))) == false){
          writeFileSync(`${join(art,track.replace(".mp3",".jpeg"))}`,tags.image.imageBuffer)
        }
        let meta =  {
          title: tags.title == undefined ? track.replace(".mp3", "") : tags.title,
          genre: tags.genre == undefined ? "Unknown genre" : tags.genre,
          album: tags.genre == undefined ? "Unknown album" : tags.album,
          artist: tags.artist == undefined ? "Unknown artist" : tags.artist,
          artwork: `${join(art, track.replace(".mp3", ".jpeg"))}`,
          folderPath: dPath,
          trackPath: newPath,
          data: `file://${newPath}`,
        };
        temp =  [...temp, meta];
      }
      writeFileSync(processed, JSON.stringify(temp));
    });
});
 }
let globalWin = null;
const icon = nativeImage.createFromDataURL(image)
async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height:700,
    alwaysOnTop:true,
    frame:false,
    icon:icon,
    webPreferences: {
           nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: process.env.ELECTRON_NODE_INTEGRATION,
            enableBlinkFeatures:process.env.ELECTRON_NODE_INTEGRATION,
            nodeIntegrationInSubFrames:process.env.ELECTRON_NODE_INTEGRATION,
            nodeIntegrationInWorker:process.env.ELECTRON_NODE_INTEGRATION,
            webSecurity:false,
            webgl:false,
            webviewTag:true 
    }
  });
  // send settings url to render process when dom starts loading
 win.webContents.on('did-stop-loading',async()=>{
   
     win.webContents.send("settingsUrl",settings);
     // send the path for songs
     win.webContents.send("allSongsUrl",processed);
     // send streams path to the renderer
     win.webContents.send('stream',streams)
     //
     if (existsSync(favourite) == false) {
      writeFileSync(favourite,JSON.stringify([]))
  }
  })

  globalWin = win;

  // attachTitlebarToWindow(win);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app');
  // win.setIcon(image)
    // Load the index.html when not in development
    await win.loadURL('app://./index.html');
  }
  // save user playlist
  ipcMain.on('saveUserData',(event,args) => {
    writeFileSync(processed,JSON.stringify(args));
  })
  /*
   *On response from the rendererer then load save persistent data 
   */
  //
    // ipcMain.on('tracks',async ()=>{
    //   /**
    //    * @access { Array } paths
    //    */
    //   // to avoid repeating urls lets use a set
    //   const unq = new Set();

    //  const paths = JSON.parse(readFileSync(settings)).savedPaths;

    //  paths.forEach(async (url)=>  unq.add(url));
    //  /*
    
    //  The after send unique data
    // */
    //  unq.forEach(async (url)=> await recursiveFolders(url));
    // });
/**
 * load tracks from selected directory
 */
         ipcMain.on('loadFolder',async (event,args)=>{
          // choose music directorty
           dialog.showOpenDialog(win,{
                  properties:['openDirectory'],
                  defaultPath:app.getPath("music"),
                  buttonLabel:"Select",
                  title:"Choose a music folder"
              }).then(async (response)=>{
                event.sender.send("chosenFolder",response.filePaths[0]);
                await recursiveFolders(`${response.filePaths[0]}`)
              });
       });
       
    /*
       Get hot 100
    */
            let stream = [];

       ipcMain.on('hot100',(e,url)=>{
           Axios.get(url).then((response)=>{
              var dom = response.data;
            //   console.log(dom);
              // 
              const ch = cheerio.load(dom);
              let trackList = ch('.hot100')
              // let trackPic = ch('img.imagefillstr');
          trackList.each((index,element)=>{
              let hot100 = {
                  title:`${element.children[0].children[5].children[0].children[0].data}`,
                  artist:`${element.children[0].children[5].children[1].children[0].data}`,
                  artwork:`${element.children[0].children[3].children[1].attribs.data}`,
                  url:element.children[2].children[3].children[1].attribs.src
              }
              stream = [...stream,hot100]
            
              writeFileSync(streams,JSON.stringify(stream));
            });
          var songs = (JSON.parse(readFileSync(streams)));
          // console.log(songs);
          //  e.sender.send('stream',songs);
         });

    });

    // ipcMain.on('play',(e,args)=>{
    //     audio.src = args;
    //     audio.play();
    // })
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
  
  let menue = Menu.buildFromTemplate([
            {"label":"Amp Music",click:()=>{ 
            app.focus() 
            }},
            {"label":"Min screen",role:"minimize"},
            {"label":"UI Tools",
            "submenu":[
              {label:"Devtools",role:"toggleDevTools",accelerator:"F12"},
              {"label":"Hot relaod",role:"reload",accelerator:"F6"},
              {label:"Settings",submenu:[
                {label:"App UI Theme",click:()=>{ alert("App UI setting")}}
              ]}
            ]
          },
          {label:"Quit Amp Musix",role:"close",click:()=>{ app.quit()}}
        ]);
 let tray = new Tray(icon);
 tray.setContextMenu(menue);
 Menu.setApplicationMenu(menue)
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
