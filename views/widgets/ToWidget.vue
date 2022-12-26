<template lang="html">
    <div ref="intro" class="introArt sticky flex flex-row  items-center w-full h-32">
          <div class="art w-32 h-32" >
              <img :src="`file://${cover}`" class="object-cover w-full h-full"/>
          </div>
          <div class="labels p-5">
            <p class=" font-semibold p-4 text-3xl" >{{label == undefined?'':label.replace(/(.*)[\/\\]/,"").split('.')[0]}}</p>
            <b class="p-3">Total Songs {{total}}</b>
             <div class=" cursor-pointer flex flex-row justify-center items-center p-3 m-4 bg-black rounded-lg h-10" @click="goBack">
                <p> &lt; Back</p>
            </div>
          </div>
        </div>
        <br>
</template>
<script>
export default {
    name:'TopWidget',
    props:{
        label:String,
        cover:String,
        total:Number
    },
    methods: {
         goBack(){
             this.$store.commit('setGenreBack',false);
            this.$router.back();
        }
    },
    mounted(){
        this.$refs['intro'].style.backgroundImage = 'url(file://'+this.cover+')';
        console.log(this.$refs['intro'].style.backgroundImage)
    }
}
</script>
<style lang="scss" scoped>
    
    .introArt{ background: linear-gradient(180deg,#0000001f,#222);
        backdrop-filter: blur(20px);
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position: center;
      .labels{ color:#fff; 
       b{
          font: 300 16px Ubuntu,Arial;
        }
      }
    }
</style>