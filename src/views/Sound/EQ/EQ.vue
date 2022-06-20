<template lang="html">
    <div class="mx-2">
       <equalizer-component :bandSet="bands"/>
    </div>
</template>
<script>
import Top from "../../widgets/Top.vue";
import Cover from "../../../assets/pAudio.png"
import EqualizerComponent from "@/components/EqaulizerWidget/Equalizer.vue";
export default {
    name:"EQ",
    components:{ EqualizerComponent, Top },
    data() {
        return {
            title:"Equalizer",
            cover: `${Cover}`
        }
    },
    computed: {
        bands(){
            return this.$store.getters.getBands;
        }
    },

}
</script>
<style lang="scss" scoped>
    .top{
        position: absolute;
        z-index: 27!important;
        width: 50%;
    }
    div{
        margin-right: 65px;
    }
</style>