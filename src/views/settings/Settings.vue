<template lang="html">
  <center>Settings</center>
  <spinner :text="msg" v-if="!loader"/>
  
    <div class="p-5 m-6 grid grid-flow-col grid-cols-2"  v-if="loader">
        <div class="m-5 p-5">
          <fieldset class="border-2 rounded-md">
            <legend class="p-2 text-lg">Equalizer Settings</legend>
        <br>
       <p class="p-5" >Bass Frequency:&nbsp;&nbsp; <input type="range" step="1" max="150" min="10" @input="modifyBassFreq" v-model="bFreq">&nbsp;&nbsp;&nbsp; {{bFreq}}Hz</p>
       <!-- <hr>  -->
       <p class="p-5" >Bass Quality:&nbsp;&nbsp; <input type="range" step="0.01" max="3" min="-1" @input="modifyBassQ" v-model="bQ">&nbsp;&nbsp;&nbsp; {{Number(bQ).toFixed(2)}}dB</p>
       <!-- <hr> -->
       <p class="p-5">Treble Quality: &nbsp;&nbsp;&nbsp;&nbsp;<input type="range" step="0.01" max="3" min="-1" @input="modifyTrebleQ" v-model="tQ">&nbsp;&nbsp;{{Number(tQ).toFixed(2)}} dB</p>
       <!-- <hr> -->
       <p class="p-5">Master Gain:&nbsp;&nbsp; <input type="range" step="0.01" max="3" min="0" @input="modifyGain" v-model="gain"/> {{Number(gain).toFixed(2)}}dB </p>
       <!-- <hr> -->
       <p class="p-5" >Playback rate: &nbsp;&nbsp;<input type="range" step="0.01" max="3" min="-1.6" @input="modifySpeed" v-model="speed"> {{Number(speed).toFixed(2)}}</p>
    <br>
    </fieldset> 
     </div>
       
       <div class="m-5 p-5 w-60">

        <fieldset  class="border-2 rounded-md">
            <legend  class="p-2 text-lg">Add music folder</legend>
            <add-folder @tapp="refresh"/>
        </fieldset>
       </div>
    
    </div>
</template>
<script>
    import { ipcRenderer, remote } from 'electron';
import Spinner from "@/views/widgets/Spinner.vue";
import AddFolder from "../widgets/addFolder.vue";
import Slider from '../../components/slider/slider.vue';
export default {
    name: "Settings",
    components: { Slider, AddFolder, Spinner },
    data() {
        return {
            bQ:0,
            loader:true,
            bFreq:10,
            gain:0,
            speed:0,
            tQ:0,
            msg:""
        }
    },
    methods:{
        refresh(){
            this.loader = false;

            ipcRenderer.send("refresh");

            ipcRenderer.on("loadingSongs",(e,args)=>{
                this.msg = args;
            });

            ipcRenderer.on("donerefreshing",(e,q)=>{
            this.loader = true;

            })
        },
        modifyBassFreq(){
            this.$store.commit('setBassQ',this.bFreq);
        },
           modifyBassQ(){
            this.$store.commit('setBassQ',this.bQ);
        },
        modifyTrebleQ(){
             this.$store.commit('setTrebleQ',this.tQ);
        },
        modifySpeed(){
             this.$store.commit('setSpeed',this.speed);
        },
        modifyGain(){
             this.$store.commit('setGain',this.gain);
        },
    },
    mounted() {
        this.bFreq = this.$store.getters.getBassFreq;
        this.bQ = this.$store.getters.getBassQ;
        this.tQ = this.$store.getters.getTrebleQ;
        this.speed = this.$store.getters.getSpeed;
        this.gain = this.$store.getters.getGain;

    },
}
</script>
<style lang="scss" scoped>
    input[type="range"]{
  outline:none;
  width:300px;
  appearance:none;
  height:2px;
 &::-webkit-slider-thumb{
  width: 30px;
  height:30px;
  border-radius:50%;
 }
}
hr{
    height: 1px !important;
    background: #222 !important;
}
</style>