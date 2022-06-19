<template lang="html">
    <div class="ui flex flex-row justify-evenly items-center">
        <div class="w-24 h-24 flex flex-col justify-center items-center">
            <img v-if="track.artwork != null" :src="`file://${track.artwork}`" class="p-4 rounded-3xl w-full h-full object-cover"/>
            <img v-else :src="defaultCover" class="p-4 rounded-full object-cover"/>
        </div>
        <div class="flex flex-row justify-between items-center">
            <button class="p-2 btn" @click="prevTrack" ><b class="mi mi-fast-rewind"></b></button>
    
                <button class="p-2 play" v-show="!show" @click="togglePlay"><b class="mi mi-play-arrow"></b></button>
           
                <button  class="p-2 pause" v-show="show"  @click="togglePause"><b class="mi mi-pause"></b></button>

            <button class="p-2 btn" @click="seektrack"><b class="mi mi-fast-forward"></b></button>
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
            defaultCover:'',
            nowID:0,
            now:[]
        }
    },
    computed: {
        track(){
            return this.$store.getters.getMusicData;
        },
       current(){
           return this.$store.getters.getCurrentData;
       }
    },
    methods: {
        togglePlay(){
            this.show = !this.show;
            this.player.play();
        },
        seektrack(){
            this.nowID += 1;
        },
        prevTrack(){
           this.nowID -= 1;
        },
        togglePause(){
             this.show = !this.show;
             this.player.pause();
        }
    },
    mounted() {
        this.player =  this.$store.getters.getPlayer;
        this.defaultCover = this.$store.getters.getDefaultCover;
        // this.now = this.current[0];
        // this.nowID = this.current[1];

        this.player.onpause = ()=>{
            this.show = false;
        }

        this.player.onplay = ()=>{
            this.show = true;
        }

        this.player.onended = ()=>{
            this.nowID += 1;
            this.player.src = this.now[this.nowID].data;
            this.player.play();
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
    .content{
        width: 350px!important;
        // background: teal;
    .title{
        font: 500 15px Ubuntu,Arial;
        white-space: nowrap!important;
        //  background: green;
          text-overflow: ellipsis;
        overflow:hidden;
         position: relative;
        width: 100px!important;
       

    }
    .artist{
        font: 300 14px Ubuntu,Arial;
        font-style: oblique;
        padding:5px;
        text-decoration-style: wavy;
    }
     }

    
    .ui{ width: 80%;  overflow: hidden;}
</style>