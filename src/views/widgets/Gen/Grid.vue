<template lang="html">
 <br/>
   <spinner v-if="items.length == 0" :text="loader" />
 <div v-else class="gridView m-8">

    <div class="lg:w-full sm:w-8/12 grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5">
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
import Spinner from "../Spinner.vue";
import TopWidget from "../ToWidget.vue";
export default {
    name:"Grid",
    props:{
        items:Array,
        artwork:String,
        title:String,
        loader:String,
        subtitle:String
    },
    components:{ Tile, TopWidget, Spinner }
}
</script>
<style lang="scss" scoped>
       .gridView{ 
        margin: 20px;
        width: 1400px;
        margin-left:10%;
        overflow-y:scroll; overflow-x: hidden; height: 860px;
       &::-webkit-scrollbar{
      appearance: none;
      width: 10px;
    }
       }
</style>