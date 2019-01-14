Vue.component(
  'searchbar',
  {
    data: function() {
      return {
        showAS: false
      }
    },
    methods: {
      openAS() {
        this.showAS = true
      },
      closeAS() {
        this.showAS = false
      }
    },
    mounted() {
      $(document).ready(function(){

      $('#searchbar-icon').click(function(){
        $('#searchbar-input').animate({width: 'toggle'});
        $("#searchbar-icon").toggle();
        $("#searchbar-cross").toggle(500);
      });

      $('#searchbar-cross').click(function(){
        $('#searchbar-input').animate({width: 'toggle'});
        $("#searchbar-cross").toggle();
        $("#searchbar-icon").toggle(500);
      });

    });
    },
    template:
    `
    <div class="searchbar">
      <input type="text" id="searchbar-input">
      <i class="fas fa-search" id="searchbar-icon" aria-hidden="true"></i>
      <i class="fas fa-times" id="searchbar-cross" aria-hidden="true"></i>
      <div class="right-floating">
        <i class="fas fa-filter" v-on:click="openAS()"></i>
      </div>

      <modal-page v-bind:shown="showAS" v-on:close="showAS = $event">
        <div class="container">
          <div class="row" style="padding: 10px;">
            <input type="text" style="border-bottom: 2px black solid; width: 80%">
            <i class="fas fa-search" aria-hidden="true"></i>
          </div>
          <div class="row" style="padding: 10px">
            <input type="checkbox" /><span>Afficher toutes les assos</span>
          </div>
          <div class="row" style="padding: 10px">
            <input type="checkbox" /><span>Evènements payants</span>
          </div>

          <div class="row" style="padding: 10px">
            <div>Types d'évènement</div>
          </div>
          <div class="row" style="padding: 10px">
            <div style="max-height: 100px; overflow-y: scroll; width: 100%;">
              <ul>
                <li>Culture<input type="checkbox" checked/></li>
                <li>Jeu<input type="checkbox" checked/></li>
                <li>Musique<input type="checkbox"/></li>
                <li>Scientifique<input type="checkbox"/></li>
                <li>Sport<input type="checkbox"/></li>
                <li>Technologie<input type="checkbox" checked/></li>
              </ul>
            </div>
          </div>

          <div class="row" style="padding: 10px;">
            Dates : <br/>
            <span>
              Du <input type="date" value="2019-01-14"/> à
              <select>
                <option>0h</option>
                <option>2h</option>
                <option>4h</option>
                <option>6h</option>
                <option>8h</option>
                <option>10h</option>
                <option>12h</option>
                <option>14h</option>
                <option>16h</option>
                <option>18h</option>
                <option>20h</option>
                <option>22h</option>
              </select>
              <br/>
              Au <input type="date" value="2020-01-14"/> à
              <select>
                <option>0h</option>
                <option>2h</option>
                <option>4h</option>
                <option>6h</option>
                <option>8h</option>
                <option>10h</option>
                <option>12h</option>
                <option>14h</option>
                <option>16h</option>
                <option>18h</option>
                <option>20h</option>
                <option>22h</option>
              </select>
            </span>
          </div>

          <div class="row text-center">
            <button class="btn btn-sm btn-outline-secondary text-center" style="margin:auto" v-on:click="closeAS()">Chercher<i class="fas fa-search" aria-hidden="true" ></i></button>
          </div>
        </div>

      </modal-page>

    </div>

    `
  }
)
