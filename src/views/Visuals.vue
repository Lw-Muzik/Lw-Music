<template lang="html">
    <div class="visual">
       <canvas class="w-full h-full" ref="canvas"></canvas>
       <div class="w-full  z-10 fixed top-16 p-5 flex flex-row  row-span-2">
            <div class="w-full flex flex-row row-span-2">
                <img :src="`file://${track.artwork}`" class=" w-40 border border-solid" />
                <br>
                <br>
                <br>
                <p class="text-white m-10 text-xl">&nbsp;&nbsp;&nbsp;&nbsp;<i> Now Playing &nbsp;{{track.title}}</i> <br>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<i>by {{track.artist}}</i>
                  
                </p>
               
             
                </div>
            <div class="w-96 m-5" >
                <Dropdown class="w-54 container"
               @choice="chooseVisual"/>
               <button @click="close" class="w-3/5 p-3 text-lg hover:scale-50 m-5 border-2 border-solid border-black rounded-md bg-black text-white text-center">close</button>
            </div>
       </div>
      
    </div>
</template>
<script>
import { Visualizer } from "@/Core/Visualizer";
// import { image } from "@/Core/default";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
export default {
    name:"Visuals",
    components:{ Dropdown },
    data() {
        return {
            canavs:null,show:false,
            vise:null,
            context:null
        }
    },
    methods: {
        chooseVisual(eventValue){
         switch(parseInt(eventValue)){
           case 1:
             this.vise.barsVisualiser();
             break;
             case 2:
               this.vise.dustyParticles()
               break;
             case 3:
               this.vise.histogramVisualiser()
               break;

             case 4:
               this.vise.sineWaveVisualiser()
               break;
             case 5:
               this.vise.rippleWaveVisualiser()
               break;
              
             case 6:
               this.vise.glassTilesVisualiser()
               break;
              
             case 7:
               this.vise.floatingBars()
               break;

                case 8:
               this.vise.colorstetchVisualiser()
               break;
         }
     },
     togglePlay(){
            this.show = !this.show;
            if (this.currentSong != null) {
                this.player.src = this.currentSong.data;
                
            }
            this.player.play();
        },
        close(){
            this.$store.commit("setVisual",true);
            console.log("Visual click")
        }
    },
    computed:{
        currentSong(){
            return this.$store.getters.getCurentSong;
        },
        current(){
           return this.$store.getters.getCurrentData;
       },
       songD(){
           return this.$store.getters.getSongData;
       },
        eq(){
            return this.$store.getters.getEqualiser;
        },
        track(){
            return this.$store.getters.getMusicData;
        },
        player(){
            return  this.$store.getters.getPlayer;
        }
    },
    mounted() {
         /**  Canvas */
      this.canvas = this.$refs['canvas'];
      this.context = this.$refs['canvas'].getContext("2d");
  
      this.vise = new Visualizer(this.eq.analyser,this.canvas,this.context);
    },
}
</script>
<style lang="scss" scoped>
    .visual{
        width: 100%;
        height:100%;
        position: fixed;
        z-index:-1;
        background:#0000007c;
        top: 0;left: 0;
        backdrop-filter:blur(10px);
    }
   p{
    button{ font-size:30px;}
   } 
</style>