const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");
const timer = document.getElementById("timer");
let timerId;
let lastTimerStartTime;
let accumulated = 0;

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;

  lastTimerStartTime = Date.now();
  timerId = requestAnimationFrame(updateTimer);
}

function updateTimer() {
  const millisElapsed = accumulated + (Date.now() - lastTimerStartTime);
  const secondsElapsed = millisElapsed / 1000;
  const minutesElapsed = secondsElapsed / 60;

  const millisText = formatNumber(millisElapsed % 1000, 3);
  const secondsText = formatNumber(Math.floor(secondsElapsed) % 60, 2);
  const minutesText = formatNumber(Math.floor(minutesElapsed), 2);
  timer.textContent = `${minutesText}:${secondsText}:${millisText}`;
  timerId = requestAnimationFrame(updateTimer);
}

function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  cancelAnimationFrame(timerId);
  accumulated += Date.now() - lastTimerStartTime;
}

function resetTimer() {
  resetButton.disabled = true;
  timer.textContent = "00:00:000";
  accumulated = 0;
}

function formatNumber(number, desiredLength) {
  const stringNumber = String(number);
  return stringNumber.padStart(desiredLength, "0");
}
