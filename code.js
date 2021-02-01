let numberBox = document.querySelectorAll(`input[type="number"]`);
let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");

let dias = numberBox[0];
let horas = numberBox[1];
let minutos = numberBox[2];
let segundos = numberBox[3];

let audio = new Audio("./timer_end.mp3");

let isRunning = false;

let interval;

function validateNumber() {
    if(dias.value <= 0)
        dias.value = 0;

    if (horas.value >= 24 || horas.value <= 0)
        horas.value = 0;

    if (minutos.value >= 60 || minutos.value <= 0)
        minutos.value = 0;

    if (segundos.value >= 60 || segundos.value <= 0)
        segundos.value = 0;
}

function stopResumeTimer() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        stopButton.innerText = "Resume";
    }
    else if (stopButton.innerText != "Stop") {
        startTimer();
        stopButton.innerText = "Stop";
    }
}

function resetTimer() {
    dias.value = null;
    horas.value = null;
    minutos.value = null;
    segundos.value = null;
    isRunning = false;
    startButton.innerText = "Start";
    stopButton.innerText = "Stop";
}

function startTimer() {
    isRunning = true;

    interval = setInterval(() => {
        if (dias.value == 0 && horas.value == 0 && minutos.value == 0 && segundos.value == 0) {
            clearInterval(interval);
            audio.play();
            isRunning = false;
            return;
        }

        segundos.value -= 1;

        if (segundos.value == -1) {
            minutos.value --;
            segundos.value = 59;
        }
    
        if (minutos.value == -1) {
            horas.value --;
            minutos.value = 59;
        }
    
        if (horas.value == -1) {
            dias.value --;
            horas.value = 23;
        }

    }, 1000);
}

function startResumeTimer(event) {
    validateNumber();

    if (isRunning || startButton.innerText == "Reset") {
        resetTimer();
        clearInterval(interval);
        return;
    }

    startButton.innerText = "Reset";

    isRunning = true;

    startTimer();    
}

startButton.addEventListener("click", startResumeTimer);
stopButton.addEventListener("click", stopResumeTimer);