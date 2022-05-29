<template lang="html">
    <div class="flex justify-center items-center">
        <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
         <span class="visually-hidden">{{text}}</span>
  </div>
</div>
</template>
<script>
export default {
    name:'Spinner',
    props:{
        text:String
    }
}
</script>