<template lang="html">
    <section>
        <layout :grid="false" :list="true" :songs="load"/>

</section>
</template>
<script>
import { remote } from "electron";
import { readFileSync } from "fs";
import Layout from "./widgets/Layout.vue";
export default {
    name:'Tracks',
    components:{ Layout},
    data() {
    return {
      url:'',
      load:[],
      audio:new Audio(),
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
  },
  
}
</script>
<style lang="scss" scoped>
    
</style>