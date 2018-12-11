var monthToString = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
var day = ["L", "M", "M", "J", "V", "S", "D"];


class Calendar {

    constructor(idCalendar, mainDate) {
        this.id = idCalendar
				this.dateId = mainDate
				this.initBtnsDate( );
				this.initCalendar( );
    }

    initCalendar( month, year) {
        var todayDate = new Date();

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


        var displayToday = false;
        if (todayDate.getMonth() == month &&
            todayDate.getFullYear() == year) {
            displayToday = true;

        }



        for (var i = 0; i < nbWeeks; i++) {
            var row = calendar.insertRow();
            for (var j = 0; j < 7; j++) {
                var cell = row.insertCell();
                var circularDiv = document.createElement("span");


                if (currentMonth == -1 && numDay > nbDaysPrevious) {
                    numDay = 1;
                    currentMonth++;
                } else if (currentMonth == -1) {
                    cell.className = "dayPreviousMonth greyTextINSA";
                } else if (currentMonth == 0 && numDay > nbDaysCurrent) {
                    numDay = 1;
                    cell.className = "dayNextMonth greyTextINSA";
                    currentMonth++;
                } else if (currentMonth == 1) {
                    cell.className = "dayNextMonth greyTextINSA";
                }

                if (currentMonth == 0 && displayToday && todayDate.getDate() == numDay) {
                    displayToday = false;
                    circularDiv.id = "todayDate";
                }

                circularDiv.className = "circleDay greyTextINSA";
                circularDiv.textContent = numDay;
                numDay++;
                cell.append(circularDiv);
            }

        }

    }

    initBtnsDate( month, year) {
        var todayDate = new Date();

        if (typeof month === "undefined") {
            month = todayDate.getMonth();
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
