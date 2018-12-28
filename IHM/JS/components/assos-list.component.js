Vue.component(
  'assos-list', {
    data() {
      return {
        assos: Injector.resolve( "AssoService" ).assos,
        nav: Injector.resolve( "Navigation" )
      }
    },
    template:
    `
    <base-layout>

      <div slot="header">
        Assos
      </div>

      <template slot="footer">
        <button class="icon-btn icon-home" onclick="nav.navigate('feed')"></button>
        <button class="icon-btn icon-calendar" onclick="nav.navigate('calendar')"></button>
        <button class="icon-btn icon-list active" onclick="nav.navigate('assos')"></button>
        <button class="icon-btn icon-tool" onclick="nav.navigate('options')"></button>
      </template>

      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="asso in assos">
          <div class="row">
            <div class="col col-2" style="padding: 0">
              <div class="profile-image">
                <v-img v-bind:src="asso.logoURI"></v-img>
              </div>
            </div>
            <div class="col col-6" v-on:click="nav.navigate( 'home', { asso } )">
              {{ asso.name }}
            </div>
            <div class="col col-4">
              <button class="followable" v-bind:class="{ unfollow: !asso.followed }" v-on:click="asso.followed = !asso.followed"></button>
            </div>
          </div>
        </li>
      </ul>
    </base-layout>
    `
})
