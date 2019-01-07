Vue.component('feed-event', {
    props: ['event'],
    template:
    `
    <v-card>
      <v-card-title primary-title>
        <div>
          <div class="moreOption">...</div>
          <h3 class="headline mb-0">{{event.name}}</h3>
          <div>{{event.asso}}</div>
          <ul class="moreOptionMenu">
            <li class="followEvtOpt">Suivre l'événement</li>
            <li class="HideEvtOpt">Masquer l'événement</li>
            <li class="HideEvtAssoOpt">Masquer les événements de {{event.asso}}</li>
            <li class="ShowDetEvt">Plus de détails</li>
            <li class="ContAsso">Contacter l'organsiation</li>
          </ul>
        </div>
      </v-card-title>
      <v-responsive>
        <v-img v-bind:src="event.imageURI"></v-img>
      </v-responsive>
    </v-card>
    `
})
