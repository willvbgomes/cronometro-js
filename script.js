const timerElement = document.querySelector('.timer')
const minutesElement = document.querySelector('.minutes')
const secondsElement = document.querySelector('.seconds')
const millisecondsElement = document.querySelector('.milliseconds')
const startButton = document.querySelector('.start')
const restartButton = document.querySelector('.restart')
const stopButton = document.querySelector('.stop')
const resetButton = document.querySelector('.reset')

const timer = {
  minutes: 0,
  seconds: 0,
  milliseconds: 0,
}

let interval
let isStoped = false

const formatTimerElement = (element, length) => `${element}`.padStart(length, 0)

const updateTimer = ({ minutes, seconds, milliseconds }) => {
  millisecondsElement.textContent = formatTimerElement(milliseconds, 3)
  secondsElement.textContent = formatTimerElement(seconds, 2)
  minutesElement.textContent = formatTimerElement(minutes, 2)
}

const startTimer = () => {
  startButton.setAttribute('data-js', 'hidden')
  stopButton.removeAttribute('data-js')

  interval = setInterval(() => {
    if (!isStoped) {
      timer.milliseconds += 10

      if (timer.milliseconds >= 1000) {
        timer.milliseconds = 0
        timer.seconds++
      }

      if (timer.seconds >= 60) {
        timer.seconds = 0
        timer.minutes++
      }

      updateTimer(timer)
    }
  }, 10)
}

const stopTimer = () => {
  isStoped = true
  timerElement.setAttribute('data-js', 'animate')
  stopButton.setAttribute('data-js', 'hidden')
  restartButton.removeAttribute('data-js')
  resetButton.removeAttribute('data-js')
}

const restartTimer = () => {
  isStoped = false
  restartButton.setAttribute('data-js', 'hidden')
  resetButton.setAttribute('data-js', 'hidden')
  timerElement.removeAttribute('data-js')
  stopButton.removeAttribute('data-js')
}

const resetTimer = () => {
  stopButton.setAttribute('data-js', 'hidden')
  restartButton.setAttribute('data-js', 'hidden')
  resetButton.setAttribute('data-js', 'hidden')
  timerElement.removeAttribute('data-js')
  startButton.removeAttribute('data-js')

  timer.minutes = 0
  timer.seconds = 0
  timer.milliseconds = 0

  updateTimer(timer)
  clearInterval(interval)
  isStoped = false
}

startButton.addEventListener('click', startTimer)
stopButton.addEventListener('click', stopTimer)
restartButton.addEventListener('click', restartTimer)
resetButton.addEventListener('click', resetTimer)
