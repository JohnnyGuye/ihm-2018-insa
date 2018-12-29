var idCalendar = "calendar";
var idMainDate = "mainDate";

var Calendar = function ()
{
	this.m_todayDate = new Date();
	this.m_events = new Map();

	this.m_divCalendar = null;
	this.m_divMainDate = null;

	this.m_monthPreview = this.m_todayDate.getMonth();
	this.m_yearPreview = this.m_todayDate.getFullYear();

	this.init = init;
	this.display = display;
	this.initBtnsDate = initBtnsDate;
	this.translateMonth = translateMonth;
	this.getImportanceEventsDay = getImportanceEventsDay;
	this.chooseMonth=chooseMonth;

	this.addEvent = addEvent;

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

function init()
{
	this.display();
	this.initBtnsDate();
}

function addEvent(event)
{
	var dateTime = event.date;
	var date = dateTime.getDate();
	var month = dateTime.getMonth();
	var year = dateTime.getFullYear();

	var string = date+"-"+month+"-"+year;


	if(!this.m_events.has(string))
	{
		this.m_events.set(string, [])
	}

	this.m_events.get(string).push(event)

}

function display()
{
	var month =  this.m_monthPreview;
	var year = this.m_yearPreview;


	var calendar = document.getElementById(idCalendar).tBodies[0];
	calendar.innerHTML = "";

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
		var row = calendar.insertRow();
		for (var j = 0; j < 7; j++)
		{
			var cell = row.insertCell();
			var circularDiv = document.createElement("span");


			if (currentMonth==previousDate.getMonth() && numDay>nbDaysPrevious)
			{
				numDay = 1;
				currentMonth = date.getMonth();
			}
			else if (currentMonth==previousDate.getMonth())
			{
				cell.className="dayPreviousMonth greyTextINSA";
			}
			else if (currentMonth==date.getMonth() && numDay>nbDaysCurrent)
			{
				numDay = 1;
				cell.className="dayNextMonth greyTextINSA";
				currentMonth = nextDate.getMonth();
			}
			else if (currentMonth==nextDate.getMonth())
			{
				cell.className="dayNextMonth greyTextINSA";
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
			numDay++;
			cell.append(circularDiv);
		}

	}

}

function initBtnsDate ()
{
	var calendar = this;

	var month =  this.m_monthPreview;
	var year = this.m_yearPreview;

	var mainDate = document.getElementById(idMainDate);
	mainDate.innerHTML = "";

	var leftArrowSpan = document.createElement("span");
	leftArrowSpan.id="leftArrow";
	leftArrowSpan.className="arrow";
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
	rightArrowSpan.id="rightArrow";
	rightArrowSpan.className="arrow";
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

function translateMonth(nbMonth)
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

	this.display();
	this.initBtnsDate();

}

function getImportanceEventsDay(day, month, year)
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

function chooseMonth ()
{
	var darkScreen = document.createElement("div");
	darkScreen.className="darkScreen";

	var frame = document.createElement("div");
	frame.className="frame";

	var select = document.createElement("div");
	select.className="dateChooser";

	var choice = document.createElement("div");
	choice.className="dateChoice";

	var target = document.createElement("div");
	target.className="targetChoice";

	var linearGradient1 = document.createElement("div");
	linearGradient1.className = "linearGardientTopToBottom";
	frame.append(linearGradient1);

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
			choice.append(option);
		}

	)

	var linearGradient2 = document.createElement("div");
	linearGradient2.className = "linearGardientBottomToTop";
	frame.append(linearGradient2);
	choice.append(target);
	select.append(choice);

	frame.append(select);


	document.body.append(darkScreen);
	document.body.append(frame);
}
