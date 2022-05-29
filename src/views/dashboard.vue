<template lang="html">
    <titlebar class="titlebar"/>
 <div class="flex flex-col flex-grow col-span-2">
  <div class="app bg-gray-200">

      <div class="flex flex-row row-span-3">
        <!-- sidebar -->
          <side-bar/>
        <!-- Middle grid -->
        <div class="mid w-3/4" >
          <br>
          <br>
            <div class="middle flex flex-auto flex-col justify-center">
              <top/>
                <div class="router-view">
                  <router-view/>
              </div>
            </div>
          </div>

          <!-- last grid  -->
          <div class="rightSide flex flex-col justify-center">
              <add-folder/>
          </div>
  </div>
   <!-- bottom widget -->
       <div class="bg-red-800 p-10 h-20 w-screen">
        
      </div>
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
export default {
  name:"Dashboard",
  data() {
    return {
      load:[],
      
    }
  },
  components:{ Titlebar, SideBar, Top , AddFolder },
  methods:{
    openDir(){
      ipcRenderer.send("openDir");
    },
    childPop(){
      const win = remote.getCurrentWindow();
      remote.dialog.showCertificateTrustDialog(win);
    },
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
  .mid{ background: #0a001aee;}
  .app{
    overflow: hidden;
  }
  .router-view{
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
    width:fit-content;
    height: calc(65vh - 0px);
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
    background:#222;
  }
  .middle{
    align-items: center;
  }
</style>