<template lang="html">
    <div>
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