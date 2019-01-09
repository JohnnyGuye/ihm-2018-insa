Vue.component('feed-event', {
    props: ['event'],
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

      classOptionsEvent (event, option)
      {
        var assoService = Injector.resolve( [ "AssoService" ] )[0];
        switch(option)
        {
          case 0: 
            return {
              "redINSA optionUnfollow" : event.importance == 2,
              "greyINSA optionFollow" : event.importance == 1,
              "resgisteredEvt" : event.importance == 3,
              "hideOption" : event.importance == 0


            }
         break;

          case 1:
          console.log(event.importance);
          return {
             "hideOption" : event.importance > 1,
             "greyINSA optionHide" : event.importance == 1,
             "redINSA optionUnhide" : event.importance == 0,
             "hideOption" : event.importance == -1
          }

          break;

          case 2:
          var asso = event.asso;
          var hide = assoService.isHide(event.asso);
          return {
             "hideOption" : event.importance > 1,
             "greyINSA optionHideA" : !hide,
             "redINSA optionUnhideA" : hide
          }

          break;
        } 
      },

      followEvent(event)
      {
        if (event.importance == 1)
        {
          event.importance = 2;
        }
        else if (event.importance == 2)
        {
          event.importance = 1;
        }
      },

      hideEvent(event)
      {
        if (event.importance == 1)
        {
          event.importance = 0;
        }
        else if (event.importance == 0)
        {
          event.importance = 1;
        }
      },

       hideAssoEvent(event, ok)
      {

        var assoService = Injector.resolve( [ "AssoService" ] )[0];
        var asso = event.asso;
        if (assoService.isHide(asso))
        {
          event.importance = 0;
          assoService.showAsso(asso);
        }
        else 
        {
          event.importance = -1;
         assoService.hideAsso(asso);
        }

      }

    },
    template:
    `
    <v-card>
      <v-card-title primary-title>
        <div style="width:100%">
          <h3 class="headline mb-0">{{event.name}}</h3>
          <div>{{event.asso}}</div>
          <div class="moreOption"  v-on:click="openOption">...</div>
          <div class="moreOptionMenu" style="display:none">
            <hr />
            <div class="followEvtOpt"  v-on:click="followEvent(event)" v-bind:class="classOptionsEvent(event,0)"></div>
            <div class="HideEvtOpt" v-on:click="hideEvent(event)" v-bind:class="classOptionsEvent(event,1)"></div>
            <div class="HideEvtAssoOpt"  v-on:click="hideAssoEvent(event)" v-bind:class="classOptionsEvent(event,2)"></div>
            <div class="ShowDetEvt">Plus de détails</div>
            <div class="ContAsso">Contacter l'organsiateur</div>
          </div>
        </div>
      </v-card-title>
      <v-responsive>
        <v-img v-bind:src="event.imageURI"></v-img>
      </v-responsive>
    </v-card>
    `
})