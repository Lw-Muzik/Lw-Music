import {  readFileSync,  statSync, writeFileSync, existsSync, readdirSync } from "fs";
import { app, protocol,dialog, BrowserWindow, ipcMain,  Menu, Tray, nativeImage, nativeTheme } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer';
const isDevelopment = process.env.NODE_ENV !== 'production'
import { extname, join } from 'path';
import { image }  from "./Core/default";
import { Axios } from 'axios';
const cheerio = require('cheerio');
const { streams,processed,art, appStore ,settings, favourite, recentPlays} = require("./Main/System/Paths.js");
import NodeID3 from "node-id3";
import ZFileSystem from "./Main/Core/Filesystem";
import { fstatSync } from "fs";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);
// songs store
var store = JSON.parse(readFileSync(processed));
/**
 * @param {NodeID3.Tags} tags
 * @param { String } urls 
 */
 var savePath = function(urls){
    let paths = JSON.parse(readFileSync(settings));
    paths.savedPaths = [...paths.savedPaths ,urls];
    writeFileSync(settings,JSON.stringify(paths));
}

// update the current paths
var updatePaths = function(data){
    let paths = JSON.parse(readFileSync(settings));
    paths.savedPaths = data;
    writeFileSync(settings,JSON.stringify(paths));
}


ipcMain.on('updatePath', (event, data) => {
  console.log(`Up coming changes => ${data}`)
    updatePaths(data);
  let paths = JSON.parse(readFileSync(settings));
    event.sender.send('savedPath', paths.savedPaths);
} );
/*
 * @param { NodeID3.Tags } tags 
 * @param {*} track 
 */
var saveArtWork = async function(tags,track,event){
  console.log(`Working on => ${track}`)
  event.sender.send("loadingSongs",track);
    try {
      if((tags.image.imageBuffer) != undefined && existsSync(join(art,track.replace(".mp3",".jpeg"))) == false){
            writeFileSync(`${join(art,track.replace(".mp3",".jpeg"))}`,tags.image.imageBuffer);
      }
    } catch (e) {
      console.log(`Error in loading cover art => ${e}`);
    }
    //  Storing cover arts
}
 /*
  *
  * @param {String } dir 
  */
 var recursiveFolders =  async function(dir,event){
   /** Reads only mp3 files from directory */
        var zFiles = new ZFileSystem();
        var dataStore = zFiles.recursiveFolders(dir);
           /** Reads only mp3 files from directory */
               dataStore.forEach(async(data,index)=>{
                 let tags = NodeID3.read(`${data.n}`);
                 /*
                 *  Checking store is not empty and  if the .mp3 file is already stored 
                 */
                         let meta =  {
                           id:index,
                           title: tags.title == undefined ? data.t.replace(".mp3", "") : tags.title,
                           genre: tags.genre == undefined ? "Unknown genre" : tags.genre,
                           album: tags.genre == undefined ? "Unknown album" : tags.album,
                           artist: tags.artist == undefined ? "Unknown artist" : tags.artist,
                           artwork:`${join(art, data.t.replace(".mp3", ".jpeg"))}`,
                           n_track:data.t,
                           trackPath: data.n,
                           size:statSync(`${data.n}`).size,
                           folder:data.f,
                           data: `file://${data.n}`,
                         };
                         store = [...store, meta];
                         console.log(`> ${meta.n_track}`);
                         event.sender.send("loadingSongs",meta.title);
               });
            
   }
