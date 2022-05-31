<template lang="html">
    <div>
        <input 
            type="range"
             step="0.01" 
             :max="Number(dur)" 
                min="0" v-model="progress" 
                @input="updateSlider"/>
    </div>
</template>
<script>
export default {
    name:'AudioSlider',
    props:{
        progress:Number
    },
    data() {
        return {
            audio:null,
            dur:0,
        }
    },
    created() {
        this.audio = this.$store.getters.getPlayer;
        this.dur = this.audio.duration;
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
        overflow:hidden;
        &::-webkit-slider-thumb{
            appearance:none;
            width: 10px;
            height:100vh;
            background: #0743b3;
        }
    }
</style>