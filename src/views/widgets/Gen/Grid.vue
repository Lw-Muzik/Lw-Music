<template lang="html">
    <div class="lg:w-full sm:w-8/12 grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 overflow-hidden">
        <tile 
                @routeGenre="this.$emit('routeTo')"
                v-for="(item,index) in items" 
                :key="index"
                :title="item.genre"
                :cover="item.cover"
                :total="item.total"
                 />
    </div>
</template>
<script>
import Tile from "./Tile.vue";
export default {
    name:"Grid",
    props:{
        items:Array,
    },
    components:{ Tile }
}
</script>
<style lang="scss" scoped>
    
</style>