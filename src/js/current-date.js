let currentDay = document.getElementById("date__day");
let currentMonth = document.getElementById("date__month");
let currentYear = document.getElementById("date__year");
const Data = new Date();
const Year = Data.getFullYear();
const Month = Data.getMonth();
const Day = Data.getDate();

currentDay.innerHTML = Day;
currentMonth.innerHTML = Month;
currentYear.innerHTML = Year;


