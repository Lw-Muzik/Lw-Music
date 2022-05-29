<template lang="html">
    <div class="tile flex flex-col items-center">
        <img v-if="art != undifined" :src="`file://${art}`" alt=""/>
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
    props:{ art:String, artist:String, title:String  }
}
</script>
<style lang="scss" scoped>
    .tile{
    .title{ 
        white-space: nowrap; 
        text-overflow: ellipsis;
         width:80px;
          overflow: hidden; 
          font:400 15px Ubuntu,Arial; 
          margin: 2px;
        }
        width: 170px;
        height: 200px;
        border-radius: 10px;
        overflow:hidden;
        margin: 10px;
        transition: 0.3s ease-in-out;
        border: 0.5px solid #fff;

    .details{
        // position: absolute;
        width: 150px;
        margin-bottom: 15px;
        background: #ddd;
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
        &:hover{
           background:#ddd;
        }
    }
</style>