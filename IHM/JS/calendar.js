var idCalendar = "calendar";
var classMainDate = "mainDate";
var idEventsList = "eventsList";

var Calendar = function ()
{
	this.m_todayDate = new Date();
	this.m_events = new Map();

	this.m_divCalendar = null;
	this.m_divMainDate = null;

	this.m_monthPreview = this.m_todayDate.getMonth();
	this.m_yearPreview = this.m_todayDate.getFullYear();

};

Calendar.MONTHS = Object.freeze([
	"Janvier",
	"Février",
	"Mars",
	"Avril",
	"Mai",
	"Juin",
	"Juillet",
	"Août",
	"Septembre",
	"Octobre",
	"Novembre",
	"Décembre"
])

Calendar.DAYS = Object.freeze([
	"Lundi",
	"Mardi",
	"Mercredi",
	"Jeudi",
	"Vendredi",
	"Samedi",
	"Dimanche"
])

Calendar.prototype.init = function() 
{
	this.display();
	this.initBtnsDate();
	this.initEventsList();
}

Calendar.prototype.addEvent = function(event) 
{
	var dateTime = event.date;
	var date = dateTime.getDate();
	var month = dateTime.getMonth();
	var year = dateTime.getFullYear();

	var string = date+"-"+month+"-"+year;


	if(!this.m_events.has(string))
	{
		this.m_events.set(string, []);
	}

	this.m_events.get(string).push(event);

}

Calendar.prototype.addEventsDayToElement = function(element, date)
{

	var day = date.getDate();
	var month = date.getMonth();
	var year = date.getFullYear();

	var string = day+"-"+month+"-"+year;
	

	if(!this.m_events.has(string))
	{
		return;
	}

	var events = this.m_events.get(string);
	events.sort(compareEvents);

	var table = document.createElement("table");
	table.className="tableDate";
	table.id="events-"+day;
	table.setAttribute("value", day);


	var thead = document.createElement("thead");
	var title = thead.insertRow();
	var dayOfWeek = date.getDay()-1;
	if (dayOfWeek < 0)
	{
		dayOfWeek = 6;
	}

	title.innerHTML = Calendar.DAYS[dayOfWeek] + " " + day + " " + Calendar.MONTHS[this.m_monthPreview];
	title.className="titleDate";

	/*
	var leftArrowSpan = document.createElement("span");
	leftArrowSpan.className="arrow2 leftArrow";
	leftArrowSpan.innerHTML="&larr;";

	title.append(leftArrowSpan);

	leftArrowSpan.addEventListener("click", function()
	{
		previousEvent(table);
	});

	var rightArrowSpan = document.createElement("span");
	rightArrowSpan.className="arrow2 rightArrow";
	rightArrowSpan.innerHTML="&rarr;";

	rightArrowSpan.addEventListener("click", function()
	{
		nextEvent(table);
	});

	title.append(rightArrowSpan);
	*/

	table.append(thead);

	var tbody = document.createElement("tbody");
	table.append(tbody);

	for (var i = 0; i < events.length; i++) 
	{
		var event = events[i];
		
		var importance = event.importance;
		if (importance >= 0)
		{
			var dateEvent = event.date;
			var eventElement =  tbody.insertRow();

			var cellBubble = eventElement.insertCell();
			cellBubble.className="cellBubble";
			var bubble = document.createElement("div");
			switch (importance)
			{
				case 0:
					bubble.className="bubble2";
				break;
				case 1:
					bubble.className="bubble2 followBubbleEvent";
				break;
				case 2:
					bubble.className="bubble2 signInBubbleEvent";
				break;
			}
			cellBubble.append(bubble);

			var cellTime = eventElement.insertCell();
			cellTime.className="cellTime";
			var hours = dateEvent.getHours();
			if (hours < 10)
			{
				hours="0"+hours;
			}	

			var minutes = dateEvent.getMinutes();
			if (minutes < 10)
			{
				minutes="0"+minutes;
			}	
			var minutes 
			cellTime.textContent += hours + ":"+ minutes;

			var cellName = eventElement.insertCell();
			cellName.className="cellName";
			cellName.textContent =  event.name;

			var cellPlace = eventElement.insertCell();
			cellPlace.className="cellPlace";
			cellPlace.textContent =  event.place;

		}	
	}

	
	element.append(table); 

}


