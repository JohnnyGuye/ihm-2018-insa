(function() {
  let NavigationService = function() {

    let pageStack = [ '' ]

    return {
      routes: {},

      get stack() { return pageStack.slice() },

      setRoot( target ) {
        target = target ? target : window.location.hash.substring(1)
        pageStack.length = 0
        this.navigate( target )
      },

      navigate( target ) {
        pageStack.push( target )
        window.location.hash = target
      },

      get currentRoute() {
        return pageStack[ pageStack.length - 1 ]
      },

      pop( ) {
        if( pageStack.length <= 1 ) {
          console.warn( "Can't pop off more pages since it's already the root page" )
          return
        }
        pageStack.pop()
        window.location.hash = pageStack[ pageStack.length -1 ]
      }
    }
  }

  Injector.register( "Navigation", NavigationService )
})()
