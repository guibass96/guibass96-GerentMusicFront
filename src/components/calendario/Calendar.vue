<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn color="primary" class="mr-4"  @click="ShowModal" dark>
           Novo Evento
          </v-btn>
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
           Hoje
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev" class="mr-4">
            <v-icon small>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next" class="mr-4">
            <v-icon small>mdi-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on }">
              <v-btn
                outlined
                color="grey darken-2"
                v-on="on"
              >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
     <!-- dialog new event -->             
         <forme @AdicionarEvento="addEvent" />  
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :now="today"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card
            color="grey lighten-4"
            min-width="350px"
            flat
          >
            <v-toolbar
              :color="selectedEvent.color"
              dark
            >
              <v-btn @click="deleteEvent(selectedEvent.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-spacer></v-spacer>
             
            </v-toolbar>
            <v-card-text>
              <form v-if="curretlyEditing !== selectedEvent.id">
                {{selectedEvent.details}}
              </form>
              <form v-else>
                <textarea-autosize 
                 v-model="selectedEvent.details"
                 type="text"
                 style="width:100%"
                 :min-height="100"
                 placeholder="Adicionar nota"
                >

                </textarea-autosize>
              </form>
            </v-card-text>
            <v-card-actions>
              <v-btn
                text
                color="secondary"
                @click="selectedOpen=false"
              >
                Fechar
              </v-btn>
              <v-btn
                text v-if="curretlyEditing !== selectedEvent.id"
                @click.prevent="editEvent(selectedEvent)"
              >
                Editar
              </v-btn>
              <v-btn
                text v-else=""
                @click.prevent="updateEvent(selectedEvent)"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>

</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Pusher from 'pusher-js';
import forme from './Form'
export default {
  components:{forme},
data:() => ({
  today:new Date().toISOString().substr(0,10),
  focus:new Date().toISOString().substr(0,10),
  type:"month",
  typeToLabel:{
    month:"Month",
    week:"Week",
    day:"Day",
    "4day":"4 Days"
  },
  name:null,
  details:null,
  start:null,
  end:null,
  color:"#1976D2",
  curretlyEditing:null,
  selectedEvent:{},
  selectedElement:null,
  selectedOpen:false,
  events: [],
  //dialog:this.dialogState()

}),
computed: {
      title () {
        const { start, end } = this
        if (!start || !end) {
          return ''
        }

        const startMonth = this.monthFormatter(start)
        const endMonth = this.monthFormatter(end)
        const suffixMonth = startMonth === endMonth ? '' : endMonth

        const startYear = start.year
        const endYear = end.year
        const suffixYear = startYear === endYear ? '' : endYear

        const startDay = start.day + this.nth(start.day)
        const endDay = end.day + this.nth(end.day)

        switch (this.type) {
          case 'month':
            return `${startMonth} ${startYear}`
          case 'week':
          case '4day':
            return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
          case 'day':
            return `${startMonth} ${startDay} ${startYear}`
        }
        return ''
      },
      monthFormatter () {
        return this.$refs.calendar.getFormatter({
          timeZone: 'UTC', month: 'long',
        })
      },
     get(){
     return  this.$store.state.calendario.evento
     },
     dialogState(){
      return  this.$store.state.calendario.dialog
    }
    },
 mounted(){
this.getEvents()


},
   created(){
        const pusher = new Pusher('ae6ab63bcd59f4609299', {
          cluster: 'us2',
          encrypted: true,
        });
        const channel = pusher.subscribe('schedule');
        channel.bind('new-event', (data) => {
          this.events = [
            ...this.events,
            data
          ];
        })
      }, 
methods: {
  
ShowModal(){
  this.$store.commit('ShowModal', true)  

},
resetstate(){
this.$store.commit('resetState') 
},
      getEvents(){
      
       const url = `http://localhost:4000/agenda`
         return  axios.get(url).then(resp => (resp.data.map((p,i)=>{
                p.start = moment(new Date(p.start)).format('YYYY-MM-DD')
               p.end = moment(new Date(p.end)).format('YYYY-MM-DD')
                           
                        this.events.push(resp.data[i])
             })))
            
            
    },
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.today
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      editEvent(ev){
        this.curretlyEditing = ev.id;
        
      },
      updateEvent(ev){
        this.curretlyEditing = ev.id;
       
           const url = `http://localhost:4000/agenda/${ev.id}`
          axios.post(url,{
         name:ev.name,
         details:ev.details,
         start:ev.start,
         end:ev.end,
         color:ev.color,
          })
            this.selectedOpen=false
         // this.cleanEvents()
      },
      deleteEvent(id){
      
       const url = `http://localhost:4000/agenda/${id}`
          axios.delete(url).then(() => {
             this.getEvents()
          })
                .catch()
          this.selectedOpen = false
              },
   addEvent(){
      if(this.get.name && this.get.start && this.get.end){
         var insert =  this.get
          const url = `http://localhost:4000/agenda`
          axios.post(url,{
                
        name:insert.name,
         details:insert.details,
         start:insert.start,
         end:insert.end,
         color:insert.color,  

          }).then(()=>{
            this.events = []
            this.getEvents()
            this.dialogState = false
            this.resetstate()
          }).catch(()=>{
            console.log('err')
          })
                    
      }else{
        alert("Preencha todas as informações")
        
      }
   },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          setTimeout(() => this.selectedOpen = true, 10)
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          setTimeout(open, 10)
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange ({ start, end }) {
        const events = []

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = this.rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = this.rnd(0, 3) === 0
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            name: this.names[this.rnd(0, this.names.length - 1)],
            start: this.formatDate(first, !allDay),
            end: this.formatDate(second, !allDay),
            color: this.colors[this.rnd(0, this.colors.length - 1)],
          })
        }

        this.start = start
        this.end = end
        this.events = events
      },
      nth (d) {
        return d > 3 && d < 21
          ? 'th'
          : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
      },
}
}
</script>

<style>

</style>