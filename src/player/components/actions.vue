<template lang="html">
    <div class="volume flex flex-row justify-center items-center">
       <p>Volume: <input type="range" step="0.01" max="1" min="0" v-model="volume" @input="updateVol"/> {{parseInt(volume * 100)}} % </p> 
       
    </div>
</template>
<script>
export default {
    name:'Actions',
    data() {
        return {
            volume:0,
        }
    },
    methods:{
        updateVol(){
            this.$store.commit('setVolume',this.volume);
        }
    },
    created() {
        this.volume = this.$store.getters.getVolume;
    },
}
</script>
<style lang="scss" scoped>
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