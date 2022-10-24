<template lang="html">
    <div>
        <p class="flex flex-row justify-around items-center">
           <span> {{currentTime}}</span>
     &nbsp;&nbsp;
        <input 
            type="range"
             step="0.01" 
             :max="Number(max)" 
                min="0" v-model="progress" 
                @input="updateSlider"/>
     &nbsp;&nbsp;
              <span> {{duration}}</span>
                     </p>
    </div>
</template>
<script>

export default {
    name:'AudioSlider',
    props:{
        progress:Number,
        currentTime:String,
        duration:String,
        max:Number,
    },
    data() {
        return {
            audio:null,
        }
    },
    created() {
        this.audio = this.$store.getters.getPlayer;
    },
    methods: {
        updateSlider(){
          this.$emit('updateProgress',this.progress);
        },
    },
}
</script>
<style lang="scss" scoped>
        input{
        appearance:none;
        background: #222;
        width:100%;
        height: 5px;
        // overflow:hidden;
        &::-webkit-slider-thumb{
            appearance:none;
            width: 15px;
            height:15px;
            // margin-right: 500000vh!important;
            background: #f1bb09;
            border-radius: 50%;
        }
    }
</style>