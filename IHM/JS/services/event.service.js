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

      createTestEvents: function() {
        let date = new Date();

        date.setDate( date.getDate() + 1)

        // For feed

        let event

        event = new EventAsso()

        event.name = "Randonnée Annecy"
        event.place = "Annecy"
        event.importance = 2
        event.date = date
        event.asso = "Club Montagne"
        event.image = "../assets/club-montagne-rando.jpg"

        this.addEvent( event );

        event = new EventAsso();

        event.name = "Sortie Ski "
        event.place = "Bat C"
        event.importance = 2
        event.date = date
        event.asso = "Ski club"
        event.image = "../assets/ski-club.jpeg"

        this.addEvent( event );

        event = new EventAsso();

        event.name = "Marché de Noel"
        event.place = "MdE"
        event.importance = 2
        event.date = date
        event.asso = "Anim'"
        event.image = "../assets/marche-noel.jpg"

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
