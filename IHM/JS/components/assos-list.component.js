Vue.component('assos-list', {
    data() {
      return { assos: Injector.resolve( "AssoService" ).assos }
    },
    template:
    `
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="asso in assos">
        <div class="row">
          <div class="col col-2" style="padding: 0">
            <div class="profile-image">
              <v-img v-bind:src="asso.logoURI">
            </div>
          </div>
          <div class="col col-6">
            {{asso.name}}
          </div>
          <div class="col col-4">
            <button class="followable" v-bind:class="{ unfollow: !asso.followed }" v-on:click="asso.followed = !asso.followed"></button>
          </div>
        </div>
      </li>
    </ul>
    `
})
