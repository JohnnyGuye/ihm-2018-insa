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
    <div>
      <div id="mainDate"></div>
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
    </div>
    `
  }
)
