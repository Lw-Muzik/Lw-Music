<template lang="html">
    <br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <div class="flex flex-col justify-around items-center">
         <div
         style="border-top-color:transparent"
        class=" w-20 h-20 border-8 border-white border-double  rounded-full animate-spin"></div>
       <br/>
       <br/>
        <b class="text-2xl bold text-center w-full"> Loading {{text}}, please wait..</b>
    </div>
<!-- <div>
    <div style="border-top-color:transparent"
        class="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
</div>
<div>
    <div style="border-top-color:transparent"
        class="w-16 h-16 border-4 border-blue-400 border-dotted rounded-full animate-spin"></div>
</div>
<div>
    <div style="border-top-color:transparent"
        class="w-16 h-16 border-4 border-blue-400 border-double rounded-full animate-spin"></div>
</div> -->
</template>
<script>
export default {
    name:'Spinner',
    props:{
        text:String
    }
}
</script>
<style scoped>

</style>