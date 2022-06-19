<template lang="html">
    <div class="actions w-full pr-0 mr-0 flex flex-row justify-around items-center">
        <div class="volume flex flex-row justify-center items-center">
        <p class="flex flex-row justify-center items-center"> <span :class="[volume == 0?'mi mi-volume-off':[volume < 0.5?'mi mi-volume-down':'mi mi-volume-up'],'p-3']"></span> <input type="range" step="0.01" max="1" min="0" v-model="volume" @input="updateVol"/> <span class="p-2" >{{parseInt(volume*100)}}%</span> </p> 
        </div>

        <div class="controls flex flex-row justify-around items-center p-4 w-56">
            <button class="btn p-2 " @click="this.$emit('shuffleTrack')"><b class="mi mi-shuffle"></b></button>
            <button class="btn p-2" @click="this.$emit('prevTrack')" ><b class="mi mi-graphic-eq"></b></button>
            <button class="btn p-2" @click="this.$emit('prevTrack')" ><b class="mi mi-equalizer"></b></button>
            <button class="btn p-2" @click="this.$emit('prevTrack')" ><b class="mi mi-repeat"></b></button>
        </div> 
    </div>
    
</template>
<script>
export default {
    name:'Actions',
    data() {
        return {
            volume:0,
            volIcon:false
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
        width: 200px;
    }
</style>