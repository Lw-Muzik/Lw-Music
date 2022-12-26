<template>
    <div class="container">
            <p v-if="(title.length)<30" class="title">{{(title).replace(".mp3","")}}</p>
            <p v-else class="title">
                <marquee direction="left" scrollamount="2" scrolldelay="5" behavior="scrolling">
                    {{(title).replace(".mp3","")}}
                </marquee>
            </p>
            <!-- <div class="more"> -->
                <span v-if="((album.length) < 30)">
                    
                   <span class="txt"> {{artist}}</span>
                    <span class="bar">|</span>
                   <span class="txt"> {{album}}</span>
                    <span class="bar">|</span>
                    <span class="txt">
                        {{(Number(size).toFixed(2))+" MB"}}
                    </span>
                </span>
<!-- Aniamate the bigger text -->
                <marquee direction="left" scrollamount="6" scrolldelay="12" behavior="scrolling" v-else class="more">
                   <span class="txt"> {{artist}}</span>
                    <span>|</span>
                   <span class="txt">{{album}} </span>
                    <span>|</span>
                    <span class="txt">
                        {{(Number(size).toFixed(2))+" MB"}}
                    </span>
                </marquee>
                <br>
                <br>
            <!-- </div> -->
            <!-- <marquee behavior="scrolling" direction="alternate"></marquee> loop='3'-->
    </div>
</template>

<script>
export default {
    name: 'Details',
    props: {
        title:{
            type:String,
            default:"Track title"
        },
        artist:{
            type:String,
            default:"Artist"
        },
        album:{
            type:String,
            default:"Album"
        },
        size:{
            type:Number,
            default:0
            },
    },
}
</script>

<style lang="scss" scoped>

 .container{
        display:flex;
        margin: 10px;
        flex-direction:column;
        justify-content:center;
        align-items:center;
         .txt{
             width: 200px;
        font:300 25px Ubuntu,Arial!important;
        color: #fff!important;
        margin: 10px!important;
    }
    .bar{
        font:100 29px Ubuntu,Arial!important;
    }
        .title{
            width:500px;
            text-align:center!important;
            // overflow:hidden;
            white-space: nowrap;
            // text-overflow: ellipsis;
            font:100 45px Ubuntu,Arial!important;
        }
        .more{
            margin: 10px;
            width: 600px;
            font:300 17px Arial!important;
        }
       
        
    }
@media(max-width:810px){
     .container{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        .title{
            width:700px;
            text-align:center;
            // overflow:hidden;
            white-space: nowrap;
            // text-overflow: ellipsis;
            font:100 17px Ubuntu,Arial;
        }
        
    }
}
   @media(max-width:480px){
        .container{
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        margin: 0;
        padding: 0;
        .title{
            width:300px;
            text-align:center;
            // overflow:hidden;
            white-space: nowrap;
            // text-overflow: ellipsis;
        }
        p{
            font:300 17px Ubuntu;
            span{
            font-size: 20px;
           }
        }
        
    }
   }
</style>