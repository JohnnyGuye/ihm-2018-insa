function EventAsso( name, date, place, asso, imageURI, importance ) {

	let _date = ( date instanceof Date ? date : new Date( date ) )

	this.importance = importance,
	this.name = name,
	this.place = place,
	this.asso = asso,
	this.imageURI = imageURI,

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
