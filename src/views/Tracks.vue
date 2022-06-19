<template lang="html">
    <section>
       <top-widget :label="`All Songs`" :total="load.length" :cover="image"/>
        <layout :grid="false" :list="true" :songs="load"/>

</section>
</template>
<script>
import { remote } from "electron";
import { readFileSync } from "fs";
import Layout from "./widgets/Layout.vue";
import TopWidget from "./widgets/ToWidget.vue";
export default {
    name:'Tracks',
    components:{ Layout , TopWidget },
    data() {
    return {
      url:'',
      image:'',
      load:[],
      audio:new Audio(),
      streams:[
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(70).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp",
        "https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(76).webp",

      ],

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
       this.image = raw[Math.floor(Math.random() * (raw.length -1))].artwork;
  },
  
}
</script>
<style lang="scss">

</style>