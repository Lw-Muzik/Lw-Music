<template lang="html">
    <div class="form m-4 px-2">
       <center class="title">Saved folders</center>
    <div class="path-panel">
       <p v-if="paths.length == 0" class="no-path-tile ">
          No path selected
       </p>
        <p v-else v-for="(path,index) in paths" :key="path" class="path-tile">
           <span class="icon mi mi-folder"></span> <span class="path">{{path}}</span> <span class="close" @click="remove(index)">&times;</span>
       </p>
    </div>
     <br>
    <div class="">
         <button class="file-open" @click="chooseFolder"> Add Folder</button>
     <button class="file-open" @click="refreshList">Refresh </button>
     </div>
    </div>
</template>
<script>
import * as mi from "material-icons";
import { ipcRenderer, remote } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
export default {
    name:'AddPath',
    data() {
       return {
          dash:true,
         store:'',
          url:`${remote.app.getPath('userData')}/settings.json`,
         paths:[]
       }
    },

 created() {
       this.paths = JSON.parse(readFileSync(this.url)).savedPaths;
 },
     mounted() {

       this.paths = JSON.parse(readFileSync(this.url)).savedPaths;

 },
    methods: {
       refreshList(){
            ipcRenderer.send("refresh");
       },
        chooseFolder(){
        ipcRenderer.sendSync("loadFolder");
        ipcRenderer.on("chosenFolder",(event,args)=>{
         
          let c = setInterval(()=>{
                let s = JSON.parse(readFileSync(this.url));
                this.paths = [...this.paths,args];
                s.savedPaths = this.paths;
                writeFileSync(this.url,JSON.stringify(s));
                clearInterval(c);
            },500); // to prevent double insertion
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
   },
}
</script>
<style lang="scss" scoped>
  .form {
     border-radius:5px;
    transition: ease-in-out .3s;
    border: 1px solid #dddddd4f;
    .text {
      color: #fff;
      font: 200 21px Ubuntu,Arial;
      line-height: 1.5;
      transition: color .3s;
    }
    &:hover .text {
      color: #a3ff99;
      animation: color 4s .3s infinite;
    }
   
    .path-panel{
      display: flex;
      border-radius: 5px;
      flex-direction: column;
      justify-content: center!important;
      align-items: center!important;
      overflow-y: scroll;
      overflow-x: hidden;
      width: 100%;
      padding: 20px 2px 5px 3px;
      height: calc(30vh - 60px);
      background: #171818;
      &::-webkit-scrollbar{
        appearance: none;
        width: 5px;
      }
      &::-webkit-scrollbar-thumb{
        appearance: none;
        width: 3px;
        background:#fff;
        border-radius: 5px;
        // height: 5px;
      }
      .no-path-tile{
        background: #dddddd33;
          border-radius: 5px;
          display:flex;
          flex-direction: row;
          justify-content: space-around;
          align-items: center;
          padding: 10px;
          margin: 5px;
          width: 70%;
          text-align: center;
      }
    .path{ width: 380px; overflow:hidden; color:#eee;}
      .path-tile{
        .icon{
          box-sizing: border-box;
          box-shadow:inset 0px 0px 7px 0px #eee;
          border-radius: 50%;
          font-size: 16px;
          padding: 5px;
          background: #faf9f950;
        }
        background: #dddddd33;
        border-radius: 5px;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 4px;
        margin: 5px;
        width: 100%;
        text-align: center;
        font: 300 14px Ubuntu,Arial;
        .close{
          font-size: 22px;
          cursor: pointer;
         background: #f3efef4f;
         border-radius: 10px;
         width: 30px;
          padding: 3px;
          &:hover{
              background: #f3f0f0;
          }
        }
      }
    }
    button{
      width: 100%;
      padding:10px;
      margin: 10px 0 10px;
      outline: none;
      font: 400 16px Ubuntu,Arial;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      background: transparent;
      outline: none;
      transform: scale(1,1);
      transition:0.3s ease-in-out;
      border: 1px solid #dddddd4f;
      &:hover{ 
         transform: scale(1.05,1.05);
      }
    }
  }
  label {
    cursor: pointer;
  }
.title{ color: #fff; padding: 10px;}
</style>