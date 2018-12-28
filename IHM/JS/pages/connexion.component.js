Vue.component(
  'connexion', {
    data() {
      return {
        nav: Injector.resolve( "Navigation" )
      }
    },
    template:
    `
    <div>

      <h1 style="width: calc( 100% - 20px ); text-align: center; background: #A006; border-radius:5px; margin: 10px; padding: 5px; box-sizing: border-box;">INSA'sso</h1>

      <div style="margin-top: 10vh">

        <div style="text-align: center;">
          <div>
          <span>Identifiant :</span><br>
          <input style="width: 90%; font-size: 26px; box-shadow: 0 0 1px 0 red; border-radius: 5px;" type="text" name="identifier">
          </div>
        </div>
        <br/>
        <br/>
        <div style="text-align: center">
            <span>Mot de passe :</span><br>
            <input style="width: 90%; font-size: 26px; box-shadow: 0 0 1px 0 red; border-radius: 5px;" type="password" name="pass">
        </div>
        <br/>
        <br/>
        <div style="display: flex; align-items: center; justify-content: center; margin-top: 20px;">
          <button type="button" class="btn btn-light btn-lg" v-on:click="nav.navigate('home')"><a>Se connecter</a></button>
        </div>
      </div>
    </div>
    `
})
