<template>
    <div class="sidebar flex flex-col justify-space-between items-center w-64" >
            <img src="../../assets/pAudio.png" class="p-5 w-20 "/>
             <div class="w-full">
                 <list-tile 
                 v-for="(item) in sidebar" 
                 :key="item.id" 
                 :title="item.label"
                 :leading="item.icon"
                 @onTap="route(item.route)"
                  />
             </div>
            
          </div>
</template>

<script>
import { ipcRenderer } from "electron";
import ListTile from "./ListTile.vue"
export default {
    name:"SideBar",
    components:{ListTile},
    data() {
        return {
          tapped:false,
             sidebar:[
           {icon:"mi mi-home",label:"Home",active:false,route:'/tracks',id:1},
           {icon:"mi mi-music-note",label:"Genres",active:false, route:'/genre',id:2},
           {icon:"mi mi-person",label:"Artists",active:false,route:'/artist',id:3},
           {icon:"mi mi-album",label:"Albums",active:false,route:'/album',id:4},
           {icon:"mi mi-stream",label:"Streams",active:false,route:'/stream',id:6},
           {icon:"mi mi-play",label:"Favorite",active:false,route:'/favourite',id:5},

        ]
        }
    },
    methods:{
      route(a){
        this.$router.push(a);
      }
    }
}
</script>

<style lang="scss" scoped>
    .sidebar{
      padding-top:25px;
    }
   
    
</style>