(function() {
  let AssoService = function() {

    let assos = []
    let hideAssos = new Set();

    return {
      get assos() {
        return assos
      },

      get hideAssos() {
        return hideAssos
      },

      addAsso: function( asso ) {
        if( asso instanceof Asso ) {
          this.assos.push( asso )
        } else {
          console.warn( asso, "is not an Asso object" )
        }
      },

      hideAsso(assoName)
      {
        
        if (!this.hideAssos.has(assoName))
        {
          this.hideAssos.add(assoName);
        }
       
      },

      showAsso(assoName)
      {
        
        if ( this.hideAssos.has(assoName))
        {
           this.hideAssos.delete(assoName);
        }
       
      },

      isHide (assoName)
      {
        return  this.hideAssos.has(assoName);
      },

      createTestAssos: function() {
        this.addAsso(
          new Asso(
            "24 heures de l'INSA",
            "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/26992352_10159838903490134_7383194001432840263_n.png?_nc_cat=104&_nc_ht=scontent-mrs1-1.xx&oh=e5b8ff5dc2bfd8e4f7d751aa4d3c3b5a&oe=5C9370DA"
          )
        )

        this.addAsso(
          new Asso(
            "Graines d'Images",
            "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/1175526_10152165884855828_685759715_n.jpg?_nc_cat=106&_nc_ht=scontent-mrs1-1.xx&oh=129624204794134f5b8e844ac7a363d7&oe=5CA456EE"
          )
        )

        this.addAsso(
          new Asso(
            "Troupe Théâtrale de l'INSA (TTI)",
            "./assets/tti.png"
          )
        )

        this.addAsso(
          new Asso(
            "INSA E-sport",
            "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/47254932_2785572011668308_6751636255135498240_n.png?_nc_cat=108&_nc_ht=scontent-mrs1-1.xx&oh=f1f1c332c8b3e7901f8d39004075ed5f&oe=5C95FD6A"
          )
        )

        this.addAsso(
          new Asso(
            "Club Montagne",
            "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/21462838_1590649147622038_7877221207811406772_n.jpg?_nc_cat=107&_nc_ht=scontent-mrs1-1.xx&oh=8a8ab36c424030d74332d0dcdfe95cd5&oe=5C983B25"
          )
        )

        this.addAsso(
          new Asso(
            "L'Art-Scène",
            "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/1620675_644619585597105_14998711_n.jpg?_nc_cat=105&_nc_ht=scontent-mrs1-1.xx&oh=dc797f6e31f99b9ad06eec78f56d7be9&oe=5C64A028"
          )
        )

        this.addAsso(
          new Asso(
            "Club Astro",
            "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/18011129_1873988046222147_5313132961779569628_n.jpg?_nc_cat=103&_nc_ht=scontent-mrs1-1.xx&oh=93be6782a15cc58c6cc73ff970cc2186&oe=5C9C8637"
          )
        )

        this.addAsso(
          new Asso(
            "InSecurity",
            "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/12115486_187181411618529_5378306676893494678_n.png?_nc_cat=100&_nc_ht=scontent-mrs1-1.xx&oh=6bf1cc18d7a134d9018a44ac6e423f64&oe=5C99346B"
          )
        )

        this.addAsso(
          new Asso(
            "BDE",
            "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/21768147_1390572340998442_6566228959497348664_n.png?_nc_cat=104&_nc_ht=scontent-mrs1-1.xx&oh=042859bd1b5fd1468f217cecd06d3a50&oe=5C923ABD"
          )
        )

        this.addAsso(
          new Asso(
            "Alumni INSA Lyon",
            "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/12540648_1037514726270987_1471159823466271751_n.png?_nc_cat=107&_nc_ht=scontent-mrs1-1.xx&oh=917a9dff85d2308dfec4fc1ecbe9d238&oe=5CA8DF0B"
          )
        )
      },

      clearAssos() {
        assos.length = 0
      }

    }
  }

  Injector.register( "AssoService", AssoService )
})()
