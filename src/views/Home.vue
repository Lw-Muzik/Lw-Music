<template lang="html">
    <div class="text-white">
        <b class=" text-4xl text-white">{{userGreeting()}}</b>
        <p>Daily Mix just for you</p>
        <Grid :items="recents" />
    </div>
</template>
<script>
import Layout from "./widgets/Layout.vue";
// import Grid from "./widgets/Gen/Grid.vue";
import Grid from "./widgets/Gen/Grid.vue";
export default {
    name:'Home',
    components:{
    Layout,
    Grid,
    Grid
},
    data() {
        return {
            title:"Daily Mix",
            subtitle:"Daily Mix just for you",
            songs:[],
            recents:[],
            artist:[],
            album:[],
            showPlay:true
        }
    },
    mounted(){
        
           this.recents = this.$store.getters.getRecentPlays;
        console.log(this.$store.getters.getRecentPlays)
    },
    methods:{
        userGreeting(){
            var date = new Date();
            var hrs = date.getHours();
            var msg  = '';
            if (hrs >= 16 && hrs < 19) {
               msg = 'Hi ,Good Evening'
            } else if (hrs > 20){
                msg = 'Good Night'
            } else if (hrs == 0 || hrs < 12){
                msg = 'Good Morning'
            } else if (hrs >= 13  || hrs < 16){
                msg = 'Good Afternoon'
            }
            return msg;
        }
    }
}
</script>
<style lang="scss" scoped>
    
</style>