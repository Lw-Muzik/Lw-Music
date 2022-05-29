<template>
    <span>
        <span :class="[col==true?'active':'','tile']" @click="tapHandler">
            <span :class="leading"></span>
            {{title}}
            <span></span>
        </span>
    </span>
</template>
<script>
export default {
    name:'ListTile',
    props:{
        leading:String,
        title:String,
    },
    data() {
        return {
            col:false
        }
    },
    methods:{
        tapHandler(){
            this.$emit('onTap');
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .tile{
        user-select: none;
        cursor: pointer;
        font-size: 14px;
        display: flex !important;
        flex-direction: row !important;
        justify-content:space-evenly!important;
        width: 100%;
        padding: 10px;
        margin: 2px;
        color: #c0cec067;
        &:hover{
            color:white
        }
        &.active{
            color:white
        }

    }
</style>