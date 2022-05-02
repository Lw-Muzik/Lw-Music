<template lang="html">
  <div class="body">
    <div id="equalizer">
      <span class="color-1"></span>
      <span class="color-2"></span>
      <span class="color-3"></span>
        <h2>B-labs Musix</h2>
    </div>
    <Link to="">Player</Link>
    <p>Enjoy the power of music </p>
        <button @click="proceedToInitial" >Procced</button>

  </div>
  <!-- <router-view></router-view> -->
</template>
<script>
export default {
  name:'App',
  methods:{
    proceedToInitial(){
      console.log("click")
       this.$router.push('/player');
    }
  }
}
</script>
<style lang="scss" scoped>
  button{
        width: 200px;
        outline:none;
        height: 40px;
        font: 400 18px Ubuntu,Arial;
        background-color: transparent;
        border-radius: 5px;
        background: linear-gradient(to right,rgba(132, 201, 100, 0.466),#3ace1c);
        color: #ddd;
        cursor:url("./assets/shot1.png"), auto;
        border: 1px solid #3ace1c;
    }
  @import "./Design/initial.scss";
</style>