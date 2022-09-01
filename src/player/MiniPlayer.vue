<template lang="html">
 
    <div ref="player" class="player flex flex-row justify-between w-screen items-center overflow-hidden">
      
        <track-cover class="track-cover overflow-hidden px-2"  @onTap="this.$emit('onClick')" />
        <actions/>
        <div class=" w-72 mx-28 flex flex-row justify-between m-5 items-center">
            <button class="btn" title="Equalizer" @click="lauchEq"><b class="mi mi-equalizer"></b></button>
            <button class="btn" title="Lyrics" @click="this.$emit('lyrics')"><b class="mi mi-lyrics"></b></button>
            <button class="btn" title="Shuffle" @click="this.$emit('prevTrack')" ><b class="mi mi-shuffle"></b></button>
            <button class="btn" title="Add to Favourites" @click="favourite" ><b class="mi mi-thumb-up"></b></button>
            <button class="btn" @click="this.$emit('toggleVol')" ><b class="mi mi-volume-up"></b></button>
            <button id="player" @click="this.$emit('showRoom')"> <b class="material-icons mi-meeting-room mi-rounded" title="show Room Effects"></b> </button>
            <button id="vis" @click="this.$emit('showVisual')"> <b class="material-icons mi-graphic-eq mi-rounded" title="Visual effects control"></b> </button>

        </div>
    
    </div>
</template>
<script>
import TrackCover from "./components/Cover.vue";
import Actions from "./components/actions.vue";
export default {
    name:'MiniPlayer',
    data() {
        return {
            cover:''
        }
    },
    components:{ TrackCover, Actions },
     computed: {
        track(){
            return this.$store.getters.getMusicData;
        },
        current(){
            return this.$store.getters.getCurrentSong;
        }
    },
    methods:{
        lauchEq(){
            this.$router.push("/eq");
            console.log(this.current);
        },
        lauchLyrics(){
            
        },

        favourite(){
            this.$store.commit('saveFavourite',this.track);
        }
    },
}
</script>
<style lang="scss" scoped>
    .slider{
        width: 100%;
        position: fixed;
        margin-top: -100px;
    }
    button{
        width: 50px;
        height:50px;
        display:flex;
        flex-direction:column;
        justify-content: space-evenly!important;
        align-items: center;
        border-radius:50%;
        /* background:#000000;*/
            transform:scale(1, 1);
            transition:0.3s ease-in-out;
        &:hover{
            transform:scale(1.05, 1.05);
        }
    }
    .player{
        backdrop-filter: blur(60px) !important;
        z-index: 5!important;
        position: absolute;
        background: #111111cb;
        // width: 100%;
        .wrapper{
            width: 100%;
            backdrop-filter: blur(20px);
            background: #0000005b!important;
            position: absolute;
            z-index: -1!important;
            img{
                width: 100%;
                z-index: -3!important;
            }
        }

    }
    .track-cover{
        width: 820px;
        white-space:nowrap;
    }
</style>