<template lang="html">
    <div>
        <br/>
        <br/>
        <top class="fixed z-10 top-1" :artWork="artWork" :title="title" :subtitle="subtitle" :songData="songs" />
        <br>
        <br>
        <br>
        <br>
        <spinner :text="loader" v-if="songs.length == 0" />
        <list-view :queueList="songs" v-show="list" v-else/>
        <grid-view :items="songs" v-show="grid" :cir="circle"/>
    </div>
</template>
<script>
import GridView from "./GridView.vue";
import Top from "./Top.vue";
import Spinner from "./Spinner.vue";
import ListView from "./ListView.vue";
export default {
    name:'Layout',
    props:{
         grid:Boolean, 
        list:Boolean, 
        songs:Array,
        loader:String,
         circle:Boolean,
          artWork:String,
         title:String,
         subtitle:String,
         showPlay:Boolean
        },
    components:{ ListView , GridView, Top, Spinner }
}
</script>
<style lang="scss" scss>
    div{
        color:aliceblue;
    }

</style>