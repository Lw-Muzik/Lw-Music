<template lang="html">
    <!-- <top-widget v-if="!getBack"  :total="folders.length" :label="`${getBack}`"/> -->
    <div class="w-4/5">
         <grid :items="folders" @routeTo="routeT" v-show="!getBack"/>
        <router-view v-show="getBack"/>
    </div>
       
  
</template>
<script>
import { readFileSync } from 'fs';
import { remote } from "electron";
import Grid from "./widgets/Gen/Grid.vue";
import TopWidget from "./widgets/ToWidget.vue";
export default {
    name:'Folder',
    components:{ Grid, TopWidget },
    data() {
        return {
            showRoute:false,
            folders:[],
            unsorted:[],
            processed:[],
            covers:[]
        }
    },
   
    methods: {
        routeT(){
            this.$store.commit('setGenreBack',true);
            this.$router.push('/folderSongs');
            // console.log("done")
        },
        getTotalSongs(folder){
            const result = this.processed.filter((d) => (d.folder == folder));
            return result.length;
        },
        getCoverArt(folder){
            const result = this.processed.filter((d) => (d.folder == folder));
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
            this.unsorted = [...this.unsorted , data.folder];
           this.covers = [...this.covers, data.artwork];
        });
       const sorted = new Set(this.unsorted);
       sorted.forEach((g) => {
           this.folders = [...this.folders, {genre:g,total:this.getTotalSongs(g),cover:this.getCoverArt(g)}]
       });
       console.log(this.folders[0].cover)
   }
}
</script>
<style lang="scss" scoped>
</style>