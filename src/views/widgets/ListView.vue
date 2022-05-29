<template lang="html">
    <div class="">
       <p @click="this.$emit('queuePlay',[list,index])"  v-bind:key="index" v-for="(list,index) in queueList">
             <!-- <b class="material-icons mi-dehaze"></b> -->
               <img :src="`file://${list.artwork}`" class="cover"/> &nbsp; &nbsp;
             <!-- {{(list.data.name).replace(".mp3","")}} -->
            <span>{{list.title}}</span>
            &nbsp; &nbsp;
            <span >{{list.genre}}</span> 
             &nbsp;
            <span>{{list.artist}}</span>
          </p>
      </div>
          <!-- <button @click="this.$emit('closeQueue')"><b class="material-icons mi-close"></b></button> -->
</template>
<script>
export default {
    name:"GridView",
    props:{
        queueList:Array,
    },
}
</script>
<style lang="scss" scoped>
     p{
        .cover{
     width:45px;
     height: 45px;
     border-radius:10px;
     box-shadow: -3px -2px 1px 0px #eee;
   }
      width:700px;
      line-height: -20px;
      // box-shadow: -4px -0px 0px 0px #eeee;
      background:rgba($color: #948E8E, $alpha:0.4);
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
       box-shadow: -4px 0px 0px 0px #eeee,
                   4px 0px 0px 0px #eeee;
                          // transform:scale(1.01,1.01);
        background:rgba($color: #CABCBC, $alpha:0.3);
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
    @media(max-width: 960px){
        p{
           .cover{
     width:40px;
     height: 40px;
     border-radius:10px;
     box-shadow: -3px -2px 1px 0px #eee;
   }
      width:400px;
      line-height: -20px;
      // box-shadow: -4px -0px 0px 0px #eeee;
      background:rgba($color: #948E8E, $alpha:0.4);
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
       box-shadow: -4px 0px 0px 0px #eeee,
                   4px 0px 0px 0px #eeee;
                          // transform:scale(1.01,1.01);
        background:rgba($color: #CABCBC, $alpha:0.3);
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