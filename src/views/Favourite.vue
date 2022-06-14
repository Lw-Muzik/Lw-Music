<template lang="html">
    <div>
        <center v-if="fav.length == 0" >No favourite yet</center>
        <layout v-else :songs="fav" :grid="true" :list="false" :title="title" :subtitle="sub" :artWork="cover"/>
    </div>
</template>
<script>
import Layout from "./widgets/Layout.vue";
import { readFileSync } from 'fs';
// import { remote } from "electron";
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
        this.fav = this.favourite;
        console.log(this.favourite);
        this.sub = `${this.favourite.length} songs`;
        this.cover = `file://${this.favourite[(this.favourite.length - 1)].artwork}`
        // this.fav = JSON.parse(readFileSync(`${remote.app.getPath('userData')}/favourite.json`));
    },
}
</script>
<style lang="scss" scoped>
    
</style>