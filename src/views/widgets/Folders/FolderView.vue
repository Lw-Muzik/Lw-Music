<template lang="html">
    <div>
        <layout
         :songs="store"
          :grid="false"
           :list="true"
            :title="folder"
            :loader="folder"
            :showPlay="playAll"
             :artWork="cover"
             :subtitle="subt"
              />
    </div>
</template>
<script>

import { ipcRenderer} from "electron";
import Layout from "../Layout.vue";
import * as mi from "material-icons";
import ToWidget from "../ToWidget.vue";
export default {
    name:"FolderView",
    data() {
        return {
            store:[],
            playAll:true,
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
    },
    getList(){
        return this.$store.getters.getPlaylist;
    }

},
    created(){
         this.player = this.$store.getters.getPlayer;
    },
    mounted(){
        /**load all tracks */
         ipcRenderer.on("loaded",(e,args)=>{
            this.store = args.filter((song) => (song.folder == this.folder));
            this.title = `${this.folder}`
            this.cover = `file://${this.store[0].artwork}`;
            this.subt = `${this.store.length} songs`
         })
      
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