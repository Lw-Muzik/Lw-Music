<template lang="html">
    <div>
        <grid :items="genre" @routeTo="routeT" v-show="!getBack"/>
        <router-view v-show="getBack"/>
    </div>
</template>
<script>
import { readFileSync } from 'fs';
import { remote } from "electron";
import Grid from "./widgets/Gen/Grid.vue";

export default {
    name:'Genre',
    components:{ Grid },
    data() {
        return {
            showRoute:false,
            genre:[],
            unsorted:[],
            processed:[],
            covers:[]
        }
    },
   
    methods: {
        routeT(){
            this.showRoute = !this.showRoute;
            this.$store.commit('setGenreBack',true);
            this.$router.push('/genre/genres');
            // console.log("done")
        },
        getTotal(genre){
            const result = this.unsorted.filter((d) => (d == genre));
            return result.length;
        },
        getCoverArt(genre){
            const result = this.processed.filter((d) => (d.genre == genre));
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
            this.unsorted = [...this.unsorted , data.genre];
           this.covers = [...this.covers, data.artwork];
        });
       const sorted = new Set(this.unsorted);
       sorted.forEach((g) => {
           this.genre = [...this.genre, {genre:g,total:this.getTotal(g),cover:this.getCoverArt(g)}]
       });
   }
}
</script>
<style lang="scss" scoped>
</style>