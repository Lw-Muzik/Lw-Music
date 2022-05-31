<template lang="html">
 <player-slider class="slider"/>
    <div class="flex flex-row justify-between items-center">
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
    components:{ TrackCover, Actions, PlayerSlider }
}
</script>
<style lang="scss">
    .slider{
        width: 100%;
        position: fixed;
        margin-top: -80px;
    }
</style>