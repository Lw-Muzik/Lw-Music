<template lang="html">
    <section>      
        <layout :grid="false" :list="true" :subtitle="sub" :songs="load" :artWork="cover" :loader="`All songs`" :title="title" />
</section>
</template>
<script>
import { ipcRenderer } from "electron";
import Layout from "./widgets/Layout.vue";
import { readFileSync, existsSync } from "fs";
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
      // audio:new Audio(),
      cover:''
    }
  },
  components:{ Layout , TopWidget },
  methods:{
      getCover(){

      }

  },
  computed: {
    player(){
      return this.$store.getters.getPlayer;
    }
  },
  mounted(){
      // ipcRenderer.on('processed',(e,args)=>{
        
        var songs  = JSON.parse(readFileSync(`${remote.app.getPath("userData")}/processed.json`));
        songs.forEach(async (value,index)=>{
            this.load = [...this.load,{data:value,hasCover:existsSync(value.artwork)}];
        });

       this.image = this.load[Math.floor(Math.random() * (this.load.length -1))].artwork;

       this.sub = `${this.load.length} songs`;
       this.cover = `file://${songs[0].artwork}`;
      // })
       
  },
  
}
</script>

<style lang="scss" scoped>
    

</style>