Calendar.prototype.display = function() 
{
	var month =  this.m_monthPreview;
	var year = this.m_yearPreview;

	var calendar = this;


	var calendarEl = document.getElementById(idCalendar).tBodies[0];
	calendarEl.innerHTML = "";

	var previousDate = new Date(year, month-1);
	var date =  new Date(year, month);
	var nextDate = new Date(year, month+1);

	var day = date.getDay()-1;

	var nbDaysCurrent = new Date(year, month+1, 0).getDate();
	var nbDaysPrevious = new Date(year, month, 0).getDate();

	var beginDay = new Date(year, month, 1).getDay()-1;
	var endDay = new Date(year, month, nbDaysCurrent).getDay()-1;

	var nbWeeks = 6;
	var beginCalendarDate;
	var currentMonthDate;


	if (beginDay == 0)
	{
		beginCalendarDate = 1;
		currentMonth = date.getMonth();
	}
	else
	{
		beginCalendarDate = nbDaysPrevious-beginDay + 1;
		currentMonth = previousDate.getMonth();
	}

	var numDay = beginCalendarDate;


	var displayToday = false;
	if (this.m_todayDate.getMonth()==month &&
		this.m_todayDate.getFullYear()==year)
	{
		displayToday = true;

	}



	for (var i = 0; i < nbWeeks; i++)
	{
		var row = calendarEl.insertRow();
		for (var j = 0; j < 7; j++)
		{
			var cell = row.insertCell();
			var circularDiv = document.createElement("span");


			if (currentMonth==previousDate.getMonth() && numDay>nbDaysPrevious)
			{
				numDay = 1;
				currentMonth = date.getMonth();
				cell.addEventListener("click", function(event)
				{
					event.stopPropagation();
					var num = this.getAttribute("value");
					calendar.scrollToEnventsDay(num);

				});
			}
			else if (currentMonth==previousDate.getMonth())
			{
				cell.className="dayPreviousMonth greyTextINSA";
				cell.addEventListener("click", function()
				{
					calendar.translateMonth(-1);
				});
			}
			else if (currentMonth==date.getMonth() && numDay>nbDaysCurrent)
			{
				numDay = 1;
				cell.className="dayNextMonth greyTextINSA";
				currentMonth = nextDate.getMonth();
				cell.addEventListener("click", function()
				{
					calendar.translateMonth(1);
				});
			}
			else if (currentMonth==nextDate.getMonth())
			{
				cell.className="dayNextMonth greyTextINSA";
				cell.addEventListener("click", function()
				{
					calendar.translateMonth(1);
				});
			}
			else
			{
				cell.addEventListener("click", function(event)
				{
					event.stopPropagation();
					var num = this.getAttribute("value");
					calendar.scrollToEnventsDay(num);
				});
			}

			if (currentMonth==this.m_todayDate.getMonth() && displayToday && this.m_todayDate.getDate() == numDay)
			{
				displayToday = false;
				circularDiv.id="todayDate";
			}



			var importance = this.getImportanceEventsDay(numDay, currentMonth, date.getFullYear());

			var textNode = document.createTextNode(numDay);
			circularDiv.append(textNode);

			if (importance >= 0)
			{
				var bubble = document.createElement("div");
				switch (importance)
				{
					case 0:
						bubble.className="bubble";
					break;
					case 1:
						bubble.className="bubble followBubbleEvent";
					break;
					case 2:
						bubble.className="bubble signInBubbleEvent";
					break;
				}
				circularDiv.append(bubble);
			}

			circularDiv.className="circleDay greyTextINSA";
			cell.setAttribute("value",numDay);
			numDay++;
			cell.append(circularDiv);
		}

	}

}

