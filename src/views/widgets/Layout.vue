<template lang="html">
    <div>
        <list-view :queueList="songs" v-show="list"/>
        <grid-view :items="songs" v-show="grid"/>
    </div>
</template>
<script>
import GridView from "./GridView.vue";
import ListView from "./ListView.vue";
export default {
    name:'Layout',
    props:{ grid:Boolean, list:Boolean, songs:Array },
    components:{ ListView , GridView }
}
</script>
<style lang="scss" scoped>
    
</style>