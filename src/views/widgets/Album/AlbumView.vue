<template lang="html">
    <div>
        <!-- <div class="top flex flex-row justify-between items-center fixed z-10">
             <div class=" flex flex-row justify-center items-center p-3  m-4  bg-black rounded-lg h-10 ">
                 <p>{{genre}} - {{getSongs().length}} songs</p>
            </div>

            <button class="bg-black p-3 rounded-3xl flex flex-row justify-center items-center" >Play All<span class="mi mi-play-arrow"></span></button>

            <div class=" cursor-pointer flex flex-row justify-center items-center p-3 m-4 bg-black rounded-lg h-10" @click="goBack">
                <p> &lt; Back</p>
            </div>
        </div> -->
        <layout :songs="getSongs()" :grid="true" :list="false" :loader="genre" :circle="false"/>
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
             this.$store.commit('setGenreBack',false);
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