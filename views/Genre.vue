<template lang="html">
    <div class="m-5 w-3/4">
        <grid :items="genre" @routeTo="routeT" v-show="!getBack" :loader="`Genres`"/>
    </div>
</template>
<script>
import { readFileSync,existsSync } from 'fs';
import { ipcRenderer } from "electron";
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
            // this.$store.commit('setGenreBack',true);
            this.$router.push('/genres');
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
    ipcRenderer.on('processed',(event, args) => {
         let raw = JSON.parse(`${readFileSync(args)}`);
        this.processed = raw;
        raw.forEach((data) =>{
            this.unsorted = [...this.unsorted , data.genre];
           this.covers = [...this.covers, data.artwork];
        });
       const sorted = new Set(this.unsorted);
       sorted.forEach((g) => {
           this.genre = [...this.genre, {genre:g,total:this.getTotal(g),cover:this.getCoverArt(g),hasCover: existsSync(this.getCoverArt(g))}]
       });
    })
       
   }
}
</script>
<style lang="scss" scoped>
</style>