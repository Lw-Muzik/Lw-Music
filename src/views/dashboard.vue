<template lang="html">
    <titlebar class="titlebar"/>
  <div class="app flex flex-col justify-center fixed h-full" v-if="!player">
      <div class="flex h-full flex-row row-span-3" v-show="visual">
        <!-- sidebar -->
          <side-bar  class="h-full"/>
        <!-- Middle grid -->
        <div class="h-screen">
            <div class="middle">
              <br>
                <div class= 'w-screen router-view'>
                  <router-view/>
              </div>
            </div>
          </div>

  </div>
  <!-- visualisers -->
  <Visuals v-show="!visual" />
  <Lyrics
       @closeL="closeLyrics"
        :class="[showLyrics?'active':'','lyrics']" :content=" lyricsSong"/>
  
   <!-- bottom widget -->
   <div v-show="volWidget" class="vol fixed bottom-80 right-3 bg-yellow-500 w-60">
      <div class="p-3 m-3 flex flex-row justify-between items-center">
        <input class="w-full"  type="range" step="0.01" max="1" min="0" @input="updateVol(vol)" v-model="vol"/>
        <b class="label  flex flex-row justify-between items-center" >{{Math.floor(vol * 100)}}%</b>
      </div>
   </div>

   <BottomSheet
          :class="[showNext ? 'active' :'', 'bottom']"
          :playlist="nextTrack"
          @closeB="closeB"
          />

   <!-- end of volume widget -->

       <div class="btW flex flex-col justify-center absolute z-10 bottom-0">
         <mini-player 
          @toggleVol="toggleVolume"
           @lyrics="launchLyrics" 
           @showVisual="showVisual"
           @onClick="showPlayer" />
      </div>
  </div>
  <player v-if="player" />

</template>
<script>
import Titlebar from "../components/TitleBar/Titlebar.vue";
import SideBar from "../components/SideBar/SideBar.vue";
import Top from "./widgets/Top.vue";
import Lyrics from "@/components/Lyrics/Lyrics.vue";
import BottomSheet from "@/components/model/BottomSheet.vue";
import * as mi from "material-icons";
import MiniPlayer from "../player/MiniPlayer.vue";
import { ipcRenderer } from "electron";
import Visuals from "./Visuals.vue";
import Player from "./player.vue";
export default {
  name:"Dashboard",
  data() {
    return {
      load:[],
      showNext:false,nextTrack:{title:"",artist:"",image:""},
      vol:this.$store.getters.getVolume,
      volWidget:false,lyrics:'',showLyrics:false,
    }
  },
    computed: {
      visual(){
        return this.$store.getters.getVisual;
      },
      player(){
        return this.$store.getters.getPlayer;
      },
     lyricsSong(){
      return this.$store.getters.getLyrics;
     },
     trackId(){
      return this.$store.getters.getSongId;
     },
      showSidenav(){
        return this.$store.getters.showSidenav;
      },
      player(){
        return this.$store.getters.getMPlayer
      }
    },
  components:{ Titlebar, SideBar,Player, Top, MiniPlayer, Lyrics, BottomSheet, Visuals },
  methods:{ 
    showTrack(){
        let raw = this.$store.getters.getPlaylist;
        this.load = raw;
    },
    showVisual(){
        this.$store.commit("setVisual",!true);
    },
    showRoom(){},
    showPlayer(){
        this.$store.commit("setPlayer",true);
    },
    closeLyrics(){
    this.showLyrics = !this.showLyrics;
  },
  closeB(){this.showNext = false; },
    launchLyrics(){
      this.showLyrics = !this.showLyrics;
      console.log("lyrics..............")
    },
    toggleVolume(){
        this.volWidget = !this.volWidget;
    },
    updateVol(val){
      console.log(val)
      this.$store.commit("setVolume",this.vol);
    },
    mounted() {
      console.log(`Player show ${this.player}`);
      ipcRenderer.on('lyrics',(e,args)=>{
        this.lyrics = args;
      })
      var id = this.$store.getters.getNowPlaying;
          this.nextTrack.artist = id.artist;
          this.nextTrack.title = id.title;
          this.nextTrack.image = id.image;
          this.player.ontimeupdate = ()=>{
       /**Logic for next track */
     const monitor = Math.floor((this.player.duration) -this.player.currentTime);
            if(monitor == 60){
              this.showNext = true;
            //    const notify = new Notification(this.title,{body:this.artist,icon:this.playlist[this.trackId]});
            } else if(monitor == 30){
               this.showNext = false;
            }else if(monitor < 30 || monitor > 60){
               this.showNext = false;
            }
          }
      this.vol = this.$store.getters.getVolume;
    },
  }
}
</script>
<style lang="scss" scoped>
.vol{
  transform:rotate(-90deg);
  border-radius:10px;
    background:#232323!important;
  box-shadow:inset -2px 0px 2px 0px #ddd;
  bottom:200px;
  &::before{
    width:20px;
    height:20px;
    transform:rotate(45deg);
    margin-left: -10px;
  box-shadow:inset 0px 0px 0.2px 0px #4444;

       background:#232323!important;
  margin-top: 24px;
    content:'';
    position: absolute;
    background: #fff;
  }
}

.lyrics{
         width: fit-content;
         height: max-content;
         z-index: 30!important;
         right:-400px;
         visibility: hidden;
         top:20%!important;
         transition: 0.3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
         position:absolute!important;
       }
        .lyrics.active{
          animation: 2s 2s linear forwards;
         visibility: visible;
          right:290px!important;
        }
.label{
  transform:rotate(90deg);
}
input[type="range"]{
  outline:none;
  appearance:none;
  height:2px;
 &::-webkit-slider-thumb{
  width: 30px;
  height:30px;
  border-radius:50%;
 }
}

.titlebar{
  position:fixed;
  top: 0;
    width:100%;
  }
  .app{
    overflow: hidden;
    // height: 1000px;
  }
  .btW{
    width: 100%;
    height:5.5rem;
    border-radius:10px;
    color: #fff;
  }
  .router-view{
    overflow: hidden;
    // overflow-y: scroll;
    height: calc(100vh - 20px)!important;
    // background-color: #fff;
    // height: 200vh !important;
    transition:0.3s ease-in-out;
    &.active{ 
       width:120vh;
    }
  }
  .rightSide{ 
        &::-webkit-scrollbar{
      appearance: none;
      width: 10px;
    }
    
      &::-webkit-scrollbar-thumb{
      appearance: none;
      width: 5px;
      background: #706e65;
      border-radius: 10px;
    }
     overflow-x: hidden;
    overflow-y: scroll;
    width:0%;
     background: #1401250e;
    // background:#222;
  }
  .middle{
    align-items: center;
     background: #00000071;
     backdrop-filter: blur(80px);
     overflow:hidden;
    height: calc(140vh - 180px);
  }
  .bottom{
          width: 500px;
           position: absolute;
           bottom:100px;
           z-index: 30!important;
           right: 10px;
           visibility: hidden;
           opacity: 0;
           transition: 0.3s cubic-bezier(0.045, 0.05, 0.55, 0.95);
     }
     .bottom.active{
        right: 500px;
         visibility: visible;
           opacity: 1;
     }
</style>