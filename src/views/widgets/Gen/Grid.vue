<template lang="html">
 <br/>
        <top class="fixed z-10 top-1" :artWork="artWork" :title="title" :subtitle="subtitle" :songData="items.length" />
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <div class="gridView m-8">

    <div class="lg:w-full sm:w-8/12 grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 grid-rows-3">
        <tile 
                @routeGenre="this.$emit('routeTo')"
                v-for="(item,index) in items"
                :key="index"
                :title="item.genre"
                :cover="item.cover"
                :total="item.total"
                 />
    </div>
    </div>
</template>
<script>
import Tile from "./Tile.vue";
export default {
    name:"Grid",
    props:{
        items:Array,
        artwork:String,
        title:String,
        subtitle:String
    },
    components:{ Tile }
}
</script>
<style lang="scss" scoped>
       .gridView{ overflow-y:scroll; overflow-x: hidden; height: 560px;
       &::-webkit-scrollbar{
      appearance: none;
      width: 10px;
    }
       }
</style>