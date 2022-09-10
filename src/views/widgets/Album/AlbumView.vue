<template lang="html">
    <div>
        <layout :songs="getSongs()" :grid="false" :list="true" :loader="genre" :circle="false"/>
    </div>
</template>
<script>
import { readFileSync } from "fs";
import { remote } from "electron";
import Layout from "../Layout.vue";
import * as mi from "material-icons";
export default {
    name:"AlbumTracks",
    data() {
        return {
            store:[]
        }
    },
    components:{
        Layout
    },
    computed: {
        genre(){
            return this.$store.getters.getGenreCategory;
        },
        getBack(){
            return this.$store.getters.getGenreBack;
    }
    },
      methods:{
        getSongs(){
             let raw = JSON.parse(`${readFileSync(remote.app.getPath('userData')+'/processed.json')}`);
            return raw.filter((song) => (song.album == this.genre));
        },
        goBack(){
            //  this.$store.commit('setGenreBack',false);
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