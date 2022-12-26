<template lang="html">
    <div>
        
        <layout :songs="store" :grid="false" :loader="genre" :title="genre" :list="true"/>
    </div>
</template>
<script>
import { readFileSync } from "fs";
import { ipcRenderer,remote } from "electron";
import Layout from "../Layout.vue";
import * as mi from "material-icons";
export default {
    name:"GenreTracks",
    data() {
        return {
            store:[],
            player:null,
            index:0
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
    mounted(){
        // ipcRenderer.on('processed',(event, args)=>{
        let raw = JSON.parse(readFileSync(`${remote.app.getPath("userData")}/processed.json`));
         this.store = raw.filter((song) => (song.genre == this.genre));
         console.log("genre songs "+this.store);
       
            this.player.onended = function(){
                    // console.log("ended");
                    this.index += 1;
                    console.log(this.store[this.index].data);
                     this.player.src = this.store[this.index].data;
                    this.player.play();
                }
            // })
    },
    created(){
         this.player = this.$store.getters.getPlayer;
    },
      methods:{
          playAll(){
              console.log(this.store[this.index].data);
                this.player.src = this.store[this.index].data;
                this.player.play();
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