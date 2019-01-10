Vue.component('feed-event', {
    props: ['event', 'assoSrv'],
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
    },
    template:
    `
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
            <div class="ShowDetEvt">&nbsp;Plus de détails</div>
            <div class="ContAsso">&nbsp;Contacter l'organsiateur</div>
          </div>
        </div>
      </v-card-title>
      <v-responsive>
        <v-img v-bind:src="event.imageURI"></v-img>
      </v-responsive>
    </v-card>
    `
})