<template lang="html">
    <div>
        <room-effects :delays="rooms[1]" :feedback="rooms[0]"/>
    </div>
</template>
<script>
import RoomEffects from "../../../components/Room/Room.vue";
export default {
    name:"Room",
    components:{ RoomEffects },
    computed: {
        rooms(){
            return [
                this.$store.getters.getFeedback,
                this.$store.getters.getDelays,
            ]
        }
    }

}
</script>
<style lang="scss" scoped>
    
</style>