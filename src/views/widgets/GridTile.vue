<template lang="html">
    <div class="tile flex flex-col items-center">
        <img class="active" :src="`file://${art}`" alt=""/>
        <div class="details">
            <!-- <details class="details"> -->
                <span class="title">{{title}}</span><br>
                <span class="title">{{artist}}</span> 
        <!-- </details> -->
        </div>
    </div>
</template>
<script>
export default {
    name:"GridTile",
    props:{ art:String, artist:String, title:String ,circle:Boolean },
    
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
        // background: #ddd;
        border-radius: 10px;
    }
        img{
            border-radius: 10%;
            object-fit:cover;
            width: 200px;
            height:200px;
            transform: scale(1.0,1.0);
            transition: 0.3s ease-in-out;
            &.active{ border-radius: 10px;}
        }
        &:hover img{
            transform: scale(1.1,1.1);
        }
    }
</style>