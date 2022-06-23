<template lang="html">
    <div class="tile flex flex-col items-center" @click="gotoTrack(title)">
        <img :src="`file://${cover}`" alt=""/>
        <div class="details flex flex-row justify-between">
            <!-- <details class="details"> -->
                <span class="title capitalize flex p-2 flex-row justify-around">{{title.replace(/(.*)[\/\\]/,"").split('.')[0]}}</span> 
                <span class="badge p-2">{{total}}</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"Tile",
    props:{  title:String , total:Number, cover:String, round: Boolean },
    methods:{
        gotoTrack(route){
            this.$store.commit('setGenreCat',route);
           this.$emit('routeGenre');
        }
    }
}
</script>
<style lang="scss" scoped>
    .tile{
        .badge{
            background:#222;
            color: #fff;
            font: 400 15px Ubuntu,Arial;
            margin:5px 1px 0px;
            border-radius: 5px;
            z-index: 7!important;
            // position:absolute;

        }
    .title{ 
        white-space: nowrap; 
        text-overflow: ellipsis;
         width:130px;
          overflow: hidden; 
          font:400 15px Ubuntu,Arial; 
          margin: 2px;
        }
        width: 170px;
        height: 200px;
        z-index: 5!important;
        border-radius: 10px;
        overflow:hidden;
        margin: 10px;
        transition: 0.3s ease-in-out;
        // border: 0.5px solid #fff;

    .details{
        z-index: 10!important;
        width: 150px;
        padding:3px;
        line-height:20px;
        margin-bottom: 15px;
        // background: #ddd;
        border-radius: 10px;
    }
        img{
            border-radius: 10px!important;
            object-fit:cover;
            width: 200px;
            height:200px;
            transform: scale(1.0,1.0);
            transition: 0.3s ease-in-out;
            // position: fixed;
        }
        &:hover img{
            transform: scale(1.1,1.1);
        }
    }
</style>