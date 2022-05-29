<template lang="html">
    <titlebar class="titlebar"/>
 <div class="flex flex-col flex-grow col-span-2">
  <div class="app bg-gray-200">

      <div class="flex flex-row row-span-3">
        <!-- sidebar -->
          <side-bar/>
        <!-- Middle grid -->
        <div class="bg-yellow-600 w-3/4" >
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
          <div class="bg-blue-700 w-96">3</div>
  </div>
   <!-- bottom widget -->
       <div class="layout bg-red-800 p-10 h-20 w-screen">
        
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

export default {
  name:"Dashboard",
  data() {
    return {
      load:[],
      
    }
  },
  components:{ Titlebar, SideBar, Top},
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
  .app{
    overflow: hidden;
  }
  .router-view{
    &::-webkit-scrollbar{
      appearance: none;
      width: 2px;
    }
    overflow-x: hidden;
    overflow-y: scroll;
    width:fit-content;
    height: calc(65vh - 0px);
  }
  .middle{
    align-items: center;
  }
</style>