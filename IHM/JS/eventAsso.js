

var EventAsso = function(dateTime, name, place, importance) 
{
	if (typeof importance === "undefined")
	{  
		this.importance = 0;
	}

	if (typeof place === "undefined")
	{  
		this.place = "non renseigné";
	}

	if (typeof name === "undefined")
	{  
		this.name = "non renseigné";
	}

	if (typeof dateTime === "undefined")
	{  
		this.dateTime = "non renseigné";
	}

	this.setImportance = setImportance;

	this.setName = setName;
};

function setImportance (importance)
{
	this.importance = parseInt(importance);
}

function setName (name)
{
	this.name = name;
}
