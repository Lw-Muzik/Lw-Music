<template lang="html">
    <div>
       <grid :items="genre" @routeTo="routeT" :loader="`Albums`" v-show="!getBack"/>
    </div>
</template>
<script>
import { readFileSync } from 'fs';
import { remote } from "electron";
import Grid from "./widgets/Gen/Grid.vue";
export default {
    name:'Album',
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
            this.$router.push('/albumTracks');
            // console.log("done")
        },
        getTotal(genre){
            const result = this.unsorted.filter((d) => (d == genre));
            return result.length;
        },
        getCoverArt(album){
            const result = this.processed.filter((d) => (d.album == album));
           return result[(result.length -1)].artwork;
        }
    },
     computed: {
        getBack(){
            return this.$store.getters.getGenreBack;
        }
    },
   mounted(){
        let raw = JSON.parse(`${readFileSync(remote.app.getPath('userData')+'/processed.json')}`);
          this.processed = raw;
        raw.forEach((data) =>{
            this.unsorted = [...this.unsorted , data.album];
        });
       const sorted = new Set(this.unsorted);
       sorted.forEach((g) => {
           this.genre = [...this.genre, {genre:g,total:this.getTotal(g),cover:this.getCoverArt(g)}];
       });
   }
}
</script>
<style lang="">
    
</style>