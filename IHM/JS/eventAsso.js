var EventAsso = function(dateTime, name, place, importance)
{

	this.m_importance = 0;
	this.m_place = null;
    this.m_name = null;
    this.m_dateTime = null;


    this.importance(importance);
    this.name(name);
    this.place(place);
    this.dateTime(dateTime);

};

EventAsso.prototype.importance = function(importance)
{
	if (typeof importance !== "undefined")
	{
		this.m_importance = parseInt(importance);
	}

	return this.m_importance;

}

EventAsso.prototype.name = function (name)
{
	if (typeof name !== "undefined")
	{
		this.m_name = name;
	}

	return this.m_name;
}

EventAsso.prototype.dateTime = function(dateTime)
{
	if (typeof dateTime === 'undefined')
	{
		return this.m_dateTime;
	}
	else if (typeof dateTime.getMonth === 'function')
	{
		this.m_dateTime = dateTime;
	}
	else if (typeof dateTime !== 'undefined')
	{
		this.m_dateTime = new Date(dateTime);
	}

	return this.m_dateTime;


}

EventAsso.prototype.place = function(place)
{
	if (typeof place !== "undefined")
	{
		this.m_place = place;
	}

	return this.m_place;
}
