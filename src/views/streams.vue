<template lang="html">
    <section class="overflow-hidden text-gray-700 ">
      <center v-if="stream.length == 0" >No streams yet</center>
      <layout v-else :items="stream" :grid="true" :list="false"/>
</section>
</template>
<script>
import { ipcRenderer } from 'electron';
import { readFileSync } from 'fs';
import Layout from "./widgets/Layout.vue";
export default {
    name:"Stream",
    components:{
      Layout
    },
    data() {
        return {
            stream:[]
        }
    },
    created() {
        // ipcRenderer.on('stream',(e,args)=>{
        //     this.stream = JSON.parse(readFileSync(args));
        // })
    },
}
</script>
<style lang="scss" scoped>
    
</style>