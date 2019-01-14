Vue.component('feed', {
    data() {
      console.log(Injector.resolve("AssoService"));
      return { events: Injector.resolve( "EventService" ).events,  assoSrv: Injector.resolve("AssoService")}
    },
    template:
    `
    <base-layout>

      <div slot="header">
        <searchbar></searchbar>
      </div>

      <v-container fluid grid-list-lg style="padding: 0">
         <v-layout row wrap>
             <v-flex xs12 v-for="evt in events" v-bind:data="evt" v-bind:class="{hideOption : assoSrv.isHide(evt.asso) || evt.importance<=0}" v-bind:key="evt.name">
                <feed-event v-bind:event=evt  v-bind:assoSrv=assoSrv></feed-event>
             </v-flex>
         </v-layout>
      </v-container>
      <hr />
    </base-layout>
    `
})
