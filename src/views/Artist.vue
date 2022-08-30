<template lang="html">
    <div class="overflow-scroll">
       <grid :items="genre" @routeTo="routeT" :loader="`Artists`" v-show="!getBack"/>
        
    </div>
</template>
<script>

import { ipcRenderer } from "electron";
import Grid from "./widgets/Gen/Grid.vue";
export default {
    name:'Artist',
     components:{ Grid },
    data() {
        return {
            showRoute:false,
            genre:[],
            unsorted:[],
            processed:[]
        }
    },
     methods: {
        routeT(){
            this.showRoute = !this.showRoute;
            this.$store.commit('setGenreBack',true);
            this.$router.push('/artistTracks');
            // console.log("done")
        },
           getCoverArt(artist){
            const result = this.processed.filter((d) => (d.artist == artist));
           return result[(result.length -1)].artwork;
        },
        getTotal(genre){
            const result = this.unsorted.filter((d) => (d == genre));
            return result.length;
        }
    },
     computed: {
        getBack(){
            return this.$store.getters.getGenreBack;
        }
    },
   mounted(){
      ipcRenderer.on("loaded",(e,rags)=>{
        this.processed = rags;
       rags.forEach((data) =>{
            this.unsorted = [...this.unsorted , data.artist];
        });
       const sorted = new Set(this.unsorted);
       sorted.forEach((g) => {
         this.genre = [...this.genre, {genre:g,total:this.getTotal(g),cover:this.getCoverArt(g)}]
       });
      })
     
   }
}
</script>
<style lang="scss" scoped>
    
</style>