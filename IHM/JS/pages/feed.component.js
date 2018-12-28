Vue.component('feed', {
    data() {
      return { events: Injector.resolve( "EventService" ).events }
    },
    template:
    `
    <base-layout>

      <div slot="header">
        News feed
      </div>

      <template slot="footer">
        <button class="icon-btn icon-home active" onclick="nav.navigate('feed')"></button>
        <button class="icon-btn icon-calendar" onclick="nav.navigate('calendar')"></button>
        <button class="icon-btn icon-list" onclick="nav.navigate('assos')"></button>
        <button class="icon-btn icon-tool" onclick="nav.navigate('options')"></button>
      </template>

      <v-container fluid grid-list-lg style="padding: 0">
         <v-layout row wrap>
             <v-flex xs12 v-for="evt in events" v-bind:key="evt.name">
                <feed-event v-bind:event=evt></feed-event>
             </v-flex>
         </v-layout>
      </v-container>

    </base-layout>
    `
})
