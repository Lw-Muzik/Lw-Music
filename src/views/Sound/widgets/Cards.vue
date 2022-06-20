<template lang="html">
        <div class="card" @click="loadPreset(route)">
            <div class="icon">
                <b :class="icon"></b>
            </div>
           {{name}}
        </div>
</template>
<script>
export default {
    name:"Cards",
    props:{
        name:String, icon:String, route:String
    },
    methods:{
        loadPreset(path){
            // console.log(path)
            this.$router.push(path);
        }
    }
}
</script>
<style lang="scss" scoped>
    .card{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        border: 1px solid rgba(221, 221, 221, 0.24);
        width: 200px;;
        color: rgba(221, 221, 221, 0.24);
        width: 200px;
        height: 200px;
        cursor: pointer;
        margin: 15px;
        border-radius: 5px;
        transition: 0.3s ease-in-out;
        box-shadow: -1px -1px 1px 0px #dddd;
        font: 500 19px Ubuntu,Arial;
            .icon b{
                font-size: 60px;
            }
            &:hover{
        border: 1px solid #ffff;
                box-shadow: -3px -3px 1px 0px #ffff;
            }
    }
</style>