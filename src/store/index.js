
import { createStore } from 'vuex'
import { Equalizer } from '../Core/Equalizer';
import { ipcRenderer, remote } from 'electron';
const { image } = require("../Core/default");
import * as id3 from "music-metadata-browser";
import { readFileSync, writeFileSync } from 'fs';
const audio = new Audio();
audio.crossOrigin = "anonymous";
let url = `${remote.app.getPath('userData')}/settings.json`;
const db = JSON.parse(readFileSync(url));
const eq = new Equalizer(audio);
eq.startEq();
audio.volume = db.volume;
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export default createStore({
  state: {
    volume:db.volume,lyrics:'', playlist:[], reduceCount:0,trackPlaying:'',currentData:[],
    player:audio, delays:eq.getDelayBands(), feedback:eq.getFeedBack(),
    bands:eq.getBands(),bass:eq.getBass(),treble:eq.getTreble(),
    equalizer:eq, Id3:id3, counter:0,now:{ title:"title", artist:"", album:"", artwork:image,},
    genreCategory:'',genreBack:false,muData:{},defaultCover:image,
  },
  mutations: {
    setVolume(state,payload){      
      state.player.volume = payload;
      db.volume = payload;
      writeFileSync(url,JSON.stringify(db));
    },
    updatePlaylist(state,payload){
      state.playlist = [...state.playlist,payload]; ipcRenderer.sendSync('saveUserData',payload);
    },

    setGenreCat(state,payload){
      state.genreCategory = payload;
    },
    setGenreBack(state,payload){
      // console.log(payload)
      state.genreBack = payload;
    },
    currentProcess(state,payload){
      state.currentData = payload;
    },
    
    loadPlaylist(state,payload){
        state.playlist = payload;
    },
    nowPlaying(state,payload){
        state.now = payload;
    },
    fetchLyrics(state , payload){
      ipcRenderer.send("fetchLyrics",payload);
      // console.log(payload)
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
    tuneBass(state,payload){
      state.bass.gain.value = payload;
    },
    tuneTreble(state,payload){
      state.treble.gain.value = payload;
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
    getCurrentData:(state) => state.currentData
  }
})
