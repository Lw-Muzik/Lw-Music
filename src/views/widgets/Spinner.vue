<template lang="html">
    <div class="flex flex-col justify-around items-center">
         <div
         style="border-top-color:transparent"
        class="w-16 h-16 border-4 border-blue-400 border-solid rounded-full animate-spin"></div>
        <span>{{text}}</span>
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