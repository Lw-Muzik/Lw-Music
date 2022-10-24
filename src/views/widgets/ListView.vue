<template lang="html">
    <div ref="listV" class="listView lg:w-4/5">
       <p @click="playSong(list,index)" v-bind:key="index" v-for="(list,index) in queueList" :class="[index == activeTile?'active':'','']" >
             <!-- <b class="material-icons mi-dehaze"></b> -->
            <div class="w-35 flex flex-row row-span-2 justify-center items-center">
               <b class="w-10" >{{index+1}}</b> 
              &nbsp; &nbsp;
              &nbsp;
               <img v-if="list.hasCover" :src="`file://${list.data.artwork}`" class="cover"/> 
               <img v-else :src="[image]" class="cover"/> 
              </div>
              &nbsp; &nbsp;
              &nbsp; &nbsp;
            <span>{{list.data.title}}</span>
            &nbsp; &nbsp;
            <span >{{list.data.genre}}</span> 
             &nbsp;
            <span>{{list.data.artist}}</span>
          &nbsp;
               <span>{{list.data.album}}</span>
          </p>
      </div>
          <!-- <button @click="this.$emit('closeQueue')"><b class="material-icons mi-close"></b></button> -->
</template>
<script>
// import { Visualizer } from "@/Core/Visualizer";
import image from "@/assets/pAudio.png";
import { remote } from 'electron';
// import{ image } from "../../Core/default";
export default {
    name:"ListView",
    props:{
        queueList:Array,
    },
    components:{
      // Mviso
    },
    data() {
      return {
        image:image,
        audio:null,
        activeTile:parseInt(localStorage.getItem("indexTile")),
        j:0
      }
    },
    computed:{  },
      created(){
         this.audio = this.$store.getters.getPlayer;
            // this.$store.commit("fetchLyrics",[track.title,track.artist,track.trackPath]);
      this.$store.commit("setSongData",this.queueList);

         this.audio.onended = ()=>{
        this.j += 1;
        this.audio.src = this.queueList[this.j].data.data;
         this.nativeChannel(this.j);
            this.audio.play();
      }
    },
    mounted() {
      this.$store.commit("setSongData",this.queueList);
      this.j = this.$store.getters.getSongId;
      this.$refs['listV'].scrollTo({behavior:"smooth",top:1});
      // checking if the initial index is set
      if (localStorage.getItem("indexTile") == null) {
          localStorage.setItem("indexTile",0);
      }
    },
    methods:{
      
       nativeExecute(id3){
          var img =  `file://${id3.artwork}`;
          document.body.style.backgroundImage = `url('${img}')`;
          document.body.style.backgroundRepeat = `no-repeat`;
          document.body.style.backgroundSize = `cover`;
          document.body.style.backgroundPosition = `center`;

         const link = document.querySelector("link");
        link.href.replace(img,"");
        link.href = img;
      
            const notify = new Notification(id3.title,{body:id3.artist,icon:img,silent:true,requireInteraction:true,tag:"music"});
            notify.onclick = ()=>{
                remote.getCurrentWindow().focus();
            }
            
        navigator.mediaSession.setActionHandler("nexttrack", () => {
              this.j += 1;
            //  this.$refs['listV'].scrollTo({behavior:"smooth",top:this.j});

            this.audio.src = this.queueList[this.j].data.data;
            this.nativeChannel(this.j);
            this.audio.play();
        });
        navigator.mediaSession.setActionHandler("previoustrack", () => {
              this.j -= 1;
          this.audio.src = this.queueList[this.j].data.data;
          this.nativeChannel(this.j);
            this.audio.play();
        });
      
        navigator.mediaSession.setActionHandler("play", () => {
            this.audio.play();
        });
        navigator.mediaSession.setActionHandler("pause", () => {
            this.audio.pause();
        });
        navigator.mediaSession.setActionHandler("stop", () => {
            this.audio.pause();
        });

      // navaigator.
         navigator.mediaSession.metadata = new MediaMetadata({
            title: id3.title,
            artist: id3.artist,
            album: id3.album,
            artwork: [
                { src: img, sizes: "512x512" , type: "image/jpeg" },
                { src: img, sizes: "256x256" , type: "image/jpeg" },
                { src: img, sizes: "128x128" , type: "image/jpeg" },
                { src: img, sizes: "64x64" , type: "image/jpeg" },
                { src: img, sizes: "32x32" , type: "image/jpeg" },
                { src: img, sizes: "16x16" , type: "image/jpeg" },
            ]
        });
        },
        nativeChannel(id){
          // update the active tile
          this.activeTile = id;

          // saving the current tile state
          localStorage.setItem("indexTile",id);

          // loading audio file
          this.nativeExecute(this.queueList[id].data);
          this.$store.commit('currentProcess',[this.queueList[id],id]);
            this.$store.commit('musicData',this.queueList[id]);
            this.$store.commit("setSongId",id);
            // auto scrolling
          // this.$refs['listV'].scrollTo({behavior:"smooth",top:id});
          // obtaining lyrics
          this.$store.commit("fetchLyrics",[this.queueList[id].title,this.queueList[id].artist,this.queueList[id].trackPath]);
          // sving recent plays
          this.$store.commit("saveRecentPlays",this.queueList[id]);
        },
        playSong(track,id){
          console.log(track);
          this.activeTile = id;
          localStorage.setItem("indexTile",id);
          this.j = id;
          // this.$refs['listV'].scrollTo({behavior:"smooth",top:id});
            this.audio.src = `${track.data.data}`
            this.audio.play();
            this.$store.commit("setSongId",id);
            this.$store.commit("saveRecentPlays",track.data.data)
            this.$store.commit('currentProcess',[this.queueList,id]);
            this.$store.commit("fetchLyrics",[track.data.title,track.data.artist,track.data.trackPath]);
            this.$store.commit('musicData',track.data);
            this.nativeExecute(track.data);
        },
       
    },
   }
