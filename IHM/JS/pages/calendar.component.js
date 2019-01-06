Vue.component(
  'calendar',
  {
    methods: {
      initCalendar() {
        var calendar = new Calendar();
        Injector.resolve( "EventService" ).events.forEach( (value) => { calendar.addEvent( value) } )

        calendar.init()
        console.log("created")
        return calendar
      }
    },
    mounted() {
      this.initCalendar()
    },
    template:
    `
    <base-layout>
      <div slot="header">
        Calendrier
      </div>

      <div>

        <div class="mainDate"></div>
        <hr />
        <table id="calendar">
          <thead>
            <tr>
              <th class="redTextINSA">Lun</th>
              <th class="redTextINSA">Mar</th>
              <th class="redTextINSA">Mer</th>
              <th class="redTextINSA">Jeu</th>
              <th class="redTextINSA">Ven</th>
              <th class="redTextINSA">Sam</th>
              <th class="redTextINSA">Dim</th>
            </tr>
            </thead>
          <tbody>
          </tbody>
        </table>
        <hr />
        <div id="eventsList">
        </div>
        <div class="mainDate"></div>
        <hr />
      </div>
    </base-layout>
    `
  }
)