Calendar.prototype.initEventsList = function() 
{

	var month =  this.m_monthPreview;
	var year = this.m_yearPreview;

	var div = document.getElementById(idEventsList);
	div.innerHTML = "";
	var nbDaysCurrent = new Date(year, month+1, 0).getDate();

	var date = new Date(year, month, 1);

	for (var i = 0; i < nbDaysCurrent; i++)
	{
		this.addEventsDayToElement(div, date);
		date.setDate(date.getDate()+1);
	}
}

Calendar.prototype.initBtnsDate = function() 
{
	var calendar = this;

	var month =  this.m_monthPreview;
	var year = this.m_yearPreview;

	var mainDates = document.getElementsByClassName(classMainDate);
	for (var i = 0; i < mainDates.length; i++)
	{
		mainDate = mainDates[i];
		mainDate.innerHTML = "";

		var leftArrowSpan = document.createElement("span");
		leftArrowSpan.className="arrow leftArrow";
		leftArrowSpan.innerHTML="&larr;";

		var monthSpan = document.createElement("span");
		monthSpan.id="btnMonth";
		monthSpan.className="btnDate";
		monthSpan.textContent= Calendar.MONTHS[month];
		monthSpan.addEventListener("click", function()
		{
			calendar.chooseMonth();
		});


		var yearSpan = document.createElement("span");
		yearSpan.id="btnYear";
		yearSpan.className="btnDate";
		yearSpan.textContent=year;
		yearSpan.addEventListener("click", function()
		{
			calendar.chooseYear();
		});

		var rightArrowSpan = document.createElement("span");
		rightArrowSpan.className="arrow rightArrow";
		rightArrowSpan.innerHTML="&rarr;";

		mainDate.append(leftArrowSpan);
		mainDate.append(monthSpan);
		mainDate.append(yearSpan);
		mainDate.append(rightArrowSpan);

		leftArrowSpan.addEventListener("click", function()
		{
			calendar.translateMonth(-1);
		});
		rightArrowSpan.addEventListener("click", function()
		{
			calendar.translateMonth(+1);
		});
	}

}

Calendar.prototype.translateMonth = function(nbMonth) 
{
	var month = this.m_monthPreview;
	var year = this.m_yearPreview;

	var sumMonth = month+nbMonth;

	var newYear = year + Math.trunc(sumMonth / 12);

	var newMonth = sumMonth%12;
	if (newMonth == -1)
	{
		newYear--;
		newMonth = 11;
	}

	this.m_monthPreview = newMonth;
	this.m_yearPreview = newYear;

	this.init(); 
}

Calendar.prototype.translateYear = function(nbYear) 
{

	var newYear = this.m_yearPreview + nbYear;
	this.m_yearPreview = newYear;

	this.init(); 
}


Calendar.prototype.getImportanceEventsDay = function(day, month, year)
{
	var string = day+"-"+month+"-"+year;


	if (!this.m_events.has(string))
	{

		return -1;
	}


	var events = this.m_events.get(string);


	var maxImportance = -1;
	for (var i  = 0; i < events.length; i++)
	{
		var importance = events[i].importance;
		if (importance > maxImportance)
		{
			maxImportance = importance;
		}
	}

	return maxImportance;
}

