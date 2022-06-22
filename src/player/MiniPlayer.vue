<template lang="html">
 
    <div ref="player" class="player flex flex-row justify-between w-screen items-center overflow-hidden">
      
        <track-cover class="track-cover overflow-hidden px-2"/>
        <actions/>
        <div class=" w-40 mx-28 flex flex-row justify-between m-5 items-center">
            <button class="btn" title="Equalizer" @click="lauchEq"><b class="mi mi-equalizer"></b></button>
            <button class="btn" title="Shuffle" @click="this.$emit('prevTrack')" ><b class="mi mi-shuffle"></b></button>
            <button class="btn" title="Add to Favourites" @click="favourite" ><b class="mi mi-thumb-up"></b></button>
            <button class="btn" @click="toggleVolume" ><b class="mi mi-volume-up"></b></button>
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
        }
    },
    methods:{
        lauchEq(){
             this.$store.commit('setShowSidenav', false);
            this.$router.push("/eq");
        },
        toggleVolume(){},
        favourite(){
            this.$store.commit('saveFavourite',this.track);
        }
    },
    mounted(){
        // document.querySelector('body').style.backgroundImage = `url(file://${this.track.artwork})`;
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
    button{
        width: 50px;
        height:50px;
        display:flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        border-radius:50%;
        background:#000000;
            transform:scale(1, 1);
            transition:0.3s ease-in-out;
        &:hover{
            transform:scale(1.05, 1.05);
        }
    }
    .player{
        backdrop-filter: blur(10px) !important;
        z-index: 5!important;
        position: absolute;
        background: #000000;
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
        width: 620px;
        white-space:nowrap;

    }
</style>