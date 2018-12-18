let EventManager = function() {


	return {

		events: new Map(),

		addEvent(event) {

			if(!this.events.has(event.date))
			{
				this.events.set(event.date, []);
			}

			this.events.get(event.date).push(event);
		},

		searchEventsDate(date)
		{
			let _date = ( date instanceof Date ? date : new Date( date ) );

			if(events.has(event._date))
			{
				return this.events.get(event._date);
			}
			
			return [];		
		},

		getImportanceEventsDay(date)
		{
			let _date = ( date instanceof Date ? date : new Date( date ) );

			if (!this.m_events.has(_date))
			{
				return -1;
			}

			var events = this.events.get(_date);

			var maxImportance = -1;

			for (var i  = 0; i < events.length; i++)
			{
				var importance = events[i].importances;
				if (importance > maxImportance)
				{
					maxImportance = importance;
				}
			}

			return maxImportance;

		},

		addSomeEvents()
		{
			var date = new Date();

		    date.setDate( date.getDate() + 1);

		    var event1 = new EventAsso();
		    event1.name = "Randonnée Annecy";
		    event1.place = "Annecy";
		    event1.importance = 2;
		    event1.dateTime = date;
		    event1.asso = "Club Montagne";
		    event1.image = "../assets/club-montagne-rando.jpg";

		    this.addEvent(event1);

		    var event2 = new EventAsso();
		    event2.name = "Sortie Ski ";
		    event2.place = "Bat C";
		    event2.importance = 2;
		    event2.dateTime = date;
		    event2.asso = "Ski club";
		    event2.image = "../assets/ski-club.jpeg";

		    this.addEvent(event2);

		    var event3 = new EventAsso();
		    event3.name = "Marché de Noel";
		    event3.place = "MdE";
		    event3.importance = 2;
		    event3.dateTime = date;
		    event3.asso = "Anim'";
		    event3.image = "../assets/marche-noel.jpg";

			this.addEvent(event3);

		    var event4 = new EventAsso()
		    event4.name = "événement1"
		    event4.place = "PC"
		    event4.importance = 2
		    event4.dateTime = date

		    this.addEvent(event4);

		    var event5 = new EventAsso()
		    event5.name = "événement3"
		    event5.place = "PC"
		    event5.importance = 1
		    event5.dateTime = date

		    this.addEvent(event5);

		    date.setDate( date.getDate() + 2 )
		    var event6 = new EventAsso()
		    event6.name = "événement2"
		    event6.place = "PC"
		    event6.importance = 1
		    event6.dateTime = date

		    this.addEvent(event6);

		    date.setDate( date.getDate() + 1 )
		    var event7 = new EventAsso()
		    event7.name = "événement3"
		    event7.place = "PC"
		    event7.importance = 0
		    event7.dateTime = date

		    this.addEvent(event7);

		    var event8 = new EventAsso()
		    event8.name = "événement2"
		    event8.place = "PC"
		    event8.importance = 1
		    event8.dateTime = date

		    this.addEvent(event8);


		}

	}
}
