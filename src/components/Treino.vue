<template>
 <div>
        <b-table hover striped :items="items" :fields="fields">
              
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="alert(data.item)" class="mr-2">
                    <i class="fa fa-pencil">ddddddddddddd</i>
                </b-button>                
            </template>
        </b-table>
  </div>

</template>

<script>
export default {
data(){
    return{

         items: [
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ],
         fields: [
                { key: 'age', label: 'Código', sortable: true },
                { key: 'first_name', label: 'Nome', sortable: true },
                { key: 'last_name', label: 'E-mail', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
    }
}
}
</script>

<style>

</style>