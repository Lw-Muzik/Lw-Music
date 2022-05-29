<template lang="html">
    <div>
        <center v-if="fav.length == 0" >No favourite yet</center>
        <layout v-else :items="fav" :grid="true" :list="false"/>
    </div>
</template>
<script>
import Layout from "./widgets/Layout.vue";
import { readFileSync } from 'fs';
import { remote } from "electron";
export default {
    name:'Favourite',
    data() {
        return {
            fav:[]
        }
    },
    components:{ Layout },
    mounted() {
        this.fav = JSON.parse(readFileSync(`${remote.app.getPath('userData')}/favourite.json`));
    },
}
</script>
<style lang="scss" scoped>
    
</style>