<template lang="html">
    <div>
          <li class="mr-2">
            <a href="#" class="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-green-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                <!-- <svg class="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg> -->
                {{title}}
            </a>
        </li>
    </div>
</template>
<script>
export default {
    name:'Tab',
    props:{
        title:String
    }
}
</script>
<style lang="scss" scoped>
    
</style>