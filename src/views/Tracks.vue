<template lang="html">
    <section>

       <!-- <top-widget :label="`All Songs`" :total="load.length" :cover="image"/>
        <layout :grid="false" :list="true" :songs="load"/> -->

        <layout :grid="false" :list="true" :subtitle="sub" :songs="load" :artWork="cover" :title="title" />


</section>
</template>
<script>
import { remote } from "electron";
import { readFileSync } from "fs";
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
       let raw = JSON.parse(`${readFileSync(remote.app.getPath('userData')+'/processed.json')}`);
       this.load = raw;
       this.image = raw[Math.floor(Math.random() * (raw.length -1))].artwork;

       this.sub = `${raw.length} songs`;
       this.cover = `file://${raw[0].artwork}`;
  },
  
}
</script>

<style lang="scss" scoped>
    

</style>