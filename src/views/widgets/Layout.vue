<template lang="html">
    <div>
        <list-view :queueList="songs" v-show="list"/>
        <grid-view :items="songs" v-show="grid" :cir="circle"/>
    </div>
</template>
<script>
import GridView from "./GridView.vue";
import ListView from "./ListView.vue";
export default {
    name:'Layout',
    props:{ grid:Boolean, list:Boolean, songs:Array, circle:Boolean },
    components:{ ListView , GridView }
}
</script>
<style lang="scss" scoped>
    
</style>