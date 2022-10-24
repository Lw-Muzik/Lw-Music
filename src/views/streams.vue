<template lang="html">
    <section v-if="online" class="overflow-hidden text-gray-700 ">
      <center v-if="stream.length == 0" >No streams yet
      {{streamUrl}}
      <!-- <Spinner :text="`loading...`"/> -->
      </center>
      <layout v-else :items="stream" :grid="true" :list="false"/>
</section>

<section v-else class="flex flex-col justify-center items-center my-96">
   <b class="text mi mi-wifi-off" ></b>
   <p class="text-2xl" >Ooops your currently offline.</p>
</section>
</template>
<script>
import Layout from "./widgets/Layout.vue";
import Spinner from './widgets/Spinner.vue';
import{ load }from "cheerio";
import { writeFileSync , readFileSync } from "fs";
import axios from 'axios';
import { ipcRenderer } from "electron";
export default {
    name:"Stream",
    components:{
    Layout,
    Spinner
},
    data() {
        return {
            streamUrl:'',
            online:true,
            stream:[]
        }
    },
    mounted(){
        //  (async () => {

     

if(true){
    this.online = true;
          axios.get(`https://www.nowviba.com/music/pages/top100.php`).then((response)=>{
              var dom = response.data;
              // 
              const ch = load(dom);
              let trackList = ch('.hot100')
              // let trackPic = ch('img.imagefillstr');
          trackList.each((index,element)=>{
              let hot100 = {
                  title:`${element.children[0].children[5].children[0].children[0].data}`,
                  artist:`${element.children[0].children[5].children[1].children[0].data}`,
                  artwork:`${element.children[0].children[3].children[1].attribs.data}`,
                  url:element.children[2].children[3].children[1].attribs.src
              }
              console.log(hot100)
              this.stream = [...this.stream,hot100]
            writeFileSync(`store.json`,JSON.parse(this.stream))
            });
         });
         } else {
            this.online = false;
         }
    //  })();
    },
    created() {
        ipcRenderer.on('stream',(e,args)=>{
            this.stream = JSON.parse(readFileSync(args));
        })
    },
    mounted() {
        console.log(this.stream);
    },
}
</script>
<style lang="scss" scoped>
    .text{ font-size: 50px; padding:16px; }
</style>