const icon = nativeImage.createFromDataURL(image);
async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1450,
    height:850,
    alwaysOnTop:true,
    frame:false,
    hasShadow:true,
    roundedCorners:true,
    icon:icon,
    webPreferences: {
           nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            enableRemoteModule: process.env.ELECTRON_NODE_INTEGRATION,
            enableBlinkFeatures:process.env.ELECTRON_NODE_INTEGRATION,
            nodeIntegrationInSubFrames:process.env.ELECTRON_NODE_INTEGRATION,
            nodeIntegrationInWorker:process.env.ELECTRON_NODE_INTEGRATION,
            webSecurity:false,
            webgl:true,
            webviewTag:true 
    }
  });
  //
  nativeTheme.themeSource = 'dark';


  win.webContents.on('did-start-loading',()=>{
    /**Settings path */
    if(existsSync(settings) == false){
      const set = {
          savedPaths:[], 
          volume:0.17,
          eq:[3.3,2.0,1.0,0.0,0.0,1.0,2.3,2.6,2.0,3.0],
          bass:0,
          treble:0, 
          trebleQ:1.97,
          currentTime:0,
          currentDuration:0,
          playing:false,
          currentSong:{},
          duration:0,
          bassQ:2.67,
          eqPreset:"normal",
          bassFreq:60,
          tFreq:12000,
          gain:1,
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

    /* ------ loading songs --------*/
    win.webContents.send('processed',processed);
    const loaded = JSON.parse(`${readFileSync(processed)}`);
    win.webContents.send('loaded',loaded);
    // ------------------------------------------

    win.webContents.send('streams',streams);

    // ==========favurites============
    win.webContents.send('favourite',favourite);
    const favTracks = JSON.parse(readFileSync(favourite));
    win.webContents.send('f',favTracks);
    // ----------------------------------

    const recents = JSON.parse(readFileSync(recentPlays))
    win.webContents.send('recents',recents);
});

win.webContents.on('did-frame-finish-load',() => {
    const paths = JSON.parse(readFileSync(settings)).savedPaths;
      /** to avoid repeating urls lets use a set*/
      win.webContents.send('settings',settings);
    win.webContents.send('processed',processed);
    win.webContents.send('streams',streams);
    win.webContents.send('favourite',favourite);
     /* The after send unique data */
     console.log("Done loading....");
   win.webContents.send("sPaths",paths);
     if(paths.length == 0){
      writeFileSync(processed, JSON.stringify([]));
     }
});


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
    //writeFileSync(processed,JSON.stringify(args));
  })

  // maximize when fullscreen event triggered
  ipcMain.on("fullscreen",(event,args) => {
    win.maximize();
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
                  win.webContents.send('chosen',response.filePaths[0]);
                  savePath(response.filePaths[0]);

                  (async function(){
                    await recursiveFolders(`${response.filePaths[0]}`,event);
                 })();
                // we save the files back to the store
                   writeFileSync(processed, JSON.stringify(store));
                   win.webContents.send("donewithsongs",store)
                  //  event.sender.send();
                   event.sender.send("doneSaving","Done saving songs");
                   console.log('Done saving songs');
                   // then after load the response
                   if(store.length != 0){
                     store.forEach(async function(element,index){
                       const tags = await NodeID3.Promise.read(`${element.trackPath}`);
                       await saveArtWork(tags,`${element.n_track}`,event);
                   event.sender.send("loadingSongs","Done saving images");
                   });
                 }
                }else{
                  // event.sender.send("nothing");
                  console.log("Nothing selected")
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
      console.log(`Songs saved => ${store}`);
      store = [];
      console.log("Cleared previous songs");
       /***first reset the store */
      
      var db = [];
       const paths = JSON.parse(readFileSync(settings)).savedPaths;
        if(paths.length != 0){

        (async function(){
          paths.forEach(async (url)=> {
            console.log(`refreshing url => ${url}`,e);
            e.sender.send("loadingSongs",url);

            await recursiveFolders(url,e);

          });
        })();

        writeFileSync(processed, JSON.stringify(store));
        e.sender.send("loadingSongs","Done saving images");

        e.sender.send("donerefreshing","Done refreshing songs");
        console.log('Done saving songs');

        // refresh the artwork as well
        if(store.length != 0){
          store.forEach(async function(element,index){
            const tags = await NodeID3.Promise.read(`${element.trackPath}`);
            await saveArtWork(tags,`${element.n_track}`,e);

            if(store.length == index+1){
                win.webContents.send('loaded',store);
             }
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
    // var lyrics = NodeID3.read(`${args[2]}`);
   
      console.log("Fetching online lyrics...")
       
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
              {label:"FullScreen",role:"togglefullscreen",accelerator:"F11"},
              {"label":"Hot relaod",role:"reload",accelerator:"F6"},
              {label:"Settings",submenu:[
                {label:"App UI Theme",click:(b)=>{ console.log(`App UI setting  ${b.visible}`)}}
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
