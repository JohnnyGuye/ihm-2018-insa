(function() {
  let EventService = function() {

    let events = []

    return {
      get events() {
        return events
      },

      addEvent: function( event ) {
        if( event instanceof EventAsso ) {
          this.events.push( event )
        } else {
          console.warn( event, "is not an EventAsso object" )
        }
      },

      getMatchingAssoEvents: function( assoName ) {
        assoName = assoName.toLowerCase()
        let res = []
        for(let event of events) {
          console.log(event)
          if( event.asso.toLowerCase() != assoName )  continue;
          res.push( event )
        }
        return res
      },

      createTestEvents: function() {
        let date = new Date();

        date.setDate( date.getDate() + 1)

        // For feed

        let event

        event = new EventAsso()

        event.name = "Winter tournament"
        event.place = "Reboot, Lyon"
        event.importance = 3
        event.date = new Date("12-15-2018")
        event.asso = "INSA E-sport"
        event.imageURI = "https://scontent-mrs1-1.xx.fbcdn.net/v/t1.0-9/47507613_2785631848328991_7429561357789298688_o.jpg?_nc_cat=104&_nc_ht=scontent-mrs1-1.xx&oh=c6038247d2f0b31d4c588ebe2f5f8eb4&oe=5C8B9828"
        console.log( event )
        this.addEvent( event )

        event = new EventAsso()

        event.name = "Randonnée Annecy"
        event.place = "Annecy"
        event.importance = 2
        event.date = date
        event.asso = "Club Montagne"
        event.imageURI = "./assets/club-montagne-rando.jpg"

        this.addEvent( event );

        event = new EventAsso();

        event.name = "Sortie Ski "
        event.place = "Bat C"
        event.importance = 2
        event.date = date
        event.asso = "Ski club"
        event.imageURI = "./assets/ski-club.jpeg"

        this.addEvent( event );

        event = new EventAsso();

        event.name = "Marché de Noel"
        event.place = "MdE"
        event.importance = 2
        event.date = date
        event.asso = "BDE"
        event.imageURI = "./assets/marche-noel.jpg"

        this.addEvent( event );

        // For calendar
        date = new Date();
        date.setDate( date.getDate() + 1 )

        event = new EventAsso()
        event.name = "événement1"
        event.place = "PC"
        event.importance = 2
        event.date = date
        this.addEvent( event )

        event = new EventAsso()
        event.name = "événement3"
        event.place = "PC"
        event.importance = 1
        event.date = date
        this.addEvent( event );

        date.setDate( date.getDate() + 2 )
        event = new EventAsso()
        event.name = "événement2"
        event.place = "PC"
        event.importance = 1
        event.date = date
        this.addEvent( event );

        date.setDate( date.getDate() + 1 )
        event = new EventAsso()
        event.name = "événement4"
        event.place = "PC"
        event.importance = 0
        event.date = date
        this.addEvent( event );

        event = new EventAsso()
        event.name = "événement5"
        event.place = "PC"
        event.importance = 1
        event.date = date
        this.addEvent( event );

      },

      clearEvents() {
        events.length = 0
      }

    }
  }

  Injector.register( "EventService", EventService )
})()
