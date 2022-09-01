<template>
  <div class="home flt">
  <div :class="[ptr1?'active':'','part1']">
         <Cover
         v-if="!queueView"
          v-show="showCover"
          :source="`${track.artwork}`"
          :playing="checker"
          />

         <Volume
         :class="[showV?'active':'','volume']"
          @closeVol="closeVol"
          
     />
       <Queue
       :class="[listView?'active':'','listView']"
        @closeQueue="closeLQueue"
        @queuePlay="playL"
        :queueList="playlist"/>

         <GridView 
          :class="[queueView?'active':'','gView']"
            :listTrack="playlist"
            @gridPlay="playQueue"
            @closeQueue="closeQueue"
            />
  
  </div>

      <Room
      :class="[roomView?'active':'','room']"
        
        :delays="delayArr"
        :feedback="feedBackArr"
        @closeRoom="closeRoom"
       />


     <div :class="[ptr2?'active':'','prt2']">

       <div  class="b">
      
         <button v-show="!showEQ" @click="viewLib">Library</button>
         <button v-show="!showEQ" @click="viewOpt">View</button>
         <button v-show="!showEQ" @click="loadLyrics">Lyrics</button>
       </div>
       <div :class="[showOpt?'active':'','options']">
         <p @click="listShow">ListView</p>
         <p @click="gridShow">GirdView</p>
       </div>
        <Details 
        v-show="showCover"
          :title="track.title"
          :artist="track.artist"
          :album="track.album"
          :size="track.size"
        />
        <Slider
            v-show="showCover"
            @updateChange="updateSlider"
            :max="progMax"
            :currentValue="curlTime"
            :output="progress"
            :duration="durlTime"
        />




      <Control
          v-show="showCover"
          @playtrack="playTrack" 
          @pausetrack="pauseNow"
          @looptrack="repeatTrack"
          @seektrack="seekNow"
          @shuffleTrack="shuffleTracks"
          @prevTrack="prevSeek"
          :phide="showPlay"
          :pshow="showPause"
          :togglebtn="btnValue"
          />
       </div>
     
        <BottomSheet
          :class="[showNext?'active':'','bottom']"
          :playlist="nextTrack"
          @closeB="closeB"
          />
           <Lyrics
       @closeL="closeLyrics"
        :class="[showLyrics?'active':'','lyrics']" :content="lyrics"/>
  </div>
      

 
 
</template>
<script>
import Slider from '@/components/Slider.vue'; // @ is an alias to /src
import Cover from '@/components/ImageWidget/Cover.vue'; // @ is an alias to /src
import Details from "@/components/Details/Details.vue";
import Control from "@/components/ControlWidget/Control.vue";
import Loader from "@/components/loader/Loader.vue";
import Volume from "@/components/VolumeControl/Volume.vue";

import Queue from "@/components/Queue/Queue.vue"

import Room from "@/components/Room/Room.vue";
import * as mm from  "music-metadata-browser";
import Lyrics from "@/components/Lyrics/Lyrics.vue";
import GridView from "@/components/Queue/Grid.vue";
import BottomSheet from "@/components/model/BottomSheet.vue";