Calendar.prototype.chooseYear = function()
{
	var darkScreen = document.createElement("div");
	darkScreen.className="darkScreen";

	var frame = document.createElement("div");
	frame.className="frame roll";

	darkScreen.addEventListener("click",function()
	{
		document.body.removeChild(this);
		document.body.removeChild(frame);
	});

	

	var select = document.createElement("div");
	select.className="dateChooser";

	var choice = document.createElement("div");
	choice.className="dateChoice";

	var target = document.createElement("div");
	target.className="targetChoice";

	var choosenYear = this.m_monthPreview;

	var options = [];
	var currentYearOption;


	var thisYear = this.m_todayDate.getFullYear();

	var optionLastYear =  document.createElement("div");
	optionLastYear.setAttribute("value", thisYear-1);
	optionLastYear.textContent =  thisYear-1;
	choice.append(optionLastYear);

	optionLastYear.addEventListener("click", function()
    {
    	changeOptionRoll(select, this, target);

    });

    options.push(optionLastYear);

	var optionThisYear =  document.createElement("div");
	optionThisYear.setAttribute("value", thisYear);
	optionThisYear.textContent =  thisYear;
	choice.append(optionThisYear);

	optionThisYear.addEventListener("click", function()
    {
    	changeOptionRoll(select, this, target);

    });

	options.push(optionThisYear);


	var optionNextYear =  document.createElement("div");
	optionNextYear.setAttribute("value", thisYear+1);
	optionNextYear.textContent =  thisYear+1;
	choice.append(optionNextYear);

	optionNextYear.addEventListener("click", function()
    {
    	changeOptionRoll(select, this, target);

    });

    options.push(optionNextYear);

	
	var btnValidate = document.createElement("span");
    btnValidate.className="btnV";
    btnValidate.textContent="ok";

    var calendar = this;
    btnValidate.addEventListener("click", function()
    {
  
    	calendar.translateYear(choosenYear - calendar.m_yearPreview);
    	document.body.removeChild(darkScreen);
    	document.body.removeChild(frame);
    });

    target.append(btnValidate);
	 

	
	select.append(choice);
	select.append(target);

	frame.append(select);
	var lastPosY;



	var timeOut;
	

	frame.addEventListener('wheel', function(e) 
	{
		clearTimeout(timeOut);
      	timeOut = setTimeout(function() 
		{
			var choosenOption = stabilizeRoll(select, options, target);
			choosenYear = choosenOption.getAttribute("value");
		}, 100);

	});

	

	frame.addEventListener('scroll', function(e)
	{
		clearTimeout(timeOut);
      	timeOut = setTimeout(function() 
		{
			var choosenOption = stabilizeRoll(select, options, target);
			choosenYear = choosenOption.getAttribute("value");

		}, 100);
    }, true);

   
	
	document.body.append(darkScreen);
	document.body.append(frame);

	
	choosenYear = changeOptionRoll(select, optionThisYear, target);

}

Calendar.prototype.chooseMonth = function()
{
	var darkScreen = document.createElement("div");
	darkScreen.className="darkScreen";

	var frame = document.createElement("div");
	frame.className="frame roll";

	darkScreen.addEventListener("click",function()
	{
		document.body.removeChild(this);
		document.body.removeChild(frame);
	});

	

	var select = document.createElement("div");
	select.className="dateChooser";

	var choice = document.createElement("div");
	choice.className="dateChoice";

	var target = document.createElement("div");
	target.className="targetChoice";

	var choosenMonth = this.m_monthPreview;

	var options = [];
	var currentMonthOption;

	Calendar.MONTHS.forEach(
		(month, idx) => {

			var option = document.createElement("div");
			option.value = idx;
			option.textContent = month;

			if (idx ==  this.m_monthPreview)
			{
				option.setAttribute("selected","selected");
				
			}
			else
			{
				option.removeAttribute("selected");
			}

			if (idx ==  this.m_todayDate.getMonth())
			{
				currentMonthOption = option;
				
			}

			option.setAttribute("value",idx);
			choice.append(option);

			option.addEventListener("click", function()
		    {
		    	changeOptionRoll(select, this, target);

		    });


			options.push(option);
		}

	)

	var btnValidate = document.createElement("span");
    btnValidate.className="btnV";
    btnValidate.textContent="ok";

    var calendar = this;
    btnValidate.addEventListener("click", function()
    {
  
    	calendar.translateMonth(choosenMonth - calendar.m_monthPreview);
    	document.body.removeChild(darkScreen);
    	document.body.removeChild(frame);
    });

    target.append(btnValidate);
	 

	
	select.append(choice);
	select.append(target);

	frame.append(select);
	var lastPosY;



	var timeOut;
	

	frame.addEventListener('wheel', function(e) 
	{
		clearTimeout(timeOut);
      	timeOut = setTimeout(function() 
		{
			var choosenOption = stabilizeRoll(select, options, target);
			choosenMonth = choosenOption.getAttribute("value");
		}, 100);

	});

	

	frame.addEventListener('scroll', function(e)
	{
		clearTimeout(timeOut);
      	timeOut = setTimeout(function() 
		{
			var choosenOption = stabilizeRoll(select, options, target);
			choosenMonth = choosenOption.getAttribute("value");

		}, 100);
    }, true);

   
	
	document.body.append(darkScreen);
	document.body.append(frame);

	
	choosenMonth = changeOptionRoll(select, currentMonthOption, target);

}

