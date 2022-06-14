<template lang="html">
    <section>
        <layout :grid="false" :list="true" :subtitle="sub" :songs="load" :artWork="cover" :title="title" />

</section>
</template>
<script>
import { remote } from "electron";
import { readFileSync } from "fs";
import Layout from "./widgets/Layout.vue";

export default {
    name:'Tracks',
    components:{ Layout },
    data() {
    return {
      url:'',
      title:"All Tracks",
      sub:'',
      load:[],
      audio:new Audio(),
      cover:''
    }
  },
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
       let raw = JSON.parse(`${readFileSync(remote.app.getPath('userData')+'/processed.json')}`);
       this.load = raw;
       this.sub = `${raw.length} songs`
       this.cover = `file://${raw[0].artwork}`;
  },
  
}
</script>
<style lang="scss" scoped>
    
</style>