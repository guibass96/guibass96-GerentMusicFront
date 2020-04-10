<template>
 <div class="metas">
   <h1>Metas e Estrategias</h1>
  
   <b-form class="w-50"  @reset="onReset" v-if="show">
      <input id="category-id" type="hidden" v-model="id" />
      <b-form-group   id="input-group-3" label="Aluno:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>      
      <b-form-group  
        id="input-group-1"
        label="Pratica:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="form.pratica"
          type="text"
          required
         
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Objetivo:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.objetivo"
          required
         
        ></b-form-input>
      </b-form-group>
  <b-form-group id="input-group-2" label="Descrição:" label-for="input-2">
       
         <textarea v-model="form.descricao" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </b-form-group>

    

      <b-form-group id="input-group-4">
         <b-button class="w-25"  @click="addMeta" variant="primary">Salvar</b-button>
      <b-button  class="w-25 m-3" type="reset" variant="danger">Limpar</b-button>
      </b-form-group>
        </b-form>
      <b-table hover striped :items="items" :fields="fields" 
    :head-variant="headVariant" >
   <template slot="actions" slot-scope="data">
       <b-button variant="warning"  @click="editItem(data.item)" class="mr-2">
                    <b-icon-arrow-up>Editar</b-icon-arrow-up>
                </b-button>
                    <b-button class="w-2" variant="danger" @click="DeleteItem(data.item)">
                   <b-icon-arrow-up>Excluir</b-icon-arrow-up>
                </b-button>
      </template>
    </b-table>
    
  </div>

</template>

<script>
import axios from 'axios'

export default {
data(){
    return{

         items:[],
         fields:[
           {key:'id',label:'codigo'},
           {key:'pratica',label:'Pratica'},
           {key:'objetivos',label:'Objetivos'},
           {key:'descricao',label:'Descrição'},
           {key:'actions',label:'Ações'}
           
         ],
          form: {
          pratica: '',
          objetivo: '',
          descricao:'ss',
          id:'',
          food: null,
          checked: []
        },
        foods: [{ text: 'Selecione Aluno', value: null }, 'Joao', 'Lucas', 'Guilherme'],
        show: true,
        headVariant:'dark'
      }
    },

methods:{
  DeleteItem(item){
  let url =`http://localhost:4000/metas/${item.id}`
    axios.delete(url).then(()=>{
     
     this.reset()
      
    }).catch()
    
    
  },
  editItem(item){
    this.form.pratica = item.pratica
    this.form.objetivo = item.objetivos
    this.form.descricao = item.descricao 
    this.form.id = item.id
    console.log(item)
     
    
  },
  reset(){
     setTimeout(this.items = [], 1000)
      setTimeout(this.getEvents(), 2000)
      
  },
getEvents(){
         /*    const url = `http://localhost:4000/metas`
         return  axios.get(url).then(resp => (resp.data)).catch(()=>{
           console.log("error")
         })  */
          const url = `http://localhost:4000/metas`
         return  axios.get(url).then(resp => (resp.data.map((p,i)=>{
                                          
                        this.items.push(resp.data[i])
             })))
    },
     addMeta() {
        
          const url = this.form.id == null?`http://localhost:4000/metas`:`http://localhost:4000/metas/${this.form.id}`
           const method = this.form.id ? 'put' : 'post'
          axios[method](url,{
                
        pratica:this.form.pratica,
        objetivos:this.form.objetivo,
        descricao:this.form.descricao,
      

          }).then(()=>{
                 this.reset()
           }).catch(()=>{
            console.log('err')
          })
      },
       onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.pratica = ''
        this.form.objetivo = ''
        this.form.descricao = ''
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
},
created(){
  this.getEvents()
}
}
</script>

<style scoped>
h1{
  text-align: center;
}
</style>