Calendar.prototype.scrollToEnventsDay = function(numDay) 
{
	removeTableDay(); 

	var elementEvent = document.getElementById('events-'+numDay);
	var el = document.getElementsByClassName('content')[0];

	var date = new Date(this.m_yearPreview, this.m_monthPreview, numDay);

	if (elementEvent)
	{

		el.scrollTop += elementEvent.offsetTop - el.scrollTop  - el.offsetTop;
	}
	else
	{
		var end = true;
		var elementAfter;
		var tables = document.getElementsByClassName("tableDate");
		for (var i = 0; i < tables.length; i++)
		{
			elementAfter = tables[i];
			var num = elementAfter.getAttribute("value");

			var gap = numDay - num;
			if (gap < 0)
			{
				end = false;
				break;
			}

		}




		var table = document.createElement("table");
		table.className="tableDate temp";
		table.id="events-"+numDay;


		var thead = document.createElement("thead");
		var title = thead.insertRow();
		var dayOfWeek = date.getDay()-1;
		if (dayOfWeek < 0)
		{
			dayOfWeek = 6;
		}

		title.innerHTML = Calendar.DAYS[dayOfWeek] + " " + numDay + " " + Calendar.MONTHS[this.m_monthPreview];
		title.className="titleDate";


		table.append(thead);

		var tbody = document.createElement("tbody");
		table.append(tbody);

		
		var line = tbody.insertRow();
		line.textContent = "Aucun événement prévu";

		var parent = document.getElementById("eventsList");
	
		if (end)
		{
			parent.append(table);
		}
		else
		{
			parent.insertBefore(table, elementAfter);
		}

		document.body.addEventListener("click", removeTableDay, {once:true});

		table.addEventListener("click", function(event)
		{
			event.stopPropagation();
		});

		el.scrollTop += table.offsetTop - el.scrollTop  - el.offsetTop;

	}
};

function changeOptionRoll (select, option, target)
{
	var scrollTop = select.scrollTop;
	var diff = option.offsetTop - scrollTop - target.offsetTop + 19;
	select.scrollTop+=diff;
	return option.getAttribute("value");
}


function stabilizeRoll(select, options, target)
{
	var scrollTop = select.scrollTop;
	var min;
	var first = true;
	var optionChoosen;

	for (var i = 0; i < options.length; i++)
	{
		var diff = options[i].offsetTop - scrollTop - target.offsetTop + 19;
		
		if (first || Math.abs(diff) < Math.abs(min))
		{
			min = diff;
			first = false;
			optionChoosen = options[i];
		}
	}

	select.scrollTop+=min;
	return optionChoosen
}

function removeTableDay ()
{
	var temps = document.getElementsByClassName("temp");
	for (var i = 0; i < temps.length; i++)
	{
		var temp = temps[i];
		temp.parentNode.removeChild(temp);
	}
	//document.body.removeEventListener("click", removeTableDay);
}

/*
function nextEvent(elementEvent)
{
	var elementNextEvent = elementEvent.nextSibling;
	var el = document.getElementsByClassName('content')[0];
	if (elementNextEvent)
	{
		el.scrollTop += elementNextEvent.offsetTop - el.scrollTop  - el.offsetTop;
	}
	else
	{
		el.scrollTop = el.scrollHeight;
	}
	
}

function previousEvent(elementEvent)
{
	var elementPreviousEvent = elementEvent.previousSibling;
	var el = document.getElementsByClassName('content')[0];

	if (elementPreviousEvent)
	{
		el.scrollTop += elementPreviousEvent.offsetTop - el.scrollTop  - el.offsetTop; 
	}
	else
	{
		el.scrollTop = 0;
	}
} */