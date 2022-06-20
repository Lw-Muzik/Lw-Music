<template lang="html">
    <div class="listView">
       <p @click="playSong(list,index)"  v-bind:key="index" v-for="(list,index) in queueList">
             <!-- <b class="material-icons mi-dehaze"></b> -->
               <img :src="`file://${list.artwork}`" class="cover"/> &nbsp; &nbsp;
             <!-- {{(list.data.name).replace(".mp3","")}} -->
            <span>{{list.title}}</span>
            &nbsp; &nbsp;
            <span >{{list.genre}}</span> 
             &nbsp;
            <span>{{list.artist}}</span>
  &nbsp;
               <span>{{list.album}}</span>
          </p>
      </div>
          <!-- <button @click="this.$emit('closeQueue')"><b class="material-icons mi-close"></b></button> -->
</template>
<script>
export default {
    name:"ListView",
    props:{
        queueList:Array,
    },
    data() {
      return {
        audio:null,
        j:0
      }
    },
      created(){
         this.audio = this.$store.getters.getPlayer;
    },
    mounted() {
      this.audio.onended = ()=>{
        this.j += 1;
         this.audio.src = this.queueList[this.j].data;
            this.audio.play();
      }
    },
    methods:{
        playSong(track,id){
          this.j = id;
            this.audio.src = track.data;
            this.audio.play();
            this.$store.commit('currentProcess',[this.queueList,id]);
            this.$store.commit('musicData',track);
        }
    },
   }
</script>
<style lang="scss" scoped>
     .listView{ overflow-y:scroll; overflow-x: hidden; height: 460px;
       &::-webkit-scrollbar{
      appearance: none;
      width: 10px;
    }
    
      &::-webkit-scrollbar-thumb{
      appearance: none;
      width: 5px;
      background: #c7c5be;
      border-radius: 10px;
    }
     }
     p{
        .cover{
     width:60px;
     height: 60px;
     border-radius:5px;
     padding:3px;
    //  box-shadow: -1px -2px 1px 0px #eee
   }
      width:100%;
      line-height: -20px;
      color: #eeeeee;
      background:rgba($color: #948E8E, $alpha:0);
      padding: 3px;
      border-radius:5px;
      padding: 4px;
      border-radius:0px;
      display: flex;
      cursor: pointer;
      margin:5px;
      flex-direction:row;
      transition:0.3s ease-in-out;
      transform:scale(1,1);
      justify-content: space-around!important;
      align-items: center;
     &:hover{
       box-shadow: -4px 0px 0px 0px #eeee,
                   4px 0px 0px 0px #eeee;
                          // transform:scale(1.01,1.01);
        background:rgba($color: #CABCBC, $alpha:0.25);
        background:rgba($color: #CABCBC, $alpha:0.2);
     }
     span{
        width: 300px;
        text-align: left;
        font:400 14px Ubuntu,Arial;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    @media(max-width: 960px){
        p{
           .cover{
     width:40px;
     height: 40px;
     border-radius:10px;
     box-shadow: -3px -2px 1px 0px #eee;
   }
      width:100%;
      line-height: -20px;
      // box-shadow: -4px -0px 0px 0px #eeee;
      background:rgba($color: #000000, $alpha:0);
      padding: 4px;
      border-radius:5px;
      display: flex;
      cursor: pointer;
      margin:5px;
      flex-direction:row;
      transition:0.3s ease-in-out;
      transform:scale(1,1);
      justify-content: space-around!important;
      align-items: center;
     &:hover{
                          // transform:scale(1.01,1.01);
        background:rgba($color: #cabcbc31, $alpha:0.3);
     }
     span{
        width: 300px;
        text-align: left;
        font:300 14px Ubuntu,Arial;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    }
</style>