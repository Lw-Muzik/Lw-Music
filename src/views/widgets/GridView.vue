<template lang="html">
    <div class="lg:w-full sm:w-8/12 grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
        <grid-tile 
                :circle="cir"
                v-for="(item,index) in items" 
                :key="index"
                 :title="item.title"
                 :art="item.artwork"
                 :artist="item.artist"
                 />
    </div>
</template>
<script>
import GridTile from "./GridTile.vue";
export default {
    name:"GridView",
    props:{
        items:Array,
        cir:Boolean
    },
    components:{ GridTile }
}
</script>
<style lang="scss" scoped>
    
</style>