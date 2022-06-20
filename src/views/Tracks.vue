<template lang="html">
    <section>
<<<<<<< HEAD
       <top-widget :label="`All Songs`" :total="load.length" :cover="image"/>
        <layout :grid="false" :list="true" :songs="load"/>
=======
        <layout :grid="false" :list="true" :subtitle="sub" :songs="load" :artWork="cover" :title="title" />
>>>>>>> 3bb5b3ac0081bd8830a5e8dc40d88094ba3fb25c

</section>
</template>
<script>
import { remote } from "electron";
import { readFileSync } from "fs";
import Layout from "./widgets/Layout.vue";
<<<<<<< HEAD
import TopWidget from "./widgets/ToWidget.vue";
export default {
    name:'Tracks',
    components:{ Layout , TopWidget },
    data() {
    return {
      url:'',
      image:'',
=======

export default {
    name:'Tracks',
    components:{ Layout },
    data() {
    return {
      url:'',
      title:"All Tracks",
      sub:'',
>>>>>>> 3bb5b3ac0081bd8830a5e8dc40d88094ba3fb25c
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
<<<<<<< HEAD
       this.image = raw[Math.floor(Math.random() * (raw.length -1))].artwork;
=======
       this.sub = `${raw.length} songs`
       this.cover = `file://${raw[0].artwork}`;
>>>>>>> 3bb5b3ac0081bd8830a5e8dc40d88094ba3fb25c
  },
  
}
</script>
<<<<<<< HEAD
<style lang="scss">

=======
<style lang="scss" scoped>
    
>>>>>>> 3bb5b3ac0081bd8830a5e8dc40d88094ba3fb25c
</style>