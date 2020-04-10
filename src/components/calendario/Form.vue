<template>
 <v-dialog v-model="dialogState" max-width="500">
       <v-card>
         <v-container>
     <form  @submit.prevent="add">
        <div  class="input-holder">
          <input  required type="text" placeholder="Titulo" v-model="get.name" />
        </div>

        <div class="input-holder">
          <date-picker required :placeholder="'Data de Inicio'"  v-model="get.start" /> 
        </div>
        <div class="input-holder">
          <date-picker  required  :placeholder="'Data Final'" v-model="get.end" /> 
        </div>
        <div class="input-holder">
          <textarea placeholder="Descrição " rows="4"  v-model="get.details" ></textarea>
        </div>
        <div class="input-holder">
          <color-picker @colorPicked="selectColor" v-model="get.color"/>
        </div>
          <v-btn type="submit" color="primary" class="mr-4" @click.stop="ShowModal">
  Criar Evento
</v-btn>
        </form>
       
 </v-container>
       </v-card>

     </v-dialog>
       
      
</template>

<script>
  import ColorPicker from './ColorPiker';
  import DatePicker from 'vuejs-datepicker';
export default {
components:{DatePicker,ColorPicker },
data () {
      return {
        time: null,
        menu2: false,
        modal2: false,
      }
    },
computed:{
  
     get(){
     return  this.$store.state.calendario.evento
     
     },
    dialogState:{

           get(){
             return  this.$store.state.calendario.dialog
           },
           set(){
             this.$store.commit('ShowModal', false) 
           }
    }
      
    

},
methods:{
    add(){
      this.$emit('AdicionarEvento');
     //this.$emit('incrementar',this.name+this.details+this.start+this.end+this.color )
      },

   selectColor(color){
    return this.get.color = color
   },

ShowModal(){
  if(this.get.name &&  this.get.start && this.get.end){
     this.$store.commit('ShowModal', false)  
  }
}
}
}
</script>

<style>
 form {
      display: flex;
      flex-direction: column;
      margin-left: 30px;
    }
    .input-holder {
      margin: 10px 0;
      display: flex;
      justify-content: flex-start;
    }
    .vdp-datepicker {
      width: 100%;
    }
    .vdp-datepicker > div > input {
      width: 77%;
    }
    .input-holder > button {
      justify-self: center;
      padding: 12px 25px;
      border-radius: 0;
      text-transform: uppercase;
      font-weight: 600;
      background: orangered;
      color: white;
      border: none !important;
      font-size: 14px;
      letter-spacing: -0.1px;
      cursor: pointer;
    }
    input,
    textarea {
      padding: 12px 15px;
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-radius: 0;
      width: 70%;
      opacity: 0.8;
      font-size: 15px;
      font-weight: normal;
      border:none;
    }
    input:focus,
    textarea:focus,
    button:focus {
      border: 2px solid orangered;
      outline: none;
      box-shadow: 0 2px 3px 1px rgba(0, 0, 0, 0.2);
    }
</style>