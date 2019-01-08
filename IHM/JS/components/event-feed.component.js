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
          <ul class="moreOptionMenu" style="display:none">
            <hr />
            <li class="followEvtOpt" v-bind:class="{ unfollow: event.importance=1 }"   v-on:click="event.importance =1+event.importance ">Suivre l'événement</li>
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
