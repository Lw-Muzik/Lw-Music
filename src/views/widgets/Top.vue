<template>
  <div class="body">
             <img :src="artWork" class="w-40 m-1" />
        <div class="flex flex-row justify-between pt">
       
         <div class="section flex flex-col justify-evenly items-center" >
                    <p>{{title}}</p>
                       <p>
                    <button @click="playAll" class="mi mi-play-arrow"></button> &nbsp;
                    Play All
                    </p>
            </div>
    <!-- navigations -->
        <div class="navs">
            <br>
            <br>
            <br>
            <button @click="back" class="mi mi-arrow-left text-6xl"></button>
            &nbsp; &nbsp;
            <button  @click="forward" class="mi mi-arrow-right"></button>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Top',
    props:{
        artWork:String,
        songData: Array,
        title:String
    },
    data() {
        return { }
    },
    methods: {
        back(){
             this.$router.back();
            this.$store.commit('setGenreBack',false);
        },
        playAll(){
            this.$store.commit('audioPlayer',this.songData);
        },
        forward(){
            this.$router.go(1);
            // this.$store.commit('setGenreBack',false);
        }
    }
}
</script>
<style lang="scss" scoped>

.body{
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: row!important;
     backdrop-filter: blur(20px);
     color: #fff;
    // justify-content: center!important;
    // align-items: center!important;
    .section{
        color: #fff;
    }
    button{
        width: 50px;
        height:50px;
        border-radius: 50%;
        background: #222;
        color: #fff;
    }
    .navs button{
        font-size: 3em;
    }
}
  .pt{
    width: 50%;
  }
</style>