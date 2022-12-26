<template>
    <span>
        <label :class="[col==true?'active':'','tile']" @click="tapHandler">
            <span :class="leading"></span>
            {{title}}
            <div></div>
            <!-- <input type="radio" name="sidebar" v-model="index" id="side"/> -->
        </label>
    </span>
</template>
<script>
export default {
    name:'ListTile',
    props:{
        index:Number,
        id:Number,
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
        font-size: 17px;
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