<template lang="html">
  <div v-show="dash" class="body">
<!-- <titlebar/> -->

    <div class="wrap">
  <div class="logo">
    <svg xmlns="http://www.w3.org/2000/svg" width="175.859" height="47.344" viewBox="14.904 4.22 175.859 47.344" enable-background="new 14.904 4.22 175.859 47.344">
<path class="sound" fill="none" stroke="#53ff4a" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M127.221,30.934
    c2.623-2.853-2.554-5.247-5.802-3.284c-8.028,4.852,2.687,11.081,2.461,17.19c-0.206,5.577-9.099,4.291-8.949,0.764
    c0.227-5.387,17.371-1.531,17.712-9.586c-2.427,1.652-3.146,10.58,0.783,11.754c2.699-3.859,4.232-8.865,3.91-13.561
    c-0.212-3.066-0.625-6.663-3.814-2.955c-5.467,6.354,9.537,3.03,11.764-0.694c-2.037,1.758-4.058,11.599-0.374,13.487
    c3.926,2.014,6.479-10.906,6.253-13.453c-1.672,2.269-3.09,10.799,1.215,11.641c4.416,0.865,5.911-9.306,5.925-12.147
    c-1.679,3.783-1.772,9.163-1.516,13.502c3.101-4.222,5.184-10.569,7.518-15.473c0.402,2.899-2.171,14.032,1.752,14.047
    c3.69,0.017,5.404-10.553,11.165-10.387c-4.342-0.912-8.76,8.435-6.649,11.735c4.646,7.271,17.386-25.097,18.094-27.76
    c0.614-2.309,3.619-10.674-0.664-11.029c-3.682-0.306-7.679,13.899-8.194,16.233c-1.041,4.69-2.767,28.959,8.061,26.401"/>
<path class="t"  fill="none" stroke="#53ff4a" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M72.048,11.07
    c-0.34,7.199-1.661,14.47-2.314,21.668c-0.363,4-2.04,11.719,1.996,14.662c4.022,2.932,6.989-1.367,7.121-5.188"/>
<path class="he" fill="none" stroke="#53ff4a" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M62.335,35.443
    c6.994-2.713,15.478-10.805,20.433-17.371c0.388,2.387,0.121,9.237-0.291,16.189c-0.411,6.953-0.967,14.009-1.159,16.803
    c0.577-4.233,3.164-15.414,7.998-16.633c0.021,2.35-1.854,9.184,0.766,10.424c5.091,2.407,9.23-10.448,9.039-13.824
    c-4.682,0.113-5.847,10.457-3.966,13.621c3.318,5.592,8.274-0.102,11.543-2.666"/>
<path class="s" fill="none" stroke="#53ff4a" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M24.384,30.879
    c3.375-2.995-3.211-5.841-5.442-1.359c-2.701,5.42,3.819,11.883,3.179,17.26c-3.343,0.668-7.441-1.359-6.607-5.254"/>
<path class="ee" fill="none" stroke="#53ff4a" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M27.71,42.41
    c1.609-1.548,10.686-9.492,8.911-13.312c-1.302-2.802-3.932-0.405-5.483,1.517c-2.471,3.062-3.25,10.019-1.833,13.619
    c4.744,12.046,21.938-11.287,19.31-15.437c-3.284-5.182-7.131,8.084-6.648,10.569c1.295,6.671,16.161,8.828,17.23,2.601"/>
    </svg>
  </div>

  <div class="intro">
    <div class="form">
       <label for="file" class="text">Choose a music folder</label>
    <div class="path-panel">
       <p v-if="paths.length == 0" class="no-path-tile ">
          No path selected
       </p>
        <p v-else v-for="(path,index) in paths" :key="path" class="path-tile">
           <span class="icon mi mi-folder"></span> <span class="path">{{path}}</span> <span class="close" @click="remove(index)">&times;</span>
       </p>
    </div>
     <br>
     <button class="file-open" @click="chooseFolder"> Add Folder</button>
     <button v-if="paths.length != 0" @click="goToHome">Continue</button>
    </div>
  </div>
</div>

  </div>
  <div v-show="!dash">
      <router-view/>
  </div>
</template>
<script>
import * as mi from "material-icons";
import { ipcRenderer, remote } from 'electron';
import Titlebar from "@/components/TitleBar/Titlebar.vue";
import { readFileSync, writeFileSync } from 'fs';

export default {
  name:'Initial',
  data() {
    return {
      dash:true,
      url:`${remote.app.getPath('userData')}/settings.json`,
      store:'',
      paths:[]
    }
  },
    components:{Titlebar},
 mounted() {
       this.paths = JSON.parse(readFileSync(this.url)).savedPaths;
 },
  methods: {
       chooseFolder(){
        ipcRenderer.sendSync("loadFolder");
        ipcRenderer.on("chosenFolder",(event,args)=>{
                let s = JSON.parse(readFileSync(this.url));
                this.paths = [...this.paths,args];
                s.savedPaths = this.paths;
                writeFileSync(this.url,JSON.stringify(s));
          /**After upadating the UI then load the tracks in the database */
          // event.sender.sendSync("loadTracks");
        })
    },
    remove(id){
      let update = JSON.parse(readFileSync(this.url));
        this.paths.splice(id,1);
        update.savedPaths = this.paths;
        writeFileSync(this.url,JSON.stringify(update));
    },
    goToHome(){
      // this.$router.push('/');
      this.dash = false;
      remote.getCurrentWindow().maximize();
    }
   
  },
  }
</script>
<style lang="scss" scoped>
  @import "@/Design/Welcome.scss";
  .titlebar{
  position:fixed;
  top: 0;
  z-index: 3!important;
    width:100%;
  }
</style>