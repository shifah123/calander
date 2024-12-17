// HTML elements
const monthContainer = document.getElementById("month-container");
const leftButtonElement = document.getElementById("left-button");
const rightButtonElement = document.getElementById("right-button");
const monthValue = document.getElementById("month-value");
const yearValue = document.getElementById("year-value");
const goToday = document.getElementById("go-today");

// Constants
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Variables
let date = new Date();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// Draw the calendar on the screen
const drawCalendar = () => {
	// Set for leap year
	MONTH_DAYS[1] = year % 400 === 0 ? 29 : year % 100 === 0 ? 28 : year % 4 === 0 ? 29 : 28;

	// Get month start day
	date = new Date(year, month - 1, 1);
	let startDate = date.getDay() === 0 ? 7 : date.getDay();

	// Set if it's the current month and year
	let today = new Date();
	let isCurrent = (month === today.getMonth() + 1) & (year === today.getFullYear());
	let todayMonthDay = today.getDate();

	// Add week days
	let weekDays = "";
	for (let i = 0; i < 7; i++) {
		weekDays += `<div class="week-day">${WEEK_DAYS[i].toUpperCase().substring(0, 3)}</div>`;
	}

	// Add month days
	let monthDays = `<div class="month-day" style="grid-column-start:${startDate};">1</div>`;
	for (let i = 1; i < MONTH_DAYS[month - 1]; i++) {
		let todayStyle = isCurrent & (i + 1 === todayMonthDay) ? " is-today" : "";
		monthDays += `<div class="month-day${todayStyle}">${i + 1}</div>`;
	}

	// Draw items on the screen
	monthContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
	monthContainer.innerHTML = weekDays + monthDays;
	monthValue.innerHTML = `${MONTHS[month - 1]}`;
	yearValue.value = `${year}`;
};

drawCalendar();

// Go to previus month
leftButtonElement.addEventListener("click", (e) => {
	if (month === 1) {
		month = 12;
		year -= 1;
	} else {
		month -= 1;
	}

	drawCalendar();
});

// Go to next month
rightButtonElement.addEventListener("click", (e) => {
	if (month === 12) {
		month = 1;
		year += 1;
	} else {
		month += 1;
	}

	drawCalendar();
});

// Pick a month
monthValue.addEventListener("click", (e) => {
	// Create a grid with the months
	let monthNames = "";
	for (let i = 0; i < 12; i++) {
		monthNames += `<div id="${MONTHS[i].toLowerCase()}" class="month-name">${MONTHS[i].substring(0, 3)}</div>`;
	}

	// Displays the options on the screen
	monthContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
	monthContainer.innerHTML = monthNames;

	// Adds events for when a month is clicked
	for (let i = 0; i < 12; i++) {
		document.getElementById(MONTHS[i].toLowerCase()).addEventListener("click", (e) => {
			month = i + 1;
			drawCalendar();
		});
	}
});

// Pick a year
yearValue.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		yearValue.blur();
		let newYear = Number(yearValue.value);
		if ((newYear >= -271821) & (newYear <= 275760)) {
			year = newYear;
			drawCalendar();
		} else {
			alert("Please enter a valid year.");
		}
	}
});

// Go today's date
goToday.addEventListener("click", (e) => {
	date = new Date();
	month = date.getMonth() + 1;
	year = date.getFullYear();
	drawCalendar();
});
