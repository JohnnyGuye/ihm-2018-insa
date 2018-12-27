Vue.component('feed', {
    data() {
      return { events: Injector.resolve( "EventService" ).events }
    },
    template:
    `
    <v-container fluid grid-list-lg style="padding: 0">
       <v-layout row wrap>
           <v-flex xs12 v-for="evt in events" v-bind:key="evt.name">
              <feed-event v-bind:event=evt></feed-event>
           </v-flex>
       </v-layout>
    </v-container>
    `
})
