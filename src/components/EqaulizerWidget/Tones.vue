<template>
    <div class="bands rotate-180">
        <span class="label">
            {{toneTitle}}
            <!-- {{(frequency > 500)?frequency.toString().replace("000","k"):frequency}}Hz -->
        </span>
             <input type="range" v-model="current" @input="updateBand" max="10" min="0" step="0.01">
        <span class="label">{{Number((parseInt(current)/10)*100).toFixed(1)}} dB</span>
   
    </div>
</template>

<script>
export default {
    name: 'Tones',
    data() {
        return {
            bandValue:0,
        }
    },
    props: {
        current:Number,
        toneTitle:String,
    },
    methods: {
        updateBand(){
           this.$emit('onUpdate',this.current);
        }
    }
}
</script>

<style lang="scss" scoped>
.bands{
        display:flex;
        
        flex-direction: row;
        justify-content: space-around;
        padding: 18px;
        //  transform:rotate(-90deg);
        width:300px;
        .label{
            transform:rotate(90deg);
            margin:5px;
            
            }
        .label:last-child{
            width: 50px;
            white-space:nowrap;
            font:300 14px Ubuntu;
            }

             .label:first-child{
            font:700 19px Ubuntu;
            color:#ddd;
            }
        input{
            appearance:none;
            height:2px;
            width:430px;
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
        //   &::-webkit-slider-thumb
    }
@media(max-width:910px) {
    .bands{
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        padding: 7px;
        width:300px;
        margin: 6px;
        .label{
            transform:rotate(90deg);
            margin:10px;
            
            }
        .label:last-child{
            font:300 12px Ubuntu;
            }

             .label:first-child{
            font:300 11px Ubuntu;
            color:#ddd;
            }
        input{
            appearance:none;
            height:2px;
            width:130px;
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
        //   &::-webkit-slider-thumb
    }
}
</style>

