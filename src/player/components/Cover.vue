<template lang="html">
    <div class="ui flex flex-row justify-evenly items-center">
        <div class=" w-24 h-10 flex flex-col justify-center items-center rounded-2xl">
            <img v-if="track.artwork != null" :src="`file://${track.artwork}`" class="p-4 rounded-2xl object-cover"/>
            <img v-else :src="defaultCover" class="p-4 rounded-2xl object-cover"/>
        </div>
        <div class="flex p-5 flex-row justify-between items-center ">
            <button class="p-2 btn" @click="this.$emit('prevTrack')" ><b class="mi mi-fast-rewind"></b></button>
    
                <button class="p-2 play" v-show="!show" @click="togglePlay"><b class="mi mi-play-arrow"></b></button>
           
                <button  class="p-2 pause" v-show="show"  @click="togglePause"><b class="mi mi-pause"></b></button>

            <button class="p-2 btn" @click="this.$emit('seektrack')"><b class="mi mi-fast-forward"></b></button>
        </div>

        <div class="content">
            <b class="title">{{track.title}}</b>&nbsp;
            <p class="artist">{{track.artist}}</p>
         </div>
    </div>
  
</template>
<script>
export default {
    name:'TrackCover',
    data() {
        return {
            show:false,
            player:null,
            defaultCover:''
        }
    },
    computed: {
        track(){
            return this.$store.getters.getMusicData;
        }
    },
    methods: {
        togglePlay(){
            this.show = !this.show;
            this.player.play();
        },
        togglePause(){
             this.show = !this.show;
             this.player.pause()
        }
    },
    mounted() {
        console.log(this.track);
        this.player =  this.$store.getters.getPlayer;
        this.defaultCover = this.$store.getters.getDefaultCover
        this.player.onpause = ()=>{
            this.show = false;
        }

        this.player.onplay = ()=>{
            this.show = true;
        }
    },
}
</script>
<style lang="scss" scoped>
    button{
        color: #fff;
        b{
            font-size: 30px;
        }
    }

    .play, .pause{
        background: #454544;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        line-height: 10px;
          b{
            font-size: 35px;
        }
    }

    .title{
        font: 500 15px Ubuntu,Arial;
        padding:5px;
    }
    .artist{
        font: 300 14px Ubuntu,Arial;
        font-style: oblique;
        padding:5px;
        text-decoration-style: wavy;
    }
</style>