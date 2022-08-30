<template lang="html">
    <div class="listView lg:w-4/5">
       <p @click="playSong(list,index)"  v-bind:key="index" v-for="(list,index) in queueList">
             <!-- <b class="material-icons mi-dehaze"></b> -->
            <div class="w-35 flex flex-row row-span-2 justify-center items-center">
               <b class="w-10" >{{index+1}}</b> 
              &nbsp; &nbsp;
              &nbsp;
               <img  :src="`file://${list.artwork}`" class="cover"/> 
              </div>
              &nbsp; &nbsp;
              &nbsp; &nbsp;
            <span>{{list.title}}</span>
            &nbsp; &nbsp;
            <span >{{list.genre}}</span> 
             &nbsp;
            <span>{{list.artist}}</span>
          &nbsp;
               <span>{{list.album}}</span>
          </p>
      </div>
          <!-- <button @click="this.$emit('closeQueue')"><b class="material-icons mi-close"></b></button> -->
</template>
<script>
import Mviso from "@/components/widget/mviso.vue";
import{ image } from "../../Core/default";
export default {
    name:"ListView",
    props:{
        queueList:Array,
    },
    components:{
      Mviso
    },
    data() {
      return {
        image:image,
        audio:null,
        j:0
      }
    },
    computed:{
    
    },
      created(){
         this.audio = this.$store.getters.getPlayer;
            // this.$store.commit("fetchLyrics",[track.title,track.artist,track.trackPath]);

         this.audio.onended = ()=>{
        this.j += 1;
        this.$store.commit("setSongId",this.j);
        this.$store.commit("fetchLyrics",[this.queueList[this.j].title,this.queueList[this.j].artist,this.queueList[this.j].trackPath]);
        
         this.audio.src = this.queueList[this.j].data;
         this.$store.commit("saveRecentPlays",this.queueList[this.j]);
         this.nativeExecute(this.queueList[this.j]);
         this.$store.commit('currentProcess',[this.queueList[this.j],this.j]);
            this.$store.commit('musicData',this.queueList[this.j]);
            this.audio.play();
      }
    },
    mounted() {
      this.j = this.$store.getters.getSongId;
    },
    methods:{
      
       nativeExecute(id3){
          var img =  `file://${id3.artwork}`;
          document.body.style.backgroundImage = `url('${img}')`;

         const link = document.querySelector("link");
        link.href.replace(img,"");
        link.href = img;
      
            const notify = new Notification(id3.title,{body:id3.artist,icon:img,silent:true,requireInteraction:true,tag:"music"});
            notify.onclick = ()=>{
                notify.close();
            }
            
        navigator.mediaSession.setActionHandler("nexttrack", () => {
              this.j += 1;

            this.audio.src = this.queueList[this.j].data;
            this.nativeExecute(this.queueList[this.j]);
            this.$store.commit('currentProcess',[this.queueList[this.j],this.j]);
            this.$store.commit('musicData',this.queueList[this.j]);
            this.audio.play();
        });
        navigator.mediaSession.setActionHandler("previoustrack", () => {
              this.j -= 1;
          this.audio.src = this.queueList[this.j].data;
          this.nativeExecute(this.queueList[this.j]);
          this.$store.commit('currentProcess',[this.queueList[this.j],this.j]);
            this.$store.commit('musicData',this.queueList[this.j]);
            this.audio.play();
        });
      
        navigator.mediaSession.setActionHandler("play", () => {
            this.player.play();
        });
        navigator.mediaSession.setActionHandler("pause", () => {
            this.player.pause();
        });
        navigator.mediaSession.setActionHandler("stop", () => {
            this.player.pause();
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
            notify.onclose = ()=>{  }
        },
        playSong(track,id){
          this.j = id;
            this.audio.src = track.data;
            this.audio.play();
            this.$store.commit("setSongId",id);
            this.$store.commit("saveRecentPlays",track)
            this.$store.commit('currentProcess',[this.queueList,id]);
            this.$store.commit("fetchLyrics",[track.title,track.artist,track.trackPath]);
            this.$store.commit('musicData',track);
            this.nativeExecute(track);
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
     &:hover{
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