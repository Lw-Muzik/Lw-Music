<template lang="html">
    <div class="ui flex flex-row justify-between items-center">
        <div v-if="track != null" @click="this.$emit('onTap')" class="w-36 h-13 flex flex-col justify-center items-center rounded-2xl">
            <img :src="`file://${track.artwork}`" class="w-full drop-shadow rounded-2xl"/>
            <!-- <img v-else :src="defaultCover" class="p-4 rounded-2xl object-cover"/> -->
        </div>
        <!-- else if null  -->
          <!-- <div  class="w-36 h-13 flex flex-col justify-center items-center rounded-2xl">
            <img :src="`file://${csong.artwork}`" class="w-full drop-shadow rounded-2xl"/>
            <img v-else :src="defaultCover" class="p-4 rounded-2xl object-cover"/> -->
        <!-- </div> -->
<!-- spacer div --> 
 <div class="p-3"></div>
<!-- end of spacer div -->
<!-- if track is null lets get what was played before -->
        <div class="content max-w-3xl mx-2">
            <b class="title">{{csong == null ?track.title:csong.title}}</b>&nbsp;
            <p class="artist">{{csong == null ?track.artist:csong.artist}}</p>
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
       },
        csong(){
            return this.$store.getters.getCurentSong;
        },
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
        console.log(`Current ${this.$store.getters.getCurentSong}`)
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
        font: 500 17px Ubuntu,Arial;
        white-space: nowrap!important;
        //  background: green;
          text-overflow: ellipsis;
        overflow:hidden;
         position: relative;
        width: 100px!important;
       

    }
    .artist{
        font: 300 15px Ubuntu,Arial;
        font-style: oblique;
        padding:5px;
        text-decoration-style: wavy;
    }
     }

    
    .ui{   overflow: hidden;}
</style>