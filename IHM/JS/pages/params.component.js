Vue.component(
  'params',
  {
    data() {
      return {
        opt: Injector.resolve( "Options" )
      }
    },
    methods: {
    },
    mounted() {
    },
    template:
    `
    <base-layout>
      <div slot="header">
        Options
      </div>

      <div>

        <h2>Changer de police</h2>
        <div>
          <button class="btn neutral" v-on:click="opt.changeFont('neutral')">Neutre</button>
          <button class="btn handwritten" v-on:click="opt.changeFont('handwritten')">Cursive</button>
          <button class="btn geeky" v-on:click="opt.changeFont('geeky')">Geeky</button>
        </div>
        <hr/>
        <h2>Options du compte</h2>
        <button class="btn btn-secondary" onclick="nav.navigate('connexion')">Se déconnecter</button>

      </div>
    </base-layout>
    `
  }
)
