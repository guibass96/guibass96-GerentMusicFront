export default ({
      state:{
        evento:{name:'',
        start:'',
        end:'',
        details:'',
        color:''
    },
    dialog:false    
    },
    mutations:{
        resetState(state){
            state.evento.name = ''
            state.evento.start = ''
            state.evento.end = ''
            state.evento.details = ''
            state.evento.color = ''
        },
        ShowModal(state,payload){
          state.dialog = payload
        }
       
    },
    actions:{
        ShowModal1({commit},payload){
                        commit(payload)
           
            
        }
    }
})