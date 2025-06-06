
function switching(){

const switchBtn = document.getElementById('switch-btn');

switchBtn.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark-theme');

  const images = document.querySelectorAll('.theme-img');
  
  images.forEach(img => {
    const lightSrc = img.getAttribute('data-light');
    const darkSrc = img.getAttribute('data-dark');
    
    img.src = isDark ? darkSrc : lightSrc;
  });
});

}

switching();



function openFeatures(){
    var allElem = document.querySelectorAll('.elem')
    var fullElemPage = document.querySelectorAll('.fullElem')
    var allFullElemBackBtn = document.querySelectorAll('.fullElem .back')

    allElem.forEach(function(elem){
        elem.addEventListener('click',function(){
            fullElemPage
        [elem.id].style.display='block'
        })
    })

    allFullElemBackBtn.forEach(function(back){
        back.addEventListener('click',function(){
            fullElemPage
        [back.id].style.display='none'
        })
    })
}

openFeatures()


function todolist(){

let currentTask = [];

// Load from localStorage if available
if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
}

// Render all tasks
function renderTask() {
    const taskContainer = document.querySelector(".alltask");
    taskContainer.innerHTML = ""; // Clear old tasks

    currentTask.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.setAttribute("data-index", index);

        taskDiv.innerHTML = `
            <h5>${task.task} <span class="${task.imp ? "true" : "false"}">Important</span></h5>
            <button id="${index}">Mark as Completed</button>
        `;

        // Show task details on task click (excluding button)
        taskDiv.querySelector("h5").addEventListener("click", () => {
            showTaskDetails(task);
        });

        // Remove task on button click
        taskDiv.querySelector("button").addEventListener("click", () => {
            currentTask.splice(index, 1);
            updateStorage();
            renderTask();
            clearDetailsIfVisible(index);
        });

        taskContainer.appendChild(taskDiv);
    });

    updateStorage();
}

// Save to localStorage
function updateStorage() {
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
}

// Show task details in the right panel
function showTaskDetails(task) {
    document.getElementById("task-details-view").style.display = "block";
    document.getElementById("details-content").textContent = task.details || "No description.";
    document.getElementById("importance-content").textContent = task.imp ? "Important" : "Normal";
    document.querySelector("#task-details-view h3").textContent = task.task;
}

// Clear details if task being shown is deleted
function clearDetailsIfVisible(deletedIndex) {
    const currentTitle = document.querySelector("#task-details-view h3").textContent;
    const deletedTask = currentTask[deletedIndex];
    if (!currentTask.some(task => task.task === currentTitle)) {
        document.getElementById("task-details-view").style.display = "none";
    }
}

// Form submission: add a new task
document.querySelector(".addTask form").addEventListener("submit", function (e) {
    e.preventDefault();

    const taskInput = document.getElementById("task-input").value.trim();
    const taskDetails = document.getElementById("task-details").value.trim();
    const taskImportant = document.getElementById("check").checked;

    if (!taskInput) return alert("Please enter a task");

    currentTask.push({
        task: taskInput,
        details: taskDetails,
        imp: taskImportant
    });

    // Reset form
    document.getElementById("task-input").value = "";
    document.getElementById("task-details").value = "";
    document.getElementById("check").checked = false;

    renderTask();
});

// Initial render
renderTask();

}

todolist()


