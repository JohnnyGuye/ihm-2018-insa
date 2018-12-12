
var monthToString = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
var day = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

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
	this.getImportanceEvents = getImportanceEvents;

	this.addEvent = addEvent;

};

function init() 
{
	this.display();
	this.initBtnsDate();
}

function addEvent(event)
{
	var dateTime = event.dateTime();
	var date = dateTime.getDate();
	var month = dateTime.getMonth();
	var year = dateTime.getFullYear();

	var string = ""+date+month+year;

	var dayEvents = this.m_events.get(string);

	if (dayEvents != undefined)
	{
		dayEvents.push(event);
	}
	else
	{
		 this.m_events.set(string, [event]);
	}

	console.log(string);
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

			

			var importance = this.getImportanceEvents(numDay, currentMonth, date.getFullYear());

			switch (importance)
			{
				case 0:
				break;
				case 1:
				break;
			}


			
			circularDiv.className="circleDay greyTextINSA";
			circularDiv.textContent=numDay;
			numDay++;
			cell.append(circularDiv);
		}

	}

    initCalendar( month, year) {
        var todayDate = new Date();
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
	monthSpan.textContent=monthToString[month];

	var yearSpan = document.createElement("span");
	yearSpan.id="btnYear";
	yearSpan.className="btnDate";
	yearSpan.textContent=year;

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

        if (typeof month === "undefined") {
            month = todayDate.getMonth();
        }

        if (typeof year === "undefined") {
            year = todayDate.getFullYear();
        }

        var calendar = document.getElementById(this.id).tBodies[0];
        calendar.innerHTML = "";


        var date = new Date(year, month);
        var day = date.getDay() - 1;
        var nbDaysCurrent = new Date(year, month + 1, 0).getDate();
        var nbDaysPrevious = new Date(year, month, 0).getDate();
        var beginDay = new Date(year, month, 1).getDay() - 1;
        var endDay = new Date(year, month, nbDaysCurrent).getDay() - 1;
        var nbWeeks = 6;
        var beginCalendarDate;
        var currentMonth;


        if (beginDay == 0) {
            beginCalendarDate = 1;
            currentMonth = 0;
        } else {
            beginCalendarDate = nbDaysPrevious - beginDay + 1;
            currentMonth = -1;
        }

        var numDay = beginCalendarDate;

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
	console.log(newMonth);
	
	this.m_monthPreview = newMonth;
	this.m_yearPreview = newYear;

	this.display();
	this.initBtnsDate();
	
}

function getImportanceEvents(day, month, year) 
{
	var string = ""+day+month+year;
	var events = this.m_events.get(string);

	if (typeof events === "undefined")
	{
		return 0;
	}

	console.log(events.length)
	var maxImportance = 0;
	for (var i  = 0; i < events.length; i++)
	{
		var importance = events[i].importance();
		console.log(importance);
		if (importance > maxImportance)
		{
			maxImportance = importance;
		}
	}

	return maxImportance;
}


        if (typeof year === "undefined") {
            year = todayDate.getFullYear();
        }

        var mainDate = document.getElementById( this.dateId );
        mainDate.innerHTML = "";

        var leftArrowSpan = document.createElement("span");
        leftArrowSpan.id = "leftArrow";
        leftArrowSpan.className = "arrow";
        leftArrowSpan.innerHTML = "&larr;";

        var monthSpan = document.createElement("span");
        monthSpan.id = "btnMonth";
        monthSpan.className = "btnDate";
        monthSpan.textContent = monthToString[month];

        var yearSpan = document.createElement("span");
        yearSpan.id = "btnYear";
        yearSpan.className = "btnDate";
        yearSpan.textContent = year;

        var rightArrowSpan = document.createElement("span");
        rightArrowSpan.id = "rightArrow";
        rightArrowSpan.className = "arrow";
        rightArrowSpan.innerHTML = "&rarr;";

        mainDate.append(leftArrowSpan);
        mainDate.append(monthSpan);
        mainDate.append(yearSpan);
        mainDate.append(rightArrowSpan);

        leftArrowSpan.addEventListener("click", () => {
            this.translateMonth( month, year, -1);
        });
        rightArrowSpan.addEventListener("click", () => {
            this.translateMonth( month, year, +1);
        });

    }

    translateMonth( month, year, nbMonth ) {

        var sumMonth = month + nbMonth;

        var newYear = year + Math.trunc(sumMonth / 12);

        var newMonth = sumMonth % 12;
        if (newMonth == -1) {
            newYear--;
            newMonth = 11;
        }

        this.initCalendar( newMonth, newYear);
        this.initBtnsDate( newMonth, newYear);

    }

    removeElementsByClass(className) {
        var elements = document.getElementsByClassName(className);

        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
}
