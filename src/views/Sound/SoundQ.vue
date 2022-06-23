<template lang="html">
 <!-- <div class="lg:w-full sm:w-8/12 grid md:grid-cols-3 m-10 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden"> -->
    <!-- <cards v-for="c in cards" :name="c.name" :route="c.route" :icon="c.icon"/> -->
   <tab-view/>
   <!-- </div> -->

</template>
<script>
import TabView from "@/components/Tabs/TabView.vue";
import Cards from "./widgets/Cards.vue";
export default {
    name:"SoundQ",
    components:{ Cards, TabView },
    data() {
        return {
            cards:[
                {name:"Equalizer Presets", icon:"mi mi-equalizer" , route : "/eq"},
                {name:"Speaker Presets", icon:"mi mi-speaker" , route : "/sps"},
                {name:"Room Effects", icon:"mi mi-room" , route : "/rms"},
                {name:"Audio Presets", icon:"mi mi-headphones" , route : "/aps"},
            ]
        }
    },
}
</script>
<style lang="scss" scoped>
    .card{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border: 1px solid #dddd;
        color: #dddd;
        width: 200px;
        height: 200px;
        margin: 15px;
        border-radius: 5px;
        transition: 0.3s ease-in-out;
        box-shadow: -1px -1px 1px 0px #dddd;
        font: 500 19px Ubuntu,Arial;
            .icon b{
                font-size: 60px;
            }
            &:hover{
                box-shadow: -3px -3px 1px 0px #dddd;
            }
    }
</style>