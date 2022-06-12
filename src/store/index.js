
import { createStore } from 'vuex'
import { Equalizer } from '../Core/Equalizer';
import { ipcRenderer, remote } from 'electron';
const { image } = require("../Core/default");
import * as id3 from "music-metadata-browser";
import { readFileSync, writeFileSync } from 'fs';

// declarations
const audio = new Audio();
audio.crossOrigin = "anonymous";
let url = `${remote.app.getPath('userData')}/settings.json`,
favUrl = `${remote.app.getPath('userData')}/favourite.json`,
recentUrl =  `${remote.app.getPath('userData')}/recents.json`;
const db = JSON.parse(readFileSync(url));

// set volume basing on the one saved in the previous session
audio.volume = db.volume;
const eq = new Equalizer(audio);
eq.startEq();
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default createStore({
  state: {
    volume:db.volume,lyrics:'', playlist:[], reduceCount:0,trackPlaying:'',
    player:audio, delays:eq.getDelayBands(), feedback:eq.getFeedBack(),
    bands:eq.getBands(),bass:eq.getBass(),treble:eq.getTreble(),
    equalizer:eq, Id3:id3, counter:0,now:{ title:"title", artist:"", album:"", artwork:image,},
    genreCategory:'',genreBack:false,muData:{},defaultCover:image,
    balance:eq.balance,compressor:eq.compressor,recentPlays:JSON.parse(readFileSync(recentUrl)),
    favourite:JSON.parse(readFileSync(favUrl)),currentIndex:0,bbass:db.bass, btreble:db.treble,
    currentRoom:db.room,currentEq:db.eq,cBass:db.bassFreq,cTreble:tFreq,QTreb:db.trebleQ,Qbass:db.bassQ
  },
  mutations: {
    setVolume(state,payload){      
      state.player.volume = payload;
      db.volume = payload;
      writeFileSync(url,JSON.stringify(db));
    },
    updatePlaylist(state,payload){
      state.playlist = [...state.playlist,payload];
    },
    saveRecentPlays(state,payload){
        state.recentPlays = [...state.recentPlays, payload];
        writeFileSync(recentUrl , JSON.stringify(state.recentPlays));
    },
    saveFavourite(state,payload){
      state.favourite = [...state.favourite, payload];
      writeFileSync(favUrl,JSON.stringify(state.favourite));
    },
    setGenreCat(state,payload){
      state.genreCategory = payload;
    },
    setGenreBack(state,payload){
      state.genreBack = payload;
    },
    loadPlaylist(state,payload){
        state.playlist = payload;
    },
    nowPlaying(state,payload){
        state.now = payload;
    },
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
    prevTrack(state,payload){},
    fetchLyrics(state , payload){
      ipcRenderer.send("fetchLyrics",payload);
      // console.log(payload)
    },
    updateCurrentEq(state,payload){
        state.currentEq = payload,
        writeFileSync(url,JSON.stringify(db));
    },
    updateCurrentRoom(state,payload){
      state.currentRoom = payload,
        writeFileSync(url,JSON.stringify(db));
    },
    updateCurrentBass(state,payload){
      state.cBass = payload,
        writeFileSync(url,JSON.stringify(db));
    },
    updateCurrentTreble(state,payload){
      state.cTreble = payload,
        writeFileSync(url,JSON.stringify(db));
    },
    changeFeedBack(state,payload){
        state.feedback[payload[0]].gain.value = payload[1];
    },
    changeDelays(state,payload){
        state.delays[payload[0]].delayTime.value = payload[1];
    },
    updateBands(state,payload){
      state.bands[payload[0]].gain.value = payload[1];
    },
    updateTrebleQ(state,payload){
        state.Qbass = payload,
        writeFileSync(url,JSON.stringify(db));
    },
    updateBassQ(state, payload){
      state.QTreb = payload,
        writeFileSync(url,JSON.stringify(db));
    },
    tuneBass(state,payload){
      state.bass.gain.value = payload;
      state.bbass = payload,
        writeFileSync(url,JSON.stringify(db));
    },
    tuneTreble(state,payload){
      console.log(payload);
      state.treble.gain.value = payload;
      state.btreble = payload,
      writeFileSync(settings,JSON.stringify(db));
    },
    incrementCount(state,payload){
      state.counter = payload;
      // console.log(payload)
  },

  playSong(state,payload){
    state.player.src = payload;
  },
  musicData(state,payload){
    state.muData = payload;
  },
  playStream(state,payload){
      state.player.src = payload;
      state.player.crossOrigin = "anonymous";
      state.player.play();
  },
  decreaseCount(state,payload){
    state.reduceCount = payload;
}
  },
  getters:{
    getVolume : (state) => state.volume,
    getPlaylist:(state) => state.playlist,
    getPlayer: (state) => state.player,
    getDefaultCover:(state) => state.defaultCover,
    getBands: (state) => state.bands,
    getFeedback :(state) => state.feedback,
    getDelays: (state) => state.delays,
    getEqualiser:(state) => state.equalizer,
    getCurrentBass :(state) => state.bass,
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
  }
})