function dailyPlanner(){

var dayPlanner = document.querySelector('.day-planner')

var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

var hours = Array.from({length:18},(_,idx)=>{
    let startHour = 6 + idx;
    let endHour = 7 + idx;

    const formatTime = (hour) => {
        let period = hour >= 12 ? 'PM' : 'AM';
        let standardHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${standardHour}:00 ${period}`;
    };

       return `${formatTime(startHour)} - ${formatTime(endHour)}`;
});


var wholeDaySum = ''
hours.forEach(function(elem,idx){

   var savedData = dayPlanData[idx] || ''

    wholeDaySum = wholeDaySum + 
    `<div class="day-planner-time">
        <p>${elem}</p>
        <input id=${idx} type="text" placeholder="..." value="${savedData}">
    </div>`
})

dayPlanner.innerHTML = wholeDaySum

 var dayPlannerInput = document.querySelectorAll('.day-planner input')
 
dayPlannerInput.forEach(function(elem){
    elem.addEventListener('input', function(){
       dayPlanData[elem.id] = elem.value

       localStorage.setItem('dayPlanData',JSON.stringify(dayPlanData))
        
    })
})
}

dailyPlanner();




function motivationalQuote() {
    var motivationQuoteContent = document.querySelector('.motivation-2 h1')
    var motivationAuthor = document.querySelector('.motivation-3 h2')

    async function fetchQuote() {
        let response = await fetch('https://api.quotable.io/random')
        let data = await response.json()

        motivationQuoteContent.innerHTML = data.content
        motivationAuthor.innerHTML = data.author
    }

    fetchQuote()
}

motivationalQuote()




function pomodoro(){
    
    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var session = document.querySelector('.pomodoro-fullpage .session')
    var isWorkSession = true
    let isTimerRunning = false;
    let isTimerFinished = false;


    let totalSeconds = 60 * 60
    let timerInterval = null

    function updateTimer() {
        let hours = Math.floor(totalSeconds/3600)
        let minutes = Math.floor((totalSeconds % 3600) / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(hours).padStart('2','0')}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

function startTimer() {
    if (isTimerRunning || isTimerFinished) return; // Block if already running or finished

    isTimerRunning = true;
    clearInterval(timerInterval);

    if (isWorkSession) {
        timerInterval = setInterval(function () {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateTimer();
            } else {
                isWorkSession = false;
                clearInterval(timerInterval);
                isTimerRunning = false;
                isTimerFinished = true;
                session.innerHTML = 'Time is over';
                updateTimer();
            }
        }, 1000);
    } else {
        timerInterval = setInterval(function () {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateTimer();
            } else {
                isWorkSession = true;
                clearInterval(timerInterval);
                isTimerRunning = false;
                isTimerFinished = true;
                timer.innerHTML = '00:00';
                session.innerHTML = 'Break is Over';
                session.style.backgroundColor = 'var(--green)';
                updateTimer();
            }
        }, 1000);
    }
}


function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
}

function resetTimer() {
    totalSeconds = 60 * 60;
    clearInterval(timerInterval);
    isWorkSession = true;
    isTimerRunning = false;
    isTimerFinished = false;
    session.innerHTML = 'Work Session';
    session.style.backgroundColor = 'var(--green)';
    updateTimer();
}


    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)


    // Mode switching logic
const timerDisplay = document.querySelector('.pomo-timer h1');
const sessionTitle = document.querySelector('.pomodoro-fullpage .session');
document.getElementById('pomodoro').addEventListener('click', () => {
    clearInterval(timerInterval);
    totalSeconds = 25 * 60;
    isWorkSession = true;
    isTimerRunning = false;
    isTimerFinished = false;
    sessionTitle.innerHTML = 'Work Session';
    sessionTitle.style.backgroundColor = 'var(--green)';
    updateTimer();
});

document.getElementById('short-break').addEventListener('click', () => {
    clearInterval(timerInterval);
    totalSeconds = 5 * 60;
    isWorkSession = false;
    isTimerRunning = false;
    isTimerFinished = false; // Allow timer to start again
    sessionTitle.innerHTML = 'Short Break';
    sessionTitle.style.backgroundColor = 'var(--tri4)';
    updateTimer();
});

document.getElementById('long-break').addEventListener('click', () => {
    clearInterval(timerInterval);
    totalSeconds = 15 * 60;
    isWorkSession = false;
    isTimerRunning = false;
    isTimerFinished = false; // Allow timer to start again
    sessionTitle.innerHTML = 'Long Break';
    sessionTitle.style.backgroundColor = 'var(--tri3)';
    updateTimer();
});



}
   
pomodoro();


function weather(){

const apiKey = '53dae0f5b394c8ba78157b1b0d76f67e';
const urlBase = 'https://api.openweathermap.org/data/2.5/weather';

const header1name = document.querySelector('.header-1 h4')    
const header1Time = document.querySelector('.header-1 h1')
const header1date = document.querySelector('.header-1 h2')
const header2Temp = document.querySelector('.header-2 h2')
const header2Humidity = document.querySelector('.header-2 h5')
const header2condition = document.querySelector('.header-2 h4')
const header2wind = document.querySelector('.header-2 h3')
const header2feels = document.querySelector('.header-2 p');

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

let data = null;

// Weather fetch by city name
async function WeatherAPICall(cityName){
    const url = `${urlBase}?q=${cityName}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert('City not found, please try again!');
            return;
        }

        data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert('Error fetching weather data');
        console.error(error);
    }
}

// Weather fetch by latitude & longitude
async function WeatherByCoordinates(lat, lon){
    const url = `${urlBase}?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            alert('Failed to get weather for your location');
            return;
        }

        data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert('Error fetching location weather');
        console.error(error);
    }
}

// Common function to update the UI
function updateWeather(data) {
    header2Temp.innerHTML = `${Math.floor(data.main.temp - 273.15)} °C`;
    header2condition.innerHTML = `${data.weather[0].description}`;
    header2Humidity.innerHTML = `Humidity : ${data.main.humidity} %`;
    header2wind.innerHTML = `Wind Speed : ${Math.floor((data.wind.speed) * 3.6)} km/h`;
    header1name.innerHTML = `${data.name}, ${data.sys.country}`;
    header2feels.innerHTML = `Feels like : ${Math.floor(data.main.feels_like - 273.15)} °C`;
}

// Get current location on page load
function fetchLocationWeather() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                WeatherByCoordinates(latitude, longitude);
            },
            (error) => {
                console.warn('Geolocation error:', error);
                // fallback to default city
                WeatherAPICall('Panskura');
            }
        );
    } else {
        alert("Geolocation not supported by your browser.");
        WeatherAPICall('Panskura');
    }
}

// Search button event
searchBtn.addEventListener('click', () => {
    const inputCity = cityInput.value.trim();
    if (inputCity) {
        WeatherAPICall(inputCity);
    }
});

// Clock and date
function timeDate(){
    const totaldaysOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const totalmonth = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const date = new Date();

    const daysOfWeek = totaldaysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const tarikh = date.getDate();
    const month = totalmonth[date.getMonth()];
    const year = date.getFullYear();

    header1date.innerHTML = `${tarikh}-${month} , ${year}`;

    const formattedTime = `${String(hours > 12 ? hours - 12 : hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

    header1Time.innerHTML = `${daysOfWeek}, ${formattedTime}`;
}

setInterval(timeDate, 1000);

// ⬇️ Call on page load
fetchLocationWeather();

}

weather();



 function dailygoals() {
     
const goalsByDate = JSON.parse(localStorage.getItem("goalsByDate") || "{}");
const actualTimesByDate = JSON.parse(localStorage.getItem("actualTimesByDate") || "{}");

const calendarGrid = document.getElementById("calendarGrid");
const goalDateElem = document.getElementById("goal-date");
const bars = document.getElementById("bars");
const resultChart = document.getElementById("resultChart");
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currentDateStr = null;

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseInputDate(str) {
  const parts = str.trim().split("-");
  if (parts.length !== 3) return null;
  const monthName = parts[0].toLowerCase();
  const day = parseInt(parts[1]);
  const year = parseInt(parts[2]);
  if (isNaN(day) || isNaN(year)) return null;

  const monthNames = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];
  const monthIndex = monthNames.findIndex(mn => mn.startsWith(monthName));
  if (monthIndex === -1) return null;

  return new Date(year, monthIndex, day);
}

function getDateFromURLorToday() {
  const params = new URLSearchParams(window.location.search);
  const dateParam = params.get("date");
  if (dateParam) {
    const parsed = parseInputDate(dateParam);
    if (parsed) return parsed;
  }
  return new Date();
}

function updateMonthYearHeader(date) {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const header = document.querySelector(".calendar-box h3");
  header.textContent = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

function generateCalendar(date) {
  calendarGrid.innerHTML = "";

  dayNames.forEach(day => {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;
    calendarGrid.appendChild(dayCell);
  });

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement("div");
    emptyCell.classList.add("calendar-day", "empty");
    calendarGrid.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("calendar-day");
    dayCell.textContent = day;

    const cellDate = new Date(year, month, day);
    cellDate.setHours(0, 0, 0, 0);

    if (cellDate.getTime() === today.getTime()) {
      dayCell.style.backgroundColor = "#00bcd4";
      dayCell.style.color = "white";
      dayCell.style.fontWeight = "bold";
    }

    if (cellDate.getTime() > today.getTime()) {
      dayCell.classList.add("future");
    } else {
      dayCell.addEventListener("click", () => {
        currentDateStr = formatDate(cellDate);
        loadDateGoals(currentDateStr, false);
        updateURLDate(currentDateStr);
        highlightSelectedDate(dayCell);
        resultChart.style.display = "none";
      });
    }

    const emojiSpan = document.createElement("span");
    const goalsForDate = goalsByDate[formatDate(cellDate)] || [];
    emojiSpan.textContent = goalsForDate.length ? " ❤️" : " 😭";
    dayCell.appendChild(emojiSpan);

    calendarGrid.appendChild(dayCell);
  }

  showMonthlyOverallPercentage(year, month);
}

function highlightSelectedDate(selectedCell) {
  document.querySelectorAll(".calendar-day").forEach(cell => {
    cell.style.border = "";
  });
  selectedCell.style.border = "2px solid #00bcd4";
}

function updateURLDate(dateStr) {
  const url = new URL(window.location);
  url.searchParams.set("date", dateStr);
  window.history.replaceState({}, "", url);
}

function loadDateGoals(dateStr, showChartOnLoad = false) {
  goalDateElem.textContent = "Goals for " + dateStr;

  const goals = goalsByDate[dateStr] || [];
  const actualTimes = actualTimesByDate[dateStr] || [];

  const goalsList = document.getElementById("goalsList");
  goalsList.innerHTML = "";
  goals.forEach(g => {
    const div = document.createElement("div");
    div.classList.add("goal");
    div.innerHTML = `<span>${g.goal}</span><span>${g.time} min</span>`;
    goalsList.appendChild(div);
  });

  const trackList = document.getElementById("trackList");
  trackList.innerHTML = "";
  goals.forEach((g, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${g.goal}</strong><br/>
      <input type="number" placeholder="Actual time (min)" value="${actualTimes[i] || ''}" onchange="setActual(${i}, this.value)" />
    `;
    trackList.appendChild(div);
  });

  resultChart.style.display = showChartOnLoad ? "block" : "none";
  if (showChartOnLoad) showChart(goals, actualTimes);
}

function saveDateGoals() {
  if (!currentDateStr) {
    alert("Please select a date from the calendar first.");
    return;
  }

  localStorage.setItem("goalsByDate", JSON.stringify(goalsByDate));
  localStorage.setItem("actualTimesByDate", JSON.stringify(actualTimesByDate));

  alert("Goals saved for " + currentDateStr);
  loadDateGoals(currentDateStr, true);
  generateCalendar(new Date(currentDateStr));
}

function addGoal() {
  if (!currentDateStr) {
    alert("Please select a date first.");
    return;
  }

  const goalInput = document.getElementById("goalInput");
  const timeInput = document.getElementById("timeInput");

  const goal = goalInput.value.trim();
  const time = parseInt(timeInput.value);

  if (!goal || !time || time <= 0) {
    alert("Please enter a valid goal and time.");
    return;
  }

  if (!goalsByDate[currentDateStr]) {
    goalsByDate[currentDateStr] = [];
    actualTimesByDate[currentDateStr] = [];
  }

  goalsByDate[currentDateStr].push({ goal, time });
  actualTimesByDate[currentDateStr].push(0);

  goalInput.value = "";
  timeInput.value = "";

  loadDateGoals(currentDateStr, false);
  generateCalendar(new Date(currentDateStr));
}

function setActual(index, value) {
  if (!currentDateStr) return;
  if (!actualTimesByDate[currentDateStr]) actualTimesByDate[currentDateStr] = [];
  actualTimesByDate[currentDateStr][index] = parseInt(value) || 0;
  localStorage.setItem("actualTimesByDate", JSON.stringify(actualTimesByDate));
}

function showChart(goals, actualTimes) {
  bars.innerHTML = "";
  if (goals.length === 0) {
    resultChart.style.display = "none";
    return;
  }

  goals.forEach((g, i) => {
    const actual = actualTimes[i] || 0;
    const percent = g.time === 0 ? 0 : Math.min(100, Math.round((actual / g.time) * 100));

    const barContainer = document.createElement("div");
    const goalName = document.createElement("div");
    goalName.innerHTML = `<strong>${g.goal}</strong>`;
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.width = percent + "%";
    bar.textContent = percent + "%";

    barContainer.appendChild(goalName);
    barContainer.appendChild(bar);
    bars.appendChild(barContainer);
  });
}

function showMonthlyOverallPercentage(year, month) {
  let totalPercent = 0;
  let count = 0;
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    const dateStr = formatDate(new Date(year, month, day));
    const goals = goalsByDate[dateStr] || [];
    const actualTimes = actualTimesByDate[dateStr] || [];
    if (goals.length === 0) continue;

    goals.forEach((g, i) => {
      const actual = actualTimes[i] || 0;
      const percent = g.time === 0 ? 0 : Math.min(100, Math.round((actual / g.time) * 100));
      totalPercent += percent;
      count++;
    });
  }

  const overall = count ? Math.round(totalPercent / count) : 0;
  const calendarCompletion = document.getElementById("calendarCompletion");
  if (calendarCompletion) {
    calendarCompletion.textContent = `📊 Monthly Completion: ${overall}%`;
  }
}

function init() {
  const initialDate = getDateFromURLorToday();
  currentDateStr = formatDate(initialDate);
  updateMonthYearHeader(initialDate);
  generateCalendar(initialDate);
  loadDateGoals(currentDateStr, false);

  Array.from(calendarGrid.children).forEach(cell => {
    if (cell.textContent == parseInt(currentDateStr.slice(-2))) {
      if (cell.classList.contains("calendar-day") && !cell.classList.contains("empty")) {
        highlightSelectedDate(cell);
      }
    }
  });
}

document.querySelector(".add-goal button").addEventListener("click", addGoal);
document.querySelector(".submit button").addEventListener("click", saveDateGoals);
window.setActual = setActual;

init();

 }

 dailygoals();