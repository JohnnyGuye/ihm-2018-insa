let Injector = function() {
  let dependencies = {}

  return {

    register: function(key, value) {
      if( dependencies[key] ) {
        console.warn( "There is already a depency registered after the name", key )
        return
      }
      console.log( "Register injectable", key )
      let ob = value()
      dependencies[key] = ob ? ob : value
    },

    list: function() {
      return depencies.keys()
    },

    resolve: function( keys ) {

      if( keys instanceof Array ) {

        let deps = []
        for(let key of keys) {
          if( dependencies[key] )
            deps.push( dependencies[key] )
          else {
            throw new Error( "Can't resolve " + key )
          }
        }

        return deps

      } else {
        key = keys
        if( dependencies[key] )
          return dependencies[key]
        else {
          throw new Error( "Can't resolve " + key )
        }
      }

    }

  }
}();
