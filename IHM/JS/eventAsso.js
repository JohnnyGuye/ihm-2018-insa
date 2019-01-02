function EventAsso( name, date, place, asso, imageURI, importance ) {

	let _date = ( date instanceof Date ? date : new Date( date ) )

	this.importance = importance || 1
	this.name = name || ""
	this.place = place || ""
	this.asso = asso || ""
	this.imageURI = imageURI || ""

	Object.defineProperty(
		this,
		"date",
		{
			get: function() {
				return _date
			},
			set: function( value ) {
				if( value instanceof Date )
					_date = value
				else
					_date = new Date( value )
			}
		}
	)

}

function compareEvents(event1, event2) 
{

  if (event1.importance < event2.importance)
  {
  	return 1;
  }
  else if (event1.importance > event2.importance)
  {
  	return -1;
  }
  else
  {
  	if (event1.date < event2.date)
	{
		return 1;
	}
	else if (event1.date > event2.date)
	{
		return -1;
	}
	else
	{
		return 0;
	}
  }
}
