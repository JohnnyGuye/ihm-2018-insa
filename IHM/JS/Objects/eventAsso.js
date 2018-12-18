let EventAsso = function( name, date, place, asso, imageURI, importance ) {

	let _date = ( date instanceof Date ? date : new Date( date ) );

	return {

		importance: importance,
		name: name,
		place: place,
		asso: asso,
		imageURI: imageURI,

		get date() {
			return _date
		},
		set date( value ) {
			if( value instanceof Date )
				_date = value
			else
				_date = new Date( value )
		}

	}
}
