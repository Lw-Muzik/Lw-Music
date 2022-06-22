<template lang="html">
    <div>
        <audio-slider
        class="p-2"
             :progress="update"
              :currentTime="curlTime"
               :duration="`-${durlTime}`"
                @updateProgress="changeProgress"
                 :max="progMax"
                 />
    </div>
</template>
<script>
import AudioSlider from "./input.vue";
export default {
    name:'PlayerSlider',
    components:{ AudioSlider },
    data() {
        return {
            audio:null,
            update:0,
            progress:0,
            progMax:0,
            min:0,
           curlTime:"0:00",
           durlTime:"0:00",
        }
    },
    created() {
        this.audio = this.$store.getters.getPlayer;
        this.dur = this.audio.duration;
    },
    methods: {
        changeProgress(value){
            this.audio.currentTime = value;
        }
    },
    mounted(){
        setInterval(()=>{
           this.update = this.audio.currentTime;
          this.progMax = this.audio.duration;
        },500);

         this.audio.ontimeupdate = ()=>{
      /**Display the track's current time */
       const min = Math.floor((this.audio.currentTime / 60) % 60)
       const sec = Math.floor(this.audio.currentTime % 60 );
       this.curlTime = sec < 10 ? min+":0"+sec:min+":"+sec;
/**Display the track duration */
       const dmin = Math.floor(((this.audio.duration - this.audio.currentTime) / 60) % 60)
       const dsec = Math.floor((this.audio.duration - this.audio.currentTime) % 60 );
       this.durlTime = dsec < 10 ?dmin+":0"+dsec:dmin+":"+dsec;
         }
    }
}
</script>
<style lang="scss" scoped>

</style>