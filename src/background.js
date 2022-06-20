import { readdir,  readFileSync,  statSync, writeFileSync, existsSync, readdirSync } from "fs";
import { app, protocol,dialog, BrowserWindow, ipcMain,  Menu, Tray, nativeImage } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production'
import { extname, join } from 'path';
import { image }  from "./Core/default";
const { musixmatch } = require('4lyrics');
import { Axios } from 'axios';
const cheerio = require('cheerio');
const { streams,processed,art, appStore ,settings, favourite} = require("./Main/System/Paths.js");
import NodeID3 from "node-id3";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);
// songs store
var store = JSON.parse(readFileSync(processed));
/**
 * 
 * @param {NodeID3.Tags} tags
 */

/****
 * @param { String } urls
 */
 var savePath = function(urls){
  let paths = JSON.parse(readFileSync(settings));
  paths.savedPaths = [...paths.savedPaths ,urls];
  writeFileSync(settings,JSON.stringify(paths));
}

var saveArtWork = async function(tags,track){
    //  Storing cover arts
          if((tags.image.imageBuffer) !== undefined && existsSync(join(art,track.replace(".mp3",".jpeg"))) == false){
            writeFileSync(`${join(art,track.replace(".mp3",".jpeg"))}`,tags.image.imageBuffer)
          }
}

 // recursively moves through directories looking for .mp3 files

 /**
  * 
  * @param {String } dir 
  */
 var recursiveFolders =  async function(dir){
   /** Reads only mp3 files from directory */
   var files = readdirSync(dir);

      files.forEach(async function(track, index) {

        let newPath = dir + '/' + track;

        if (statSync(newPath).isDirectory() == true) {
          await recursiveFolders(newPath);
          console.log(`Paths in queue ${newPath}`);
        } else if (statSync(newPath).isFile() == true) { //&& extname(newPath) == ".mp3"
        let tags = NodeID3.read(`${newPath}`);
          /**Checking store is not empty and  if the .mp3 file is already stored */
                  let meta =  {
                    title: tags.title == undefined ? track.replace(".mp3", "") : tags.title,
                    genre: tags.genre == undefined ? "Unknown genre" : tags.genre,
                    album: tags.genre == undefined ? "Unknown album" : tags.album,
                    artist: tags.artist == undefined ? "Unknown artist" : tags.artist,
                    artwork:`${join(art, track.replace(".mp3", ".jpeg"))}`,
                    n_track:track,
                    trackPath: newPath,
                    folder:dir,
                    data: `file://${newPath}`,
                  };
                  store =  [...store, meta];
                }
            });
            
 }

//await saveArtWork(tags,track);

const icon = nativeImage.createFromDataURL(image);
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

  win.webContents.on('did-start-loading',()=>{
    /**Settings path */
    if(existsSync(settings) == false){
      const set = {
          savedPaths:[ `${app.getPath('music') }` ], 
          volume:0.17,
          eq:[3.3,2.0,1.0,0.0,0.0,1.0,2.3,2.6,2.0,3.0],
          bass:0,
          treble:0, 
          trebleQ:1.97,
          bassQ:2.67,
          eqPreset:"normal",
          bassFreq:65,
          tFreq:12000,
          room:{
            delay:[0,0],
            feedback:[0,0],
          }
      };
      writeFileSync(settings,JSON.stringify(set));
      /**Send all necessary data to renderer*/
      
}


if (existsSync(favourite) == false) {
  writeFileSync(favourite,JSON.stringify([]));
}
  });
  
  // send settings url to render process when dom starts loading
 win.webContents.on('did-stop-loading',async()=>{
    win.webContents.send('settings',settings);
    win.webContents.send('processed',processed);
    win.webContents.send('streams',streams);
    win.webContents.send('favourite',favourite);
   
});


win.webContents.on('did-frame-finish-load',() => {
    const paths = JSON.parse(readFileSync(settings)).savedPaths;
      /** to avoid repeating urls lets use a set*/

     /* The after send unique data */
     console.log("Done loading....")
    //  if(paths.length != 0){
    //    /**first clear the store the rewrite to */
    //   writeFileSync(processed, JSON.stringify([]));
    //    paths.forEach(async function(url){
    //      await recursiveFolders(url)
    //    });
     if(paths.length == 0){
      writeFileSync(processed, JSON.stringify([]));
     }
});

win.webContents.on('dom-ready',async function(){
    /**loading the music store */
  
})

  // attachTitlebarToWindow(win);
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app');
   win.webContents.openDevTools()
  // win.setIcon(image)
    // Load the index.html when not in development
    await win.loadURL('app://./index.html');
  }
  // save user playlist
  ipcMain.on('saveUserData',(event,args) => {
    //writeFileSync(processed,JSON.stringify(args));
  })
  /*
   *On response from the rendererer then load save persistent data 
   */


/**
 * load tracks from selected directory
 */
         ipcMain.on('loadFolder',(event,args)=>{
          // choose music directorty
           dialog.showOpenDialog(win,{
                  properties:['openDirectory'],
                  defaultPath:app.getPath("music"),
                  buttonLabel:"Select",
                  title:"Choose a music folder"
              }).then((response)=>{
                if (response.filePaths[0] != null) {
                  
                  event.sender.send('chosen',response.filePaths[0]);
                  savePath(response.filePaths[0]);

                  (async function(){
                    await recursiveFolders(`${response.filePaths[0]}`)
                 })();
                 
                // we save the files back to the store
                   writeFileSync(processed, JSON.stringify(store));
                   // then after load the response
                   if(store.length != 0){
                     store.forEach(async function(element){
                       const tags = await NodeID3.Promise.read(`${element.trackPath}`);
                       await saveArtWork(tags,`${element.n_track}`);
                   });
                 }
                }else{
                  event.sender.send("nothing");
                }
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
         });
    });

    
    ipcMain.on('refresh',(e,args)=>{
      console.log(`Songs saved => ${store}`)

       /***first reset the store */
      
      var db = [];
       const paths = JSON.parse(readFileSync(settings)).savedPaths;
        if(paths.length != 0){
        (async function(){
          paths.forEach(async (url)=> {
            console.log(`refreshing url => ${url}`)
            await recursiveFolders(url);
          });
        })();
        writeFileSync(processed, JSON.stringify(store));
        // refresh the artwork as well
        if(store.length != 0){
          store.forEach(async function(element){
            const tags = await NodeID3.Promise.read(`${element.trackPath}`);
            await saveArtWork(tags,`${element.n_track}`);
        });
      }
        }else{
        console.log("refreshing to empty.....")
        writeFileSync(processed, JSON.stringify([]));
        }
    })
  /**
   * fetch lyrics
   */
   ipcMain.on('fetchLyrics',(e,args)=>{
        musixmatch.getURL(`${args[0]} ${args[1]}`).then((url)=>{
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
    // try {
    //   await installExtension(VUEJS3_DEVTOOLS)
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString());
    // }
  }

  let menue = Menu.buildFromTemplate([
            {"label":"Amp Music",click:()=>{ 
            app.show()
            }},
            {"label":"Min screen",role:"minimize",click:function(){ 
              app.hide();
            }},
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
  await createWindow();
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
