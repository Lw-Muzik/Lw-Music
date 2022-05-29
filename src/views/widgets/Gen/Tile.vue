<template lang="html">
    <div class="tile flex flex-col items-center" @click="gotoTrack(title)">
        <img :src="`file://${cover}`" alt=""/>
        <div class="details flex flex-row justify-around">
            <!-- <details class="details"> -->
                <span class="title flex flex-row justify-around">{{title}}</span> 
                <span class="badge">{{total}}</span>
        <!-- </details> -->
        </div>
    </div>
</template>
<script>
export default {
    name:"Tile",
    props:{  title:String , total:Number, cover:String },
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
            padding:2px;
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
        width: 170px;
        padding:3px;
        margin-bottom: 15px;
        background: #ddd;
        border-radius: 10px;
    }
        img{
            border-radius: 50%!important;
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
        // &:hover{
        // //    background:#ddd;
        // }
    }
</style>