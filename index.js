let timers = [];
const activeTimersContainer = document.getElementById("activeTimer");
if(activeTimersContainer.innerHTML == ""){
  const timerElement = document.createElement("span");
    timerElement.classList.add("timer-input");
    timerElement.innerText = "You have no timers currently!";
    activeTimersContainer.appendChild(timerElement);
}  
function startNewTime() {
  const hours = parseInt(document.getElementById("hours").value || 0);
  const minutes = parseInt(document.getElementById("minutes").value || 0);
  const seconds = parseInt(document.getElementById("seconds").value || 0);

  if (hours == 0 && minutes == 0 && seconds == 0) {
    alert("please enter valid time");
    return;
  }

  let totalTimeInSecond = hours * 3600 + minutes * 60 + seconds;

  const timerId = setInterval(() => {
    if (totalTimeInSecond <= 0) {
      //if time comes to 0 then it should stop and play song
      clearInterval(timerId); // stop the timer at 0
      handleTimerEnd(timerId); // for plaing audio
    } else {
      // decrement the time and display on screen
      totalTimeInSecond--;
      updateTimeDisplay(timerId, totalTimeInSecond);
    }
  }, 1000);

  timers.push({
    id: timerId,
    totalTime: totalTimeInSecond,
    isAudio:false,
  });

  updateActiveTimerdisplay();
}

function updateActiveTimerdisplay() {
  const activeTimersContainer = document.getElementById("activeTimer");
  activeTimersContainer.innerHTML = "";

  timers.forEach((timer) => {
    const timerElement = document.createElement("div");
    timerElement.classList.add("timer-input");

    const hours = Math.floor(timer.totalTime / 3600);
    const minutes = Math.floor((timer.totalTime % 3600) / 60);
    const seconds = timer.totalTime % 60;

    // <div>${formatTime(timer.totalTime)}</div>
    // <button onclick="stopTimer(${timer.id})">Stop Timer</button>

    timerElement.innerHTML = `
           
           
            <div class="name">Time Left :</div>
            <div class="time active">
              <p>${hours}</p>
              <p>${minutes}</p>
              <p>${seconds}</p>
            </div>  
            <button onclick="stopTimer(${timer.id})">Delete</button>
          </div>
    
        `;
    activeTimersContainer.appendChild(timerElement);
  });
}



function updateTimeDisplay(timerId, totalTimeInSecond) {
  const timerIndex = timers.findIndex((timer) => timer.id === timerId);
  timers[timerIndex].totalTime = totalTimeInSecond;
  updateActiveTimerdisplay();
}

function stopTimer(timerId) {

const timerIndex = timers.findIndex((timer) => timer.id === timerId);
  const isAudioPlaying =  timers[timerIndex].isAudio ;

  if(isAudioPlaying){
    timers[timerIndex].audio.pause();
    timers[timerIndex].audio.currentTime = 0;
  }
  clearInterval(timerId);
  timers = timers.filter((timer) => timer.id !== timerId);
  updateActiveTimerdisplay();
}

function handleTimerEnd(timerId) {
    const timerIndex = timers.findIndex((timer) => timer.id === timerId);
    
  const timerElement = document.getElementById("timerEndDisplay");
  // Update the timer end display according to Figma design

  // Play audio alert (replace 'audio.mp3' with your audio file)
  const audio = new Audio("mixkit-battleship-alarm-1001.wav");
  audio.play();

  //to delete and stop audio
  timers[timerIndex].audio = audio;
  timers[timerIndex].isAudio = true;
}
// stopAudio(timerId,audio){
//     timers = timers.filter(timer => timer.id != timerId);
// }
