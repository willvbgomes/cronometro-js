const timerElement = document.querySelector('.timer')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')
const millisecondsElement = document.querySelector('.milliseconds')
const startButton = document.querySelector('.start')
const restartButton = document.querySelector('.restart')
const stopButton = document.querySelector('.stop')
const resetButton = document.querySelector('.reset')
const lapButton = document.querySelector('.lap')
const laps = document.querySelector('.laps')

const mainTimer = {
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}

const subTimer = {
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}

let interval
let mainLap
let isStoped = false

const formatTimerElement = (element, length) => `${element}`.padStart(length, 0)

const updateStopwatch = ({ minutes, seconds, milliseconds }) => {
  millisecondsElement.textContent = formatTimerElement(milliseconds, 3)
  secondsElement.textContent = formatTimerElement(seconds, 2)
  minutesElement.textContent = formatTimerElement(minutes, 2)
}

const updateTimers = timer => {
  timer.milliseconds += 10

  if (timer.milliseconds >= 1000) {
    timer.milliseconds = 0
    timer.seconds++
  }

  if (timer.seconds >= 60) {
    timer.seconds = 0
    timer.minutes++
  }
}

const resetTimers = timer => {
  timer.minutes = 0
  timer.seconds = 0
  timer.milliseconds = 0
}

const updateLapTimers = (elementTimer, { minutes, seconds, milliseconds }) => {
  elementTimer.textContent = `${formatTimerElement(
    minutes,
    2
  )}:${formatTimerElement(seconds, 2)}:${formatTimerElement(milliseconds, 3)}`
}

const createLapElement = subTimer => {
  const lapInfo = document.createElement('div')
  const lapNumber = document.createElement('span')
  const fullTimer = document.createElement('span')
  const lapTimer = document.createElement('span')

  lapInfo.classList.add('lap-info')
  lapNumber.classList.add('lap-number')
  fullTimer.classList.add('full-timer')
  lapTimer.classList.add('lap-timer')
  lapTimer.setAttribute('data-js', 'active-lap')

  lapNumber.innerText = `Volta #${laps.childElementCount + 1}`
  updateLapTimers(fullTimer, mainTimer)
  updateLapTimers(lapTimer, subTimer ? subTimer : mainTimer)

  lapInfo.append(lapNumber, fullTimer, lapTimer)

  return lapInfo
}

const insertLaps = lap => {
  const lastLap = laps.firstElementChild

  if (lastLap) {
    lastLap.lastElementChild.removeAttribute('data-js')
  }

  laps.insertBefore(lap, lastLap)
}

const startStopwatch = () => {
  startButton.setAttribute('data-js', 'hidden')
  stopButton.removeAttribute('data-js')
  lapButton.removeAttribute('data-js')

  mainLap = createLapElement()

  interval = setInterval(() => {
    if (!isStoped) {
      updateTimers(mainTimer)
      updateTimers(subTimer)

      updateStopwatch(mainTimer)
      updateLapTimers(mainLap.childNodes[1], mainTimer)
      updateLapTimers(mainLap.childNodes[2], subTimer)
    }
  }, 10)
}

const stopStopwatch = () => {
  isStoped = true
  timerElement.setAttribute('data-js', 'animate')
  stopButton.setAttribute('data-js', 'hidden')
  lapButton.setAttribute('data-js', 'hidden')
  restartButton.removeAttribute('data-js')
  resetButton.removeAttribute('data-js')
}

const restartStopwatch = () => {
  isStoped = false
  restartButton.setAttribute('data-js', 'hidden')
  resetButton.setAttribute('data-js', 'hidden')
  timerElement.removeAttribute('data-js')
  stopButton.removeAttribute('data-js')
  lapButton.removeAttribute('data-js')
}

const resetStopwatch = () => {
  stopButton.setAttribute('data-js', 'hidden')
  restartButton.setAttribute('data-js', 'hidden')
  resetButton.setAttribute('data-js', 'hidden')
  timerElement.removeAttribute('data-js')
  startButton.removeAttribute('data-js')
  laps.textContent = ''

  resetTimers(mainTimer)
  resetTimers(subTimer)

  updateStopwatch(mainTimer)
  clearInterval(interval)
  isStoped = false
}

const createNewLap = () => {
  const lapsLength = laps.childElementCount

  if (lapsLength === 0) {
    insertLaps(mainLap)
  }

  resetTimers(subTimer)

  mainLap = createLapElement(subTimer)
  insertLaps(mainLap)
}

startButton.addEventListener('click', startStopwatch)
stopButton.addEventListener('click', stopStopwatch)
restartButton.addEventListener('click', restartStopwatch)
resetButton.addEventListener('click', resetStopwatch)
lapButton.addEventListener('click', createNewLap)
