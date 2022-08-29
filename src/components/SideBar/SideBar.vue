<template>
    <div class="sidebar w-64 flex flex-col justify-space-between items-center " >
            <img src="../../assets/pAudio.png" class="p-10 py-10 w-40"/>
             <div class="w-full view">
                 <list-tile 
                 v-for="(item,index) in sidebar" 
                 :key="item.id" 
                 :title="item.label"
                 :id="index"
                 :leading="item.icon"
                 @onTap="route(item.route)"
                  />
             </div>
            
          </div>
</template>

<script>
import ListTile from "./ListTile.vue"
export default {
    name:"SideBar",
    components:{ListTile},
    data() {
        return {
          tapped:false,
             sidebar:[
           {icon:"mi mi-home",label:"Home",active:false,route:'/',id:1},
           {icon:"mi mi-music-note",label:"All Songs",active:false,route:'/tracks',id:1},
           {icon:"mi mi-music-note",label:"Genres",active:false, route:'/genre',id:2},
           {icon:"mi mi-person",label:"Artists",active:false,route:'/artist',id:3},
           {icon:"mi mi-album",label:"Albums",active:false,route:'/album',id:4},
           {icon:"mi mi-folder",label:"Folders",active:false,route:'/folder',id:4},
           {icon:"mi mi-stream",label:"Streams",active:false,route:'/stream',id:6},
           {icon:"mi mi-thumb-up",label:"Favorite",active:false,route:'/favourite',id:5},
           {icon:"mi mi-speaker",label:"SoundQ",active:false,route:'/soundQ',id:6},
           {icon:"mi mi-settings",label:"Settings",active:false,route:'/settings',id:7},

        ]
        }
    },
    methods:{
      route(a){
        this.$router.push(a);
        if(a == '/'){
           this.$store.commit('setShowSidenav', false);
        } else if(a == '/soundQ'){ 
           this.$store.commit('setShowSidenav', false);
        } else if(a == '/settings'){
        }else{
           this.$store.commit('setShowSidenav', true);
        }      
      }
    }
}
</script>

<style lang="scss" scoped>
    .sidebar{
      padding-top:25px;
      backdrop-filter:blur(40px);
      background: linear-gradient(to right, rgba(0,0,0,1) 10%,rgba(0,0,0,0.5) 100%);
      .view{
        &::-webkit-scrollbar{
          appearance: none;
          width: 5px;
        }
         &::-webkit-scrollbar-thumb{
          appearance: none;
          width: 10px;
          border-radius: 10px;
          background: #afafab;
        }
        height: 400px;
        overflow-y: scroll;
        overflow-x: hidden;
      }
    }
   
    
</style>