<template lang="html">
    <titlebar class="titlebar"/>
  <div class="app flex flex-col justify-center fixed h-full">
      <div class="flex h-full flex-row row-span-3">
        <!-- sidebar -->
          <side-bar  class=" w-48 h-full"/>
        <!-- Middle grid -->
        <div class="h-full" >
            <div class="middle h-full">
              <br>
                <div :class="[showSidenav == true ? 'active': 'w-screen','router-view']">
                  <router-view/>
              </div>
            </div>
          </div>

          <!-- last grid  -->
          <div v-show="showSidenav" class="rightSide flex flex-col justify-center">
              <add-folder/>
          </div>
  </div>
   <!-- bottom widget -->
       <div class="btW flex flex-col justify-center absolute z-10 bottom-0">
         <mini-player />
      </div>
  </div>
</template>
<script>
import Titlebar from "../components/TitleBar/Titlebar.vue";
import SideBar from "../components/SideBar/SideBar.vue";
import Top from "./widgets/Top.vue";
import { ipcRenderer, remote } from "electron";
import { readFileSync } from 'fs';
import * as mi from "material-icons";
import AddFolder from "./widgets/addFolder.vue";
import MiniPlayer from "../player/MiniPlayer.vue";
export default {
  name:"Dashboard",
  data() {
    return {
      load:[],
    }
  },
    computed: {
      player(){
        return this.$store.getters.getPlayer;
      },
      showSidenav(){
        return this.$store.getters.showSidenav;
      }
    },
  components:{ Titlebar, SideBar, Top , AddFolder, MiniPlayer },
  methods:{ 
    showTrack(){
      let raw = JSON.parse(`${readFileSync(remote.app.getPath('userData')+'/processed.json')}`);
      this.load = raw;
    }
  }
}
</script>
<style lang="scss" scoped>
.titlebar{
  position:fixed;
  top: 0;
    width:100%;
  }
  .app{
    overflow: hidden;
    // height: 1000px;
  }
  .btW{
    width: 90%;
    height:4.5rem;
    border-radius:10px;
    color: #fff;
  }
  .router-view{
    overflow: hidden;
    // overflow-y: scroll;
    height: calc(90vh - 80px);
    // background-color: #fff;
    // height: 200vh !important;
    transition:0.3s ease-in-out;
    &.active{ 
       width:120vh;
    }
  }
  .rightSide{ 
        &::-webkit-scrollbar{
      appearance: none;
      width: 10px;
    }
    
      &::-webkit-scrollbar-thumb{
      appearance: none;
      width: 5px;
      background: #706e65;
      border-radius: 10px;
    }
     overflow-x: hidden;
    overflow-y: scroll;
    width:450px;
     background: #140125;
    // background:#222;
  }
  .middle{
    align-items: center;
     background: #0b0413;
     overflow:hidden;
    // height: calc(100vh - 80px);

  }
</style>