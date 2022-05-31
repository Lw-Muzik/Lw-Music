<template lang="html">
    <div>
        <div class="top flex flex-row justify-between items-center fixed z-10">
             <div class=" flex flex-row justify-center items-center p-3  m-4  bg-black rounded-lg h-10 ">
                 <p>{{genre}} - {{store.length}} songs</p>
            </div>

            <button class="bg-black p-3 rounded-3xl flex flex-row justify-center items-center" @click="playAll" >Play All<span class="mi mi-play-arrow"></span></button>

            <div class=" cursor-pointer flex flex-row justify-center items-center p-3 m-4 bg-black rounded-lg h-10" @click="goBack">
                <p> &lt; Back</p>
            </div>
        </div>
        <layout :songs="store" :grid="true" :list="false" :circle="false" />
    </div>
</template>
<script>
import { readFileSync } from "fs";
import { remote } from "electron";
import Layout from "../Layout.vue";
import * as mi from "material-icons";
export default {
    name:"FolderView",
    data() {
        return {
            store:[]
        }
    },
    components:{
        Layout
    },
    computed: {
        folder(){
            return this.$store.getters.getGenreCategory;
        },
        getBack(){
            return this.$store.getters.getGenreBack;
    }
},
    created(){
         this.player = this.$store.getters.getPlayer;
    },
    mounted(){
        /**load all tracks */
          let raw = JSON.parse(`${readFileSync(remote.app.getPath('userData')+'/processed.json')}`);
         this.store = raw.filter((song) => (song.folder == this.folder));
    },
      methods:{
           playAll(){
              console.log(this.store[this.index].data);
                this.player.src = this.store[this.index].data;
                this.player.play();
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