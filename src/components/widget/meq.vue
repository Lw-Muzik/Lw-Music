<template lang="html">
    <div class="container">
  <div class="everlib-logo">
    <i class="everlib-logo-first-bar"></i>
    <i class="everlib-logo-second-bar"></i>
    <i class="everlib-logo-third-bar"></i>
    <i class="everlib-logo-fourth-bar"></i>
  </div>
</div>

</template>
<script>
export default {
    name:"Meq"
}
</script>

<style lang="scss" scoped>
    .container {
  margin-top: 50px;
  text-align: center;
}
.everlib-logo {
  display: inline-block;
  cursor: pointer;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
  .everlib-logo-first-bar,
  .everlib-logo-second-bar,
  .everlib-logo-third-bar,
  .everlib-logo-fourth-bar {
    display: inline-block;
    width: 9px;
    margin: 0;
    padding: 0;
    transition: .5s;
    animation: equalize 4s 0s infinite;
    animation-timing-function: linear;
    vertical-align: top;
    background: #e23a15;
  }
  
  .everlib-logo-first-bar {
    height: 40px;
    transition: 0.5s;
    animation-delay: -1.9s;
  }
  
  .everlib-logo-second-bar {
    height: 48px;
    animation-delay: -2.9s;
  }
  
  .everlib-logo-third-bar {
    height: 44px;
    animation-delay: -3.9s;
  }
  
  .everlib-logo-fourth-bar {
    height: 36px;
    animation-delay: -4.9s;
  }

@keyframes equalize {
  0% {
    height: 48px;
  }
  4% {
    height: 42px;
  }
  8% {
    height: 40px;
  }
  12% {
    height: 30px;
  }
  16% {
    height: 20px;
  }
  20% {
    height: 30px;
  }
  24% {
    height: 40px;
  }
  28% {
    height: 10px;
  }
  32% {
    height: 40px;
  }
  36% {
    height: 48px;
  }
  40% {
    height: 20px;
  }
  44% {
    height: 40px;
  }
  48% {
    height: 48px;
  }
  52% {
    height: 30px;
  }
  56% {
    height: 10px;
  }
  60% {
    height: 30px;
  }
  64% {
    height: 48px;
  }
  68% {
    height: 30px;
  }
  72% {
    height: 48px;
  }
  76% {
    height: 20px;
  }
  80% {
    height: 48px;
  }
  84% {
    height: 38px;
  }
  88% {
    height: 48px;
  }
  92% {
    height: 20px;
  }
  96% {
    height: 48px;
  }
  100% {
    height: 48px;
  }
}

</style>