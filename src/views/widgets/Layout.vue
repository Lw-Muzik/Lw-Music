<template lang="html">
    <div>
        <br/>
        <top class="fixed z-10 top-1" :artWork="artWork" :title="title" :subtitle="subtitle" :songData="songs" />
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>

        <list-view :queueList="songs" v-show="list"/>
        <grid-view :items="songs" v-show="grid" :cir="circle"/>
    </div>
</template>
<script>
import GridView from "./GridView.vue";
import Top from "./Top.vue";
import ListView from "./ListView.vue";
export default {
    name:'Layout',
    props:{
         grid:Boolean, 
        list:Boolean, 
        songs:Array,
         circle:Boolean,
          artWork:String,
         title:String,
         subtitle:String,
         showPlay:Boolean
        },
    components:{ ListView , GridView, Top }
}
</script>
<style lang="scss" scss>
    div{
        color:aliceblue;
    }

</style>