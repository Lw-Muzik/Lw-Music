<template lang="html">
    <div>
         <!-- <to-widget :label="artist" :total="store.length" /> -->
        <layout 
        :songs="store" 
        :grid="false"
        :loader="artist"
         :list="true" 
         :circle="false" 
         :title="artist"
         :artWork="cover"/>
    </div>
</template>
<script>

import { ipcRenderer } from "electron";
import Layout from "../Layout.vue";
import * as mi from "material-icons";
import { readFileSync } from "fs";
export default {
    name:"ArtistTracks",
    data() {
        return {
            store:[],
            cover:'',
        }
    },
    components:{
        Layout
    },
    computed: {
        artist(){
            return this.$store.getters.getGenreCategory;
        },
        getBack(){
            return this.$store.getters.getGenreBack;
    }
    },
    mounted(){
        ipcRenderer.on("processed", (e,args)=>{
                const sngs = JSON.parse(`${readFileSync(args)}`);
                this.store = sngs.filter((song) => (song.artist == this.artist));
                this.cover = this.store[0].artWork;
            });
    },
      methods:{
        goBack(){
            this.$router.back();
        }
    },

}
</script>
<style lang="scss" scoped>
.top{
    width: 50%;
}
button{
    color: #fff;
}
    p{
        color: #eee;
    }
</style>