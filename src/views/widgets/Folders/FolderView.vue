<template lang="html">
    <div>
        <!-- <div class="top flex flex-row justify-between items-center fixed z-10">
             <div class=" flex flex-row justify-center items-center p-3  m-4  bg-black rounded-lg h-10 ">
                 <p>{{genre}} - {{store.length}} songs</p>
            </div>

            <button class="bg-black p-3 rounded-3xl flex flex-row justify-center items-center" @click="playAll" >Play All<span class="mi mi-play-arrow"></span></button>

            <div class=" cursor-pointer flex flex-row justify-center items-center p-3 m-4 bg-black rounded-lg h-10" @click="goBack">
                <p> &lt; Back</p>
            </div>
        </div>  :cover="store[Math.floor(Math.random() * store.length)].artwork"-->
        <to-widget :label="folder" :total="store.length" />
        <layout :songs="store" :grid="true" :list="false" :circle="false" />
        <layout
         :songs="store"
          :grid="true"
           :list="false"
            :title="title" 
            :showPlay="playAll"
             :artWork="cover"
             :subtitle="subt"
              />
    </div>
</template>
<script>
import { readFileSync } from "fs";
import { remote } from "electron";
import Layout from "../Layout.vue";
import * as mi from "material-icons";
import ToWidget from "../ToWidget.vue";
export default {
    name:"FolderView",
    data() {
        return {
            store:[],
            playAll:true,
            title:"",
            subt:"",
        }
    },
    components:{
    Layout,
    ToWidget
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
         this.title = `${this.folder}`
         this.cover = `file://${this.store[0].artwork}`;
         this.subt = `${this.store.length} songs`
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