import { image } from "@/Core/default";
export default {
  name: 'Player',
  data(){
    return {
       displayVisual:false, bufferArray:[],current:[],playlist:[],
       delayArr:[],feedBackArr:[], title:"",artist:"",album:"", nPlay:{title:"title", artist:"",album:"",artwork:image},
       nextTrack:{title:"",artist:"",image:image }, showEQ:false,showCover:true, showLyrics:false,
       listView:false, ptr1:true,ptr2:true, showNext:false,
       image:image,size:0, curlTime:0,roomView:false,progress:0,
       progMax:1, trackData:File, durlTime:"",showPlay:false,showPause:true,
       showOpt:false, btnValue:"EQ",queueView:false,showV:false,vol:0,visual:true,
       loop:false,stopAnime:0,countPlay:0, eqBands:[],
      context:null,showLib:false, visualize:null, shuffle:false, checker:true,
      selected:0,frameResize:false, vise:null, lyrics:'', audioSrc:''
    }
  
  },
 
  components: {
    Slider, Loader, Lyrics,Cover,Details,BottomSheet,GridView,
    Control,Lyrics, Volume,Queue,Room,
  },
  methods: {

    viewOpt(){this.showOpt = true;},

    viewLib(){this.$store.commit("setPlayer",false);},

    resize(){this.frameResize = !this.frameResize;},

  toggleVisualWidget(){
      this.displayVisual = ! this.displayVisual;
  },
  closeB(){this.showNext = false; },
  loadLyrics(){
    this.$store.commit('fetchLyrics',[this.title,this.artist]);
    this.lyrics = "";
    this.showLyrics = !this.showLyrics;
  },
  closeLyrics(){
    this.showLyrics = !this.showLyrics;
  },
    roomEffectsComponent(){
        // this.ptr1 = !this.ptr1;
        // this.ptr2 = !this.ptr2;
        this.roomView = !this.roomView;
    },
    closeRoom(){
      this.roomEffectsComponent();
    },
 
    closeEQ(){
      this.showEQ = !this.showEQ;
       this.showCover = !this.showCover;
    },
    playTrack(){
         this.showPlay = !this.showPlay;
         this.showPause = !this.showPause;
         this.audio.play();
    },
    pauseNow(){
     this.showPlay = !this.showPlay;
     this.showPause = !this.showPause;
      this.audio.pause();
    },
    playL(){},
    shuffleTracks(){
         this.shuffle = !this.shuffle;
    },
    changeVol(vol){
        this.audio.volume = vol;
        // this.vol = vol;
    },
    closeVol(){
      this.showV = !this.showV;
    },
    showVol(){
      this.showV = !this.showV;
    },
   
    seekNow(){
       this.countPlay += 1;
     
    },
    prevSeek(){
         this.countPlay -= 1;
     
    },
    repeatTrack(){
      this.loop = !this.loop;
       // toggle audio repeat 
      this.audio.loop = this.loop == true ? true : false;
    },
    updateSlider(value){
         this.audio.currentTime = value;
    },
    toggleEQ(){
      this.showEQ = !this.showEQ;
      this.showCover = !this.showCover;
    },
  
    listShow(){
      this.showOpt = false;
        this.listView = !this.listView;
    },
    gridShow(){
      this.showOpt = false;
      this.showQueue();
    },
    playQueue(queue){
          console.log(queue);// console.log(this.getTitle(queue[0].data));
      },
   
    showQueue(){
      this.ptr2 = false;
        this.queueView = !this.queueView;
        // this.playlist = 
    },
    closeQueue(){
        this.ptr2 = true;
        this.queueView = !this.queueView;
       },
        closeLQueue(){
        // this.ptr1 = true;
        this.listView = !this.listView;
       },
  },
  computed: {
     audio(){
        return this.$store.getters.getPlayer;
     },
     eq(){
      return this.$store.getters.getEqualiser;
     },
    // playlist(){
    //   return this.$store.getters.getSongData;
    // },
    current(){
           return this.$store.getters.getCurrentData;
       },
       songD(){
           return this.$store.getters.getSongData;
       },
        track(){
            return this.$store.getters.getMusicData;
        },
  },
  mounted(){
// console.log(new MediaStream().getTracks())

    // this.playlist = this.$store.getters.getPlaylist;
    
    // document.querySelector("body").style.backgroundImage = "url("+this.nPlay.artwork+")";
  
    this.audio.volume = this.$store.getters.getVolume;
      this.eqBands = this.eq.getBands();
      this.delayArr = this.eq.getDelayBands();
      this.feedBackArr = this.eq.getFeedBack();

    // console.log(localStorage);
  setInterval(()=>{
           this.progress = this.audio.currentTime;
          this.progMax = this.audio.duration;
        },500);

    this.audio.ontimeupdate = ()=>{
      /**Display the track's current time */
       const min = Math.floor((this.audio.currentTime / 60) % 60)
       const sec = Math.floor(this.audio.currentTime % 60 );
       this.curlTime = sec < 10 ? min+":0"+sec:min+":"+sec;
/**Display the track duration */
       const dmin = Math.floor(((this.audio.duration - this.audio.currentTime) / 60) % 60)
       const dsec = Math.floor((this.audio.duration - this.audio.currentTime) % 60 );
       this.durlTime = dsec < 10 ?dmin+":0"+dsec:dmin+":"+dsec;
    /**Logic for next track */
     const monitor = Math.floor((this.audio.duration) -this.audio.currentTime);
            if(monitor == 60){
              this.showNext = true;
            //    const notify = new Notification(this.title,{body:this.artist,icon:this.playlist[this.trackId]});
            } else if(monitor == 30){
               this.showNext = false;
            }else if(monitor < 30 || monitor > 60){
               this.showNext = false;
            }

    }
  
    this.audio.onpause = ()=>{
      this.checker = false;
    }
 
    this.audio.onended = ()=>{
               this.checker = false;
    this.showLyrics = false;
           if(this.shuffle == true){
            this.countPlay = Math.floor(Math.random() * this.playlist.length);
          
        }else{
           this.countPlay +=1;
         
        }
         
    }

   this.audio.onplaying = ()=>{
     this.checker = true;
          this.showPlay = false;
         this.showPause = true;
    }
  },

  /** <Loader
        v-if="!queueView"
        @showQueue="showQueue"
        v-show="showCover"
        @trackLoader="loadTrack"
        @toggleEQ="toggleEQ"
        @showVol="showVol"
        @loadSingle="loadSingle"
        @showRoom="roomEffectsComponent"
        @showVisual="toggleVisualWidget"
      /> */

}
</script>
 
 <style lang="scss" scoped>
  .flt{
    backdrop-filter: blur(100px)!important;
  }
@import "@/Design/Hot100.scss";
@import "@/Design/player.scss";
 
 </style>