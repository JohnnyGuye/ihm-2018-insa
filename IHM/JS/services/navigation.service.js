(function() {
  let NavigationService = function() {

    let pageStack = [ '' ]
    let router = null
    let latestParams = null

    return {
      routes: {},

      get stack() {   return pageStack.slice()  },

      get params() {  return latestParams       },

      get currentRoute() {
        return pageStack[ pageStack.length - 1 ]
      },

      registerRouter( _router ) {
        router = _router
      },

      notifyRouter() {
        if(!router) return
        router.currentRoute = this.currentRoute
      },

      setRoot( target ) {
        target = target ? target : window.location.hash.substring(1)
        pageStack.length = 0
        this.navigate( target )
      },

      navigate( target, params = null ) {
        pageStack.push( target )
        latestParams = params
        window.location.hash = target
        this.notifyRouter()
        console.log( this )
      },

      pop( ) {
        if( pageStack.length <= 1 ) {
          console.warn( "Can't pop off more pages since it's already the root page" )
          return
        }
        pageStack.pop()
        window.location.hash = this.currentRoute
        this.notifyRouter
      }
    }
  }

  Injector.register( "Navigation", NavigationService )
})()