</script>
<style lang="scss" scoped>
     .listView{
       overflow-y:scroll; 
       overflow-x: hidden;
        height: 600px;
        
       &::-webkit-scrollbar{
      appearance: none;
      width: 10px;
    }
    
      &::-webkit-scrollbar-thumb{
      appearance: none;
      width: 5px;
      background: #c7c5be;
      border-radius: 10px;
    }
     }
     p{
        .cover{
     width:60px;
     height: 60px;
     border-radius:10px;
     padding:3px;
    //  box-shadow: -1px 0px 0px 0px #eee
   }
      width:100%;
      line-height: -20px;
      color: #eeeeee;
      background:rgba($color: #948E8E, $alpha:0);
      padding: 3px;
      border-radius:5px;
      padding: 4px;
      border-radius:0px;
      display: flex;
      cursor: pointer;
      margin:5px;
      flex-direction:row;
      transition:0.3s ease-in-out;
      transform:scale(1,1);
      justify-content: space-around!important;
      align-items: center;
     &.active{
       box-shadow: -4px 0px 0px 0px #eeee,
                   4px 0px 0px 0px #eeee;
                          // transform:scale(1.01,1.01);
        background:rgba($color: #CABCBC, $alpha:0.25);
        background:rgba($color: #CABCBC, $alpha:0.2);
     }
     span{
        width: 300px;
        text-align: left;
        font:400 14px Ubuntu,Arial;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    @media(max-width: 960px){
        p{
           .cover{
     width:40px;
     height: 40px;
     border-radius:10px;
     box-shadow: -3px -2px 1px 0px #eee;
   }
      width:100%;
      line-height: -20px;
      // box-shadow: -4px -0px 0px 0px #eeee;
      background:rgba($color: #000000, $alpha:0);
      padding: 4px;
      border-radius:5px;
      display: flex;
      cursor: pointer;
      margin:5px;
      flex-direction:row;
      transition:0.3s ease-in-out;
      transform:scale(1,1);
      justify-content: space-around!important;
      align-items: center;
     &:hover{
                          // transform:scale(1.01,1.01);
        background:rgba($color: #cabcbc31, $alpha:0.3);
     }
     span{
        width: 300px;
        text-align: left;
        font:300 14px Ubuntu,Arial;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    }
</style>