<template lang="html">
    <div class="w-4/5">
         <Grid :items="folders" :title="`Folders`" :loader="`Folders`" @routeTo="routeT"/>
    </div>
</template>
<script>

import { ipcRenderer} from "electron";
import Grid from "./widgets/Gen/Grid.vue";
import TopWidget from "./widgets/ToWidget.vue";
import Layout from "./widgets/Layout.vue";
export default {
    name:'Folder',
    components:{ Grid, TopWidget, Layout },
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
            this.$router.push('/folderSongs');
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
        ipcRenderer.on("loaded",(e,args)=>{
            this.processed = args;
            args.forEach((data) =>{
                this.unsorted = [...this.unsorted , data.folder];
            this.covers = [...this.covers, data.artwork];
            });

        const sorted = new Set(this.unsorted);
        sorted.forEach((g) => {
            this.folders = [...this.folders, {genre:g,total:this.getTotalSongs(g),cover:this.getCoverArt(g)}]
        });
        })
        
   }
}
</script>
<style lang="scss" scoped>
</style>