Vue.component('feed', {
    props: ['events'],
    template:
    `
    <v-container fluid grid-list-lg>
       <v-layout row wrap>
           <v-flex xs12 v-for="evt in events" v-bind:key="evt.name">
              <feed-event v-bind:event=evt></feed-event>
           </v-flex>
       </v-layout>
    </v-container>
    `
})
