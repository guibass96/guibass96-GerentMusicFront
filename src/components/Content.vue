<template>
 
   <div class="content">    
       <v-app>
    <v-content>
      <Calendar />
    </v-content>
  </v-app>
      
   </div>
    
 
</template>

 <script>
 
   
   //  import axios from 'axios'
    //import Pusher from 'pusher-js';
    import Calendar from './Calendar'
    
    export default {
     
     components:{Calendar}
      
    
     }
</script>
<style>
.content{
    grid: content;
    background-color: #efefef;
    
}
</style>