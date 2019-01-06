Vue.component(
  'assos-list', {
    data() {
      return {
        selectedAsso: null,
        selectedAssoEvents: [],
        showModal: false,
        showContact: false,
        segment: "description",
        assos: Injector.resolve( "AssoService" ).assos,
        nav: Injector.resolve( "Navigation" )
      }
    },
    methods: {
      openModal( asso ) {
        this.selectedAsso = asso
        this.selectedAssoEvents = this.getMatchingAssoEvents( asso )
        this.showModal = true
      },
      openContact( ) {
        this.showContact = true
      },
      getMatchingAssoEvents( asso ) {
        return Injector.resolve( "EventService" ).getMatchingAssoEvents( asso.name )
      }
    },
    template:
    `
    <base-layout>

      <div slot="header">
        Assos
      </div>

      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="asso in assos">
          <div class="row">
            <div class="col col-2" style="padding: 0">
              <div class="profile-image">
                <v-img v-bind:src="asso.logoURI"></v-img>
              </div>
            </div>
            <div class="col col-6" v-on:click="openModal( asso )">
              {{ asso.name }}
            </div>
            <div class="col col-4" style="padding-right: 0">
              <button class="followable" v-bind:class="{ unfollow: !asso.followed }" v-on:click="asso.followed = !asso.followed"></button>
            </div>
          </div>
        </li>
      </ul>

      <!-- Modal of selected association -->
      <modal-page v-bind:shown="showModal" v-on:close="showModal = $event" v-if="selectedAsso">

        <div class="container">
          <div class="row">

            <div class="col col-3">
              <img v-bind:src="selectedAsso.logoURI" height="60" width="60">
            </div>

            <div class="col col-9">
              <h3>{{ selectedAsso.name }}</h3>
              <div class="row">
                <div class="col col-6">
                  <button class="asso-insight" v-on:click="openContact()">Contacter</button>
                </div>
                <div class="col col-6">
                  <button class="followable" v-bind:class="{ unfollow: !selectedAsso.followed }" v-on:click="selectedAsso.followed = !selectedAsso.followed"></button>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="segments">
          <button class="segment" v-bind:class="{ active: segment == 'description' }" v-on:click="segment = 'description'">Description</button>
          <button class="segment" v-bind:class="{ active: segment == 'pics' }" v-on:click="segment = 'pics'">Photos</button>
          <button class="segment" v-bind:class="{ active: segment == 'events' }" v-on:click="segment = 'events'">Evènements</button>
        </div>

        <div class="container-fluid">
          <div v-if="segment == 'description'" v-html="selectedAsso.description" style="overflow-y: scroll">
          </div>

          <div v-if="segment == 'events'" style="overflow-y: scroll">
            <feed-event v-for="evt of selectedAssoEvents" v-bind:event=evt></feed-event>
          </div>
        </div>

      </modal-page>

      <!-- Modal of contact association -->
      <modal-page v-bind:shown="showContact" v-on:close="showContact = $event" v-if="selectedAsso">
        <div class="container">
          <div class="row">

            <div class="col col-3">
              <img v-bind:src="selectedAsso.logoURI" height="60" width="60">
            </div>

            <div class="col col-9">
              <h3>{{ selectedAsso.name }}</h3>
            </div>

          </div>

          <div class="row" style="padding: 5px;">
            <h4 style="width: 100%">Formulaire de contact</h4>
            <br/>
            <p>Objet :</p>
            <input class="form-control" style="width: 100%" type="text" placeholder="J'aimerais m'inscrire"/>
            <p>Message :</p>
            <textarea  class="form-control" placeholder="Mais je ne sais pas où trouver l'asso" style="width: 100%; min-height: 40vh"></textarea>
          </div>

          <div class="row text-center">
            <button class="btn btn-sm btn-outline-secondary text-center" style="margin:auto">Envoyer</button>
          </div>
        </div>

      </modal-page>




    </base-layout>
    `
})
