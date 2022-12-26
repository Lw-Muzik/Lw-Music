<template lang="html">
   <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400" 
   >
     <tab :title="tab"  v-for="tab in tabs" :key="tab"/>
    </ul>
</div>
</template>
<script>
import Tab from './Tab.vue'
export default {
    name: "TabView",
    data() {
        return {
            tabs: [
                "Equalizer",
                "Tones",
                "Presets"
            ]
        };
    },
    components: { Tab },
}
</script>
<style lang="scss" scoped>
    
</style>