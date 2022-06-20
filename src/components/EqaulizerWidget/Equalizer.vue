<template>

<div class="widget">

      <div class="flex flex-row justify-center items-center">
          <div>
        <button class="mi mi-arrow-left text-2xl" @click="navigateBack" ></button>

              <p class=" rotate-180 text-4xl font-extrabold m-5">Eqaulizer
            </p>
                <hr class=" w-5/6"/>
          </div>

         <div class="equalizer mx-20 py-8">
            
            <Bands 
                :key="index"
                :id="index"
                :frequency="band.frequency.value"
                :bandValue="update[index]"
                v-for="(band,index) in bandSet"
                />
        </div>
      </div>
       
        <P class="text-2xl text-center font-extrabold space-x-7 tt">EQ Presets & Tones</P>

    <div class="more">
           <div class="cont sm:w-8/12 grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
          
             <div :class="[color == true? 'active':'','card flex flex-col justify-around items-center']" @click="choose(p.value)" v-for="p in presets" :key="p" >
                <b class="mi mi-equalizer"></b>
               {{p.name}}
            </div>
        </div>
        <br>
<!-- Tone settings -->
            <div class="tone">
                    <!-- <h1>Tone tuning</h1> -->
            
                <tones :toneTitle="`Bass`" :current="_bass" @onUpdate="updateBass"/>
                <br>
                <br>
                
                <tones :toneTitle="`Treble`" :current="_treble" @onUpdate="trebleUpdate"/>
                <!-- <p>
                        <b>Bass {{Number((_bass/7)*100).toFixed(1)}} dB</b>&nbsp;&nbsp;&nbsp;
                    <input type="range" @input="updateBass" max="7" min="0" step="0.001" v-model="_bass"/>

                    </p>
                    <p>
                    <b>Treble {{Number((_treble/7) * 100).toFixed(1)}} dB</b>&nbsp;&nbsp;&nbsp;
                        <input type="range" @input="trebleUpdate" max="7" min="0" step="0.001" v-model="_treble"/>
                    </p> -->
            </div>
    </div>
</div>

</template>

<script>
import Bands from "./Bands.vue";
import Tones from "./Tones.vue";
import slider from "../widget/slider.vue";
import { Presets } from "../../Core/Presets";
export default {
    name: 'EqaulizerComponet',
    components:{  Bands,slider, Tones },
    data(){
        return{
            color: false,
            _bass:this.$store.getters.getBassB,
            _treble:this.$store.getters.getTrebleB,
            preset:this.$store.getters.getEqPreset,
            update:this.$store.getters. getCurrentEq, //this.$store.getters.getCurrentEq,
            presets:[
                {
                'name':"Normal",
                'value':'normal'
                },{
                'name':"Bass",
                'value':'bass'
                },{
                'name':"Bass & Treble",
                'value':'bt'
                },{
                'name':"Extreme Bass",
                'value':'maxbass'
                },{
                'name':"Rock",
                'value':'rock'
                },{
                'name':"Classic",
                'value':'classic'
                },{
                'name':"Soft bass",
                'value':'soft_b'
                },{
                'name':"Dance",
                'value':'dance'
                },{
                'name':"Pop",
                'value':'pop'
                },{
                'name':"Soft Treble",
                'value':'soft_t'
                },{
                'name':"Treble",
                'value':'treble'
                },{
                'name':"Reggea",
                'value':'reg'
                },{
                'name':"Techno",
                'value':'tec'
                },{
                'name':"Loud",
                'value':'loud'
                },{
                'name':"Live",
                'value':'live'
                },{
                'name':"Flat",
                'value':'flat'
                },{
                'name':"Folk",
                'value':'folk'
                }
            ]
        }
    },
    props: {
        bandSet:Array,
    },
    methods:{
        eqBand(bands,array){
            this.update = array;
            this.$store.commit('updateCurrentEq',array);
            // console.log(array)
            for (let index = 0; index < bands.length; index++) {
                bands[index].gain.value = array[index];
                this.out = array[index];
                
            }
        },
        trebleUpdate(treble){
            this.$store.commit('tuneTreble',treble);
        },
        updateBass(bass){
            this.$store.commit('tuneBass',bass);
        },
       
        updateBand(value){
            console.log(value);
            switch (value) {
                case 'normal':
                    this.eqBand(this.bandSet,Presets.Normal);
                    break;
                case 'maxbass':
                    this.eqBand(this.bandSet,Presets.BassMax);
                    break;

                    case 'bass':
                    this.eqBand(this.bandSet,Presets.Bass);
                    break;
                    case 'soft_b':
                    this.eqBand(this.bandSet,Presets.SoftBass);
                    break;
                    case 'classic':
                    this.eqBand(this.bandSet,Presets.Classic);
                    break;
                    case 'rock':
                    this.eqBand(this.bandSet,Presets.Rock);
                    break;
                    case 'pop':
                    this.eqBand(this.bandSet,Presets.Pop);
                    break;
                    case 'soft_t':
                    this.eqBand(this.bandSet,Presets.SoftTreble);
                    break;

                      case 'treble':
                    this.eqBand(this.bandSet,Presets.Treble);
                    break;
                    case 'tec':
                    this.eqBand(this.bandSet,Presets.Techno);
                    break;
                    
                    case 'reg':
                    this.eqBand(this.bandSet,Presets.Reggae);
                    break;

                    case 'flat':
                    this.eqBand(this.bandSet,Presets.Flat);
                    break;

                    case 'folk':
                    this.eqBand(this.bandSet,Presets.Folk);
                    break;

                    case 'loud':
                    this.eqBand(this.bandSet,Presets.Loud);
                    break;

                    case 'bt':
                    this.eqBand(this.bandSet,Presets.BassTreble);
                    break;

                      case 'dance':
                    this.eqBand(this.bandSet,Presets.Dance);
                    break;

                      case 'live':
                    this.eqBand(this.bandSet,Presets.Live);
                    break;
            
                default:
                    break;
            }
           
        },
        navigateBack(){
            this.$router.back();
        },
         choose(choice){
            if ((this.preset == choice)) {
                this.color = (this.preset == choice);
            } else {
                this.color = false;
            }
            this.$store.commit('setEqPreset',choice)
            this.preset = choice;
            this.updateBand(choice);
        },
    },
    computed: {
        bass(){
            return this.$store.getters.getBass;
        },
        treble(){
            return this.$store.getters.getTreble;
        },
    },
    mounted() {
        this.updateBand(this.preset);
        console.log(this.bass)
        this.bass.gain.value = this._bass;
        this.treble.gain.value = this._treble;
    },
}
</script>

<style lang="scss" scoped>
    @import "@/Design/Equalizer.scss";
    .card{
        color: #fff;
        font-size: 20px;
        margin:14px;
        border: 1px solid #ccc;
        padding: 10px;
        transition:0.3s ease-in-out;
        border-radius: 10px;
        cursor: pointer;
        &:hover{
            background:#575c61;
        }
        &.active{
              background:#75b2f7;
        }
    }
    h1{ font:300 26px Ubuntu,Arial; color:#eee; }
    hr{ color: #ddd!important; }
    .tone{ 
         transform:rotate(-90deg);
         margin-right: 49px;
    }
    .cont { width:600px; 
    height:260px; 
    overflow-y:scroll;
    &::-webkit-scrollbar{
        appearance: none;
        width: 5px;
        background: #666;
    }
      &::-webkit-scrollbar-thumb{
        appearance: none;
        width: 6px;
        background: #ddd;
    }
    }
    button{ 
        font-size:39px;
        background: #444;
        border-radius: 100px;
    }
</style>