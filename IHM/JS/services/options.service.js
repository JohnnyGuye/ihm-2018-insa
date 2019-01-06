(function() {
  let OptionsService = function() {
    return {
      changeFont( font ) {
        let ff = ""
        switch(font) {
          case 'geeky':
          case 'monospace':
            ff = "geeky"
            break
          case "cursive":
          case "handwritten":
            ff = "handwritten"
            break;
          default:
            ff = "neutral"
        }
        document.body.className = ff
      }
    }
  }

  Injector.register( "Options", OptionsService )
})()
