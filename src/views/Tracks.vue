<template lang="html">
    <section>      
        <layout :grid="false" :list="true" :subtitle="sub" :songs="load" :artWork="cover" :loader="`All songs`" :title="title" />
</section>
</template>
<script>
import { ipcRenderer } from "electron";
import Layout from "./widgets/Layout.vue";
import { readFileSync } from "fs";
import { remote } from "electron";
import TopWidget from "./widgets/ToWidget.vue";
export default {
    name:'Tracks',
    data() {
    return {
      url:'',
      image:'',
      title:"All Tracks",
      sub:'',
      load:[],
      audio:new Audio(),
      cover:''
    }
  },
  components:{ Layout , TopWidget },
  methods:{
      qPlay(song){
       this.audio.src = song;
       this.audio.play();
      },

  },
  computed: {
    player(){
      return this.$store.getters.getPlayer;
    }
  },
  mounted(){
      // ipcRenderer.on('processed',(e,args)=>{
        
        var songs  = JSON.parse(readFileSync(`${remote.app.getPath("userData")}/processed.json`));
        this.load = songs;

        console.log(songs);
       this.image = this.load[Math.floor(Math.random() * (this.load.length -1))].artwork;

       this.sub = `${this.load.length} songs`;
       this.cover = `file://${songs[0].artwork}`;
      // })
       
  },
  
}
</script>

<style lang="scss" scoped>
    

</style>