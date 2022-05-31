<template lang="html">
    <div class="volume flex flex-row justify-center items-center">
       <p>Volume: <input type="range" step="0.01" max="1" min="0" v-model="volume" @input="updateVol"/> {{volume}} </p> 
    </div>
    <div>
        <button class="btn" @click="this.$emit('shuffleTrack')"><b class="mi mi-shuffle"></b></button>
       <button class="btn" @click="this.$emit('prevTrack')" ><b class="mi mi-fast-rewind"></b></button>
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
    
</style>