const DEFAULT_TIMER_VALUE = 25;

const btnPomodoro = document.querySelector('input[value="Pomodoro"]');
const btnshortBreak = document.querySelector('input[value="Short Break"]');
const btnLongBreak = document.querySelector('input[value="Long Break"]');
const timerVal = document.querySelector('.timer');
const btnStart = document.querySelector('input[value="Start"]');
const btnStop = document.querySelector('input[value="Stop"]');
const btnReset = document.querySelector('input[value="Reset"]');


function updateTimer(event, timerValue){
    timerVal.textContent = timerValue.toString() + ":00";
    currTimerValue = timerValue;
    clearInterval(timerInterval);
}
function startTimer(event){
    let [min, sec] = timerVal.textContent.split(":");
    min = parseInt(min);
    sec = parseInt(sec);
    timerInterval = setInterval(()=>{
        if(min==0 && sec==0) clearInterval(timerInterval);
        else if(sec==0){
            min-=1;
            sec=59;
        } else {
            sec-=1;
        }
        timerVal.textContent = min.toString().padStart(2,"0") + ":" + sec.toString().padStart(2,"0");
        document.title = `(${timerVal.textContent}) Pomodoro Timer`;
    },1000);
}
function stopTimer(event){
    clearInterval(timerInterval);
}
function resetTimer(event){
    clearInterval(timerInterval);
    updateTimer(null, currTimerValue);
    document.title = `Pomodoro Timer`;
}
function focusButton(button){
    if(button=="Pomodoro"){
        btnPomodoro.classList.add('active');
        btnshortBreak.classList.remove('active');
        btnLongBreak.classList.remove('active');
    } else if(button=="Short Break"){
        btnPomodoro.classList.remove('active');
        btnshortBreak.classList.add('active');
        btnLongBreak.classList.remove('active');
    } else if(button=="Long Break"){
        btnPomodoro.classList.remove('active');
        btnshortBreak.classList.remove('active');
        btnLongBreak.classList.add('active');
    }
}


// Attaching EventListeners
btnPomodoro.addEventListener('click', event => {
    currTimer = "Pomodoro";
    currTimerValue = 25;
    focusButton(event.target.value);
    updateTimer(event, currTimerValue);
});
btnshortBreak.addEventListener('click', event => {
    currTimer = "Short Break";
    currTimerValue = 5;
    focusButton(event.target.value);
    updateTimer(event, currTimerValue);
    
});
btnLongBreak.addEventListener('click', event => {
    currTimer = "Long Break";
    currTimerValue = 10;
    focusButton(event.target.value);
    updateTimer(event, currTimerValue);
});
btnStart.addEventListener('click', startTimer);
btnStop.addEventListener('click', stopTimer);
btnReset.addEventListener('click', resetTimer);

// Setting Default Values
let timerInterval = null;
let currTimer = "Pomodoro";
let currTimerValue = DEFAULT_TIMER_VALUE;
timerVal.textContent = DEFAULT_TIMER_VALUE.toString() + ":00";
btnPomodoro.classList.add('active');