window.onload = function() {
  var minutesLabel = document.getElementById("minutes");
  var secondsLabel = document.getElementById("seconds");
  var startButton = document.getElementById("start");
  var resetButton = document.getElementById("reset");
  var timer;
  var totalSeconds = 1500; // 25 minutos
  var isWorking = true; // Define se é tempo de estudo ou de pausa
  var alarmAudio = new Audio('assets/sounds/alarm.mp3.mp3'); // Caminho para o arquivo de áudio do alarme

  function setTime() {
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    secondsLabel.innerHTML = pad(totalSeconds % 60);
  }

  function pad(val) {
    var valString = val.toString();
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  function startTimer() {
    startButton.disabled = true;
    resetButton.disabled = false;
    timer = setInterval(function() {
      if (totalSeconds <= 0) {
        clearInterval(timer);
        startButton.disabled = false;
        resetButton.disabled = true;
        if (isWorking) {
          totalSeconds = 300; // 5 minutos de pausa
          isWorking = false;
        } else {
          totalSeconds = 1500; // 25 minutos de estudo
          isWorking = true;
        }
        alarmAudio.play(); // Reproduzir o alarme sonoro
      } else {
        totalSeconds--;
        setTime();
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    resetButton.disabled = true;
    totalSeconds = 1500;
    isWorking = true;
    setTime();
  }

  alarmAudio.addEventListener("ended", function() {
    startTimer();
  });

  startButton.addEventListener("click", startTimer);
  resetButton.addEventListener("click", resetTimer);

  setTime();
};
