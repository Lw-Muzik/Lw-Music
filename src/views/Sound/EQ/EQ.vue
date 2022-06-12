<template lang="html">
    <div>
       <equalizer-component :bandSet="bands"/>
    </div>
</template>
<script>
import EqualizerComponent from "@/components/EqaulizerWidget/Equalizer.vue";
export default {
    name:"EQ",
    components:{ EqualizerComponent },
    computed: {
        bands(){
            return this.$store.getters.getBands;
        }
    },

}
</script>
<style lang="scss" scoped>
    
</style>