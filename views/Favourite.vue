<template lang="html">
    <div class=" w-4/5 flex  flex-col justify-center items-center">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>  <br>
        
        <br>
        <br>
        <center class=" w-96 border-gray-100 border-4 border-dashed p-4 text-2xl m-10" v-if="fav.length == 0" >No favourites yet</center>
        <layout v-else :songs="fav" :grid="false" :list="true" :title="title" :subtitle="sub" :artWork="cover"/>
    </div>
</template>
<script>
import Layout from "./widgets/Layout.vue";
import { remote } from  "electron";
import { readFileSync } from "fs";
export default {
    name:'Favourite',
    data() {
        return {
            title:"Your Favourites",
            fav:[],
            sub:'',
            cover:''
        }
    },
    components:{ Layout },
    computed: {
        favourite(){
            return this.$store.getters.getFavourites;
        }
    },
    mounted() {
        const favourites = JSON.parse(readFileSync(`${remote.app.getPath('userData')}/favourite.json`));
        this.fav = favourites;
        this.sub = `${this.fav.length} songs`;
        this.cover = `file://${this.fav[(this.fav.length - 1)].artwork}`
    },
}
</script>
<style lang="scss" scoped>
    
</style>