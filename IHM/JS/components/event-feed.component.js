Vue.component('feed-event', {
    props: ['event'],
    methods: {
      openOption (event)
      {
        
        var vue = this;

        var moreOptionBtn = event.target;
        var moreOptionMenu = moreOptionBtn.nextElementSibling;
        var display = moreOptionMenu.style.display;
        console.log(display);
        if (display == "block")
        {
          moreOptionMenu.style.display = "none";

          

        }
        else
        {
          console.log("2 " + display);

          moreOptionMenu.style.display = "block";

          moreOptionBtn.addEventListener("mousedown", function(event)
          {
             /*var moreOptionMenus = document.getElementsByClassName('moreOptionMenu');
             for (var i = 0; i < moreOptionMenus; i++)
             { 
              moreOptionMenus[i].display="none";
             } */

            event.stopPropagation();
          },
          { 
            once: true
          });

          moreOptionMenu.addEventListener("mousedown", function(event)
          {
            event.stopPropagation();
          },
          { 
            once: true
          });

          document.body.addEventListener("mousedown", function()
          {
            moreOptionMenu.style.display="none";
           },
          { 
            once: true
          });
        }
      }
    },
    template:
    `
    <v-card>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{event.name}}</h3>
          <div>{{event.asso}}</div>
          <div class="moreOption"  v-on:click="openOption">...</div>
          <ul class="moreOptionMenu" style="display:none">
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
