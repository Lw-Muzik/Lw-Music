<template>
    <div class="body">
        
              <!-- <p>Discover</p> -->
             <input type="text" class="input"/>
       
                <button>View</button>
        
      
    </div>
</template>

<script>
export default {
    name:'Top',
    data() {
        return {
            
        }
    },
}
</script>
<style lang="scss" scoped>
.body{
    margin: 10px;
    width: 100%;
    display: flex;
    flex-direction: row!important;
    justify-content: space-around!important;
    align-items: center!important;
    button{
        width: 100px;
        height:40px;
        background: #222;
        color: #fff;
        
    }
      input{
          border-radius: 20px;
          padding: 5px;

          width: 300px;
        border: 1px solid #ddd;
    }
}
  
</style>