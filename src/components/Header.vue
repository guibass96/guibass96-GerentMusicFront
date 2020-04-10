<template>
  <div class="header">
    <div class="to-do">
      Gerent Music
    </div>
  </div>
</template>

<script>
export default {
name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style>
*{
  margin: 0;
}
.header{
    grid-area: header;
    background:#344E99;
    
    display: flex;
   
    align-items:center;
      justify-content: center;
      
}
 .header>.to-do{
  width: 100px;;
  height: 100%;
  color:white;
  justify-self: flex-end;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  margin-left: 3%;
}
</style>