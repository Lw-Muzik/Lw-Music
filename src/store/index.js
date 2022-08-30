
import { createStore } from 'vuex'
import { Equalizer } from '../Core/Equalizer';
import { ipcRenderer, remote } from 'electron';
const { image } = require("../Core/default");
import * as id3 from "music-metadata-browser";
import { readFileSync, writeFileSync } from 'fs';


// declarations
const audio = new Audio();
audio.crossOrigin = "anonymous";
  var url = `${remote.app.getPath('userData')}/settings.json`,
  favUrl = `${remote.app.getPath('userData')}/favourite.json`,
  recentUrl =  `${remote.app.getPath('userData')}/recents.json`;
  const db = JSON.parse(readFileSync(url));

// set volume basing on the one saved in the previous session
audio.volume = db.volume;
const eq = new Equalizer(audio);
eq.startEq();
audio.volume = db.volume;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
var musicFiles = [] ,globalPaths = [];

ipcRenderer.on("donewithsongs",(e,args)=>{
    musicFiles = args;
});

ipcRenderer.on("sPaths",(e,args) => {
  globalPaths = args;
});


export default createStore({

  state: {
    volume:db.volume,lyrics:'', playlist:musicFiles, reduceCount:0,trackPlaying:'',currentData:[],paths:globalPaths,
    player:audio, delays:eq.getDelayBands(), feedback:eq.getFeedBack(),
    bands:eq.getBands(),bass:eq.getBass(),treble:eq.getTreble(),songId:0,
    equalizer:eq, Id3:id3, counter:0,now:{ title:"title", artist:"", album:"", artwork:image,},
    genreCategory:'',genreBack:false,muData:{},defaultCover:image,showSidenav:false,streamUrl:'',
    balance:eq.balance,compressor:eq.compressor,recentPlays:JSON.parse(readFileSync(recentUrl)),
    currentTime:db.currentTime,currentDuration:db.currentDuration,currentSong:db.currentSong,currentPlayingState:db.playing,
    favourite:JSON.parse(readFileSync(favUrl)),currentIndex:0,bbass:db.bass, btreble:db.treble,eqPreset:db.eqPreset,
    currentRoom:db.room.delay, currentRoomFeed:db.room.feedback, currentEq:db.eq, cBass:db.bassFreq, cTreble:db.tFreq,QTreb:db.trebleQ,Qbass:db.bassQ
  },
  mutations: {
    // streams url
    streamsUrl(){
      ipcRenderer.on('streams',(e,args) => {
        streamUrl = args;
      });
    },
    // saves the current state of player
    saveCurrentState(state,payload){
      // for persistent storage
      db.currentTime = payload[0];
      db.currentDuration = payload[1];
      // save to persistent storage (settings.json)
      writeFileSync(url,JSON.stringify(db));
    },
    updateIsPlaying(state,payload){
      state.currentPlayingState = payload;
      db.playing = payload;
          // save to persistent storage (settings.json)
          writeFileSync(url,JSON.stringify(db));
    },
    // updateSong Id
    setSongId(state,payload){
        state.songId = parseInt(payload);
    },
    // show side nav
    setShowSidenav(state,payload){
      state.showSidenav = payload;
    },
    // sets the volume globally
    setVolume(state,payload){
      console.log(`Volume:${payload}`);
      state.player.volume = payload;
      db.volume = payload;
      writeFileSync(url,JSON.stringify(db));
    },
    // updates the playlist data
    updatePlaylist(state,payload){
      state.playlist = [...state.playlist,payload];
    },
    // updates the equalizer presets
    setEqPreset(state,payload){
      state.eqPreset = payload;
      db.eqPreset = payload;
      writeFileSync(url,JSON.stringify(db))
    },
    // saves recents plays
    saveRecentPlays(state,payload){
        state.recentPlays = [...state.recentPlays, payload];
        writeFileSync(recentUrl , JSON.stringify(state.recentPlays));
    },
    // saves favourites tracks
    saveFavourite(state,payload){
      state.favourite = [...state.favourite, payload];
      writeFileSync(favUrl,JSON.stringify(state.favourite));
    },
    // sets the genre category
    setGenreCat(state,payload){
      state.genreCategory = payload;
    },
    // updates between routes in artist, genres, albums
    setGenreBack(state,payload){
      state.genreBack = payload;
    },
    // loads current playlist
    loadPlaylist(state,payload){
        state.playlist = payload;
    },
    // works on current track playing
    nowPlaying(state,payload){
        state.now = payload;
    },
    // acts as global player for the app
    audioPlayer(state, payload){
      console.log(payload);
        state.player.src = payload[state.currentIndex];
        state.player.play();
        // playnext after currentTarget
        state.player.onended = ()=>{
            state.currentIndex += 1;
            state.player.src = payload[state.currentIndex];
            state.player.play();

        }
    },
    playNext(state,payload){
      
    },
    prevTrack(state,payload){
      state.currentIndex -= 1;
      state.player.src = payload[state.currentIndex];
      state.player.play();
    },
    // fetch lyrics from internet using musixmatch as the source
    fetchLyrics(state , payload){
      ipcRenderer.send("fetchLyrics",payload);
    },
    // updates the current equalizer array
    updateCurrentEq(state,payload){
        state.currentEq = payload;
        db.eq = payload;
        writeFileSync(url,JSON.stringify(db));
    },
    // updates the delay array
    updateCurrentRoom(state,payload){
        state.currentRoom = payload;
        db.room.delay = payload;
        writeFileSync(url,JSON.stringify(db));
    },
    // updates the feedback array
    updateCurrentRoomFeed(state,payload){
        state.currentRoomFeed = payload;
        db.room.feedback = payload;
        writeFileSync(url,JSON.stringify(db));
    },
    // updates the bass gain
    updateCurrentBass(state,payload){
        state.equalizer.bass.frequency.value = payload;
        state.cBass = payload;
        db.bassFreq = payload;
        writeFileSync(url,JSON.stringify(db));
    },
    // updates the treble gain 
    updateCurrentTreble(state,payload){
      state.equalizer.treble.frequency.value = payload;
        state.cTreble = payload;
        db.tFreq = payload;
        writeFileSync(url,JSON.stringify(db));
    },
    // chnages the feedback value
    changeFeedBack(state,payload){
        state.feedback[payload[0]].gain.value = payload[1];
    },
    // chnages the feedback value
    changeDelays(state,payload){
        state.delays[payload[0]].delayTime.value = payload[1];
    },
    // updates the bands value in the hood
    updateBands(state,payload){
      state.bands[payload[0]].gain.value = payload[1];
    },
    // updates the treble quality
    updateTrebleQ(state,payload){
      state.equalizer.treble.Q.value = payload;
        state.Qbass = payload;
        db.trebleQ = payload;
        writeFileSync(url,JSON.stringify(db));
    },
    // updates the bass quality
    updateBassQ(state, payload){
      state.equalizer.bass.Q.value = payload;
      state.QTreb = payload;
      db.bassQ = payload;
        writeFileSync(url,JSON.stringify(db));
    },
    // updates the bass gain
    tuneBass(state,payload){
      state.bass.gain.value = payload;
      state.bbass = payload;
      db.bass = payload;
        writeFileSync(url,JSON.stringify(db));
    },
    // updates the treble gain
    tuneTreble(state,payload){
      state.treble.gain.value = payload;
      state.btreble = payload;
      db.treble = payload
      writeFileSync(url,JSON.stringify(db));
    },
    incrementCount(state,payload){
      state.counter = payload;
  },

  playSong(state,payload){
    state.player.src = payload;
  },
  musicData(state,payload){
    state.muData = payload;
    db.currentSong = payload;
    // save new playing song
    writeFileSync(url,JSON.stringify(db));
  },
  playStream(state,payload){
      state.player.src = payload;
      state.player.crossOrigin = "anonymous";
      state.player.play();
  },
  decreaseCount(state,payload){
    state.reduceCount = payload;
},
// setting bass quality
setBassQ(state,payload){
  state.equalizer.bass.Q.value = payload;
},
// setting bass quality
setBassFreq(state,payload){
  state.equalizer.bass.frequency.value = payload;
},
// settings the treble quality
setTrebleQ(state,payload){
  state.equalizer.treble.Q.value = payload;
},
// settings the master gain for the player
setGain(state,payload){
  state.equalizer.gain.gain.value = payload;
},
// setting the audio playback rate
setSpeed(state,payload){
  state.player.playbackRate = payload;
},
  },
  // getters to update the system
  getters:{
    // currentSong id playing 

    getSongId:(state) => state.songId,
    // get systems paths
    getGlobalPaths:(state) => state.paths,
    // get the recent plays
    getRecentPlays:(state) => state.recentPlays,
    getVolume : (state) => state.volume,
    getPlaylist:(state) => state.playlist,
    getPlayer: (state) => state.player,
    getDefaultCover:(state) => state.defaultCover,
    getBands: (state) => state.bands,
    getFeedback :(state) => state.feedback,
    getDelays: (state) => state.delays,
    getEqualiser:(state) => state.equalizer,
    getBass :(state) => state.bass,
    getTreble: state => state.treble,
    getNowPlaying:(state)=> state.now,
    getId3:(state)=> state.Id3,
    getMusicData:(state) => state.muData,
    reduceCount:(state)=> state.reduceCount,
    getCount:(state)=> state.counter,
    getGenreCategory:(state) => state.genreCategory,
    getGenreBack:(state) => state.genreBack,
    getFavourites:(state) => state.favourite,
    getRecents: (state) => state.recentPlays,
    getCompressor: state => state.compressor,
    getBalance: state => state.balance,
    getTrebleQ:state => state.QTreb,
    getBassQ: state => state.Qbass,
    getCurrentRoom: state => state.currentRoom,
    getCurrentEq: state => state.currentEq,
    getCurrentBass: state => state.cBass,
    getCurrentTreble: state => state.cTreble,
    getBassB: state => state.bbass,
    getTrebleB: state => state.btreble,
    getEqPreset: state => state.eqPreset,
    getCurrentRoomFeed: state => state.currentRoomFeed,
    // retriving current bassFreq
    getBassFreq: state => state.equalizer.bass.frequency.value,
    // get current bass Q
    getBassQ: state => state.equalizer.bass.Q.value,
    // get current treble frequency
    getTrebleQ: state => state.equalizer.treble.Q.value,
    // get current gain
    getGain: state => state.equalizer.gain.gain.value,
    // get current audioplay back
    getSpeed: state => state.player.playbackRate,
   // getter for toggling the sidenav
    showSidenav: state => state.showSidenav,
    getStreamUrl:state => state.streamUrl,
    // getters for current time, duration, and track 
    getCurrentTime: state => state.currentTime,
    getCurrentDuration: state => state.currentDuration,
    getCurrentSong: state => state.currentSong,
    getCurrentPlayingState: state => state.currentPlayingState
  }
})
