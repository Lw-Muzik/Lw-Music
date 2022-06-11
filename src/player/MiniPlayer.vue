<template lang="html">
 <player-slider class="slider"/>
    <div ref="player" class="player flex flex-row justify-between items-center overflow-hidden">
        <div class="wrapper">
             <img :src="`file://${track.artwork}`" />
        </div>
      
        <track-cover/>
        <div></div>
        <actions/>
    </div>
</template>
<script>
import TrackCover from "./components/Cover.vue";
import PlayerSlider from "./components/slider.vue";
import Actions from "./components/actions.vue";
export default {
    name:'MiniPlayer',
    data() {
        return {
            cover:''
        }
    },
    components:{ TrackCover, Actions, PlayerSlider },
     computed: {
        track(){
            return this.$store.getters.getMusicData;
        }
    },
    mounted(){
        console.log(this.track.artwork)
        document.querySelector('.player').style.backgroundImage = `url(file://${this.track.artwork})`;
        // this.$refs['player'].style.backgroundImage = 'url(file://'+this.track.artwork+')';
    }

}
</script>
<style lang="scss" scoped>
    .slider{
        width: 100%;
        position: fixed;
        margin-top: -100px;
    }
    .player{
        backdrop-filter: blur(100px);
        z-index: 15!important;
        position: fixed;
        // background: '#000000';
        width: 100%;
        .wrapper{
            width: 100%;
        backdrop-filter: blur(220px);

            z-index: -1!important;
            position: absolute;
            img{
                width: 100%;
                z-index: 3;
            }
        }
    background: #0d0118;

    }
</style>