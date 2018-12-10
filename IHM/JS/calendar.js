var month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
var day = ["L", "M", "M", "J", "V", "S", "D"];

function initCalendar(idCalendar)
{
	var calendar = document.getElementById(idCalendar);

	var date = new Date();
	var month = date.getMonth();
	var year = date.getFullYear();
	var dateNum = date.getDate();
	var day = date.getDay()-1;
	var nbDaysCurrent = new Date(year, month+1, 0).getDate();
	var nbDaysPrevious = new Date(year, month, 0).getDate();
	var beginDay = new Date(year, month, 1).getDay()-1;
	var endDay = new Date(year, month, nbDaysCurrent).getDay()-1;

	var nbWeeks = 6;

	var beginCalendarDate;

	var currentMonth;

	console.log(nbDaysPrevious);

	if (beginDay == 0)
	{
		nbWeeks--;
		beginCalendarDate = 1;
		currentMonth = 0;
	}
	else
	{
		beginCalendarDate = nbDaysPrevious-beginDay + 1;
		currentMonth = -1;
	}

	var numDay = beginCalendarDate;

	if (endDay == 6)
		nbWeeks--;



	for (var i = 0; i < nbWeeks; i++)
	{
		var row = calendar.insertRow();
		for (var j = 0; j < 7; j++)
		{
			var cell = row.insertCell();
			if (currentMonth==-1 && numDay>nbDaysPrevious)
			{
				numDay = 1;
				currentMonth ++;
			}
			else if (currentMonth==-1)
			{
				cell.className="dayPreviousMonth";
			}
			else if (currentMonth==0 && numDay>nbDaysCurrent)
			{
				numDay = 1;
				cell.className="dayNextMonth";
				currentMonth ++;
			}
			else if (currentMonth==1)
			{
				cell.className="dayNextMonth";
			}
			
			
			var circularDiv = document.createElement("span");
			circularDiv.className="circleDay";
			circularDiv.textContent=numDay;
			numDay++;
			cell.append(circularDiv);
		}

	}

}



