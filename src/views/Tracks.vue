<template lang="html">
    <section>      
        <layout :grid="false" :list="true" :subtitle="sub" :songs="load" :artWork="cover" :loader="`All songs`" :title="title" />
</section>
</template>
<script>
import { ipcRenderer } from "electron";
import Layout from "./widgets/Layout.vue";

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
      ipcRenderer.on('loaded',(e,args)=>{
        this.load = args;
       this.image = args[Math.floor(Math.random() * (args.length -1))].artwork;

       this.sub = `${args.length} songs`;
       this.cover = `file://${args[0].artwork}`;
      })
       
  },
  
}
</script>

<style lang="scss" scoped>
    

</style>