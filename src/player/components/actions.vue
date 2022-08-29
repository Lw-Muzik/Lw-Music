<template lang="html">
    <div class="actions w-full pr-0 mr-0 flex flex-col justify-around items-center">
        <!-- <div class="volume flex flex-row justify-center items-center">
        <p class="flex flex-row justify-center items-center"> <span :class="[volume == 0?'mi mi-volume-off':[volume < 0.5?'mi mi-volume-down':'mi mi-volume-up'],'p-3']"></span> <input type="range" step="0.01" max="1" min="0" v-model="volume" @input="updateVol"/> <span class="p-2" >{{parseInt(volume*100)}}%</span> </p> 
        </div> -->
        <player-slider class=" w-4/6 px-8 mx-4"/>
        <!-- action controls -->
        <div class="flex flex-row justify-between items-center">
            <button class="p-2 btn" @click="prevTrack" ><b class="mi mi-fast-rewind"></b></button>
    
                <button class="p-2 play" v-show="!show" @click="togglePlay"><b class="mi mi-play-arrow"></b></button>
           
                <button  class="p-2 pause" v-show="show"  @click="togglePause"><b class="mi mi-pause"></b></button>

            <button class="p-2 btn" @click="seektrack"><b class="mi mi-fast-forward"></b></button>
        </div>
        <!-- end of action controls  -->
    </div>
</template>
<script>
import PlayerSlider from "./slider.vue";
export default {
    name:'Actions',
    data() {
        return {
            volume:0,
             show:false,
            volIcon:false,
            nowID:0,
            now:[],
            player:null,
        }
    },
        components:{ PlayerSlider },
     computed: {
        track(){
            return this.$store.getters.getMusicData;
        },
       current(){
           return this.$store.getters.getCurrentData;
       },
        currentSong(){
            return this.$store.getters.getCurentSong;
        },
    },
    methods:{
        updateVol(){
            this.$store.commit('setVolume',this.volume);
        },
        togglePlay(){
            this.show = !this.show;
            if (this.currentSong != null) {
                this.player.src = this.currentSong.data;
                
            }
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
    created() {
        this.volume = this.$store.getters.getVolume;
    },
}
</script>
<style lang="scss" scoped>
    input{
        width: 200px;
    }
       input{
            appearance:none;
            height:2px;
            width:230px;
          &::-webkit-slider-thumb{
              width:23px;
              height:18px;
              border-radius: 5px;
              cursor: pointer;
              border:1px solid #ddd;
              appearance:none;
              background: #3739B4;
          }
        }
</style>