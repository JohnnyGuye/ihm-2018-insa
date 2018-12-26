let Injector = function() {
  let dependencies = {}

  return {

    register: function(key, value) {
      if( dependencies[key] ) {
        console.warn( "There is already a depencie registered after the name", key )
      }
      dependencies[key] = value()
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
    // },
    //
    // resolve: function(deps, func, scope) {
    //   let args = [];
    //
    //   for(let i = 0; i < deps.length, d = deps[i]; i++) {
    //       if( dependencies[d] ) {
    //           args.push( dependencies[d] );
    //       } else {
    //           throw new Error('Can\'t resolve ' + d);
    //       }
    //   }
    //   return function() {
    //       func.apply(scope || {}, args.concat(Array.prototype.slice.call(arguments, 0)));
    //   }
    // }

  }
}();
