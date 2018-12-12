function initLink ()
{
	var btnIndexToCalendar = document.getElementById('btnIndexToCalendar');
	btnIndexToCalendar.addEventListener("click",function()
	{
		changePage("calendarHTML","indexHTML");
	});

}

function changePage(idNextPage, idPreviousPage)
{
	
	document.getElementById(idPreviousPage).style.display="none";
	document.getElementById(idNextPage).style.display="block";
}