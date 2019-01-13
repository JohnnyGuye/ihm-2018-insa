Vue.component('feed-event', {
    props: ['event', 'assoSrv'],
    data() {
      return {
        detailsEvt: null,
        contactAsso: null,
        showModal: false,
        showContact: false,
        segment: "description",
        assos: Injector.resolve( "AssoService" ).assos,
        nav: Injector.resolve( "Navigation" )
      }
    },
    methods: {
      openOption (event)
      {
      
        event.stopPropagation();

        var vue = this;

        var moreOptionBtn = event.target;
        var moreOptionMenu = moreOptionBtn.nextElementSibling;

        if ( moreOptionMenu.style.display == "block")
        {
          moreOptionMenu.style.display = "none";
        }
        else
        {

          document.body.addEventListener("click", function()
          {

             moreOptionMenu.style.display="none";
         }, 
         {
            one: true
         });

          var moreOptionMenus = document.getElementsByClassName('moreOptionMenu');
          for (var i = 0; i < moreOptionMenus.length; i++)
          {
            var moreOptionMenu2 = moreOptionMenus[i];
            moreOptionMenu2.style.display="none";
          }   

          moreOptionMenu.style.display = "block";

          moreOptionMenu.addEventListener("click", function(event)
          {
            event.stopPropagation();
          });
        }
      },

      classOptionsEvent (option)
      {
        var event = this.event;
        var asso = event.asso;
        var hide = this.assoSrv.isHide(event.asso);

        switch(option)
        {
          case 0: 
            return {
              "redTextINSA optionUnfollow" : event.importance == 2,
              "greyTextINSA optionFollow" : event.importance == 1,
              "resgisteredEvt" : event.importance == 3,
              "hideOption" : event.importance <= 0
            }
         break;

          case 1:
          return {
             "greyTextINSA optionHide" : event.importance == 1,
             "redTextINSA optionUnhide" : event.importance == 0,
             "hideOption" :  event.importance<0 || event.importance>1 || hide
          }

          break;

          case 2:
          return {
             "hideOption" : event.importance > 1,
             "greyTextINSA optionHideA" : !hide,
             "redTextINSA optionUnhideA" : hide
          }

          break;
        } 
      },

      followEvent()
      {
        var event = this.event;
        if (event.importance == 1)
        {
          event.importance = 2;
        }
        else if (event.importance == 2)
        {
          event.importance = 1;
        }
      },

      hideEvent()
      {
        var event = this.event;
        if (event.importance == 1)
        {
          event.importance = 0;
        }
        else if (event.importance == 0)
        {
          event.importance = 1;
        }
      },

       hideAssoEvent()
      {
        var event = this.event;
        var asso = event.asso;
        if (this.assoSrv.isHide(asso))
        {
          this.assoSrv.showAsso(asso);
          event.importance = 1;
        }
        else 
        {
         this.assoSrv.hideAsso(asso);
         event.importance = -1;
         
        }
      },

      openModal( ) {
        this.detailsEvt = this.event;
        this.showModal = true
      },
      openContact( ) {
        var assoName = this.event.asso;
        this.contactAsso = this.assoSrv.getAsso(assoName);
        this.showContact = true
      },
      getMatchingAssoEvents( asso ) {
        return Injector.resolve( "EventService" ).getMatchingAssoEvents( asso.name )
      }

    },
    template:
    `
    <div>
      <v-card  >
        <v-card-title primary-title>
          <div style="width:100%" >
            <h3 class="headline mb-0">{{event.name}}</h3>
            <div>{{event.asso}}</div>
            <div class="moreOption"  v-on:click="openOption">...</div>
            <div class="moreOptionMenu" style="display:none">
              <hr />
              <div class="followEvtOpt"  v-on:click="followEvent()" v-bind:class="classOptionsEvent(0)"></div>
              <div class="HideEvtOpt" v-on:click="hideEvent()" v-bind:class="classOptionsEvent(1)"></div>
              <div class="HideEvtAssoOpt"  v-on:click="hideAssoEvent()" v-bind:class="classOptionsEvent(2)"></div>
              <div class="ShowDetEvt" v-on:click="openModal( )">&nbsp;Plus de détails</div>
              <div class="ContAsso"  v-on:click="openContact(event.asso)">&nbsp;Contacter l'organsiateur</div>
            </div>
          </div>
        </v-card-title>
        <v-responsive>
          <v-img v-bind:src="event.imageURI"></v-img>
        </v-responsive>
      </v-card>

       <!-- Modal of details event -->
        <modal-page v-bind:shown="showModal" v-on:close="showModal = $event" v-if="detailsEvt">

          <div class="container">
            <div class="row">

              

              <div class="col col-9">
                <h3>{{ detailsEvt.name }}</h3>
              </div>

            </div>
          </div>

          <div class="segments">
            <button class="segment" v-bind:class="{ active: segment == 'description' }" v-on:click="segment = 'description'">Description</button>
            <button class="segment" v-bind:class="{ active: segment == 'pics' }" v-on:click="segment = 'pics'">Photos</button>
          </div>

          <div class="container-fluid">
            <div v-if="segment == 'description'" v-html="detailsEvt.description" style="overflow-y: scroll">
            </div>

            <div v-if="segment == 'events'" style="overflow-y: scroll">
              <feed-event v-for="evt of detailsEvtEvents" v-bind:key="evt.name" v-bind:event=evt></feed-event>
            </div>
          </div>

        </modal-page>

        <!-- Modal of contact association -->
      <modal-page v-bind:shown="showContact" v-on:close="showContact = $event" v-if="contactAsso">
        <div class="container">
          <div class="row">

            <div class="col col-3">
              <img v-bind:src="contactAsso.logoURI" height="60" width="60">
            </div>

            <div class="col col-9">
              <h3>{{ contactAsso.name }}</h3>
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
      </div>
    `
})