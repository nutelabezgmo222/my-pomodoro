import React from 'react'

const Counter = ({timer = {}}) => {
  const [currentTimer, setCurrentTimer] = React.useState(0);
  const [isCountActive, setCountActive] = React.useState(false);

  React.useEffect(() => {
    setCountActive(false);
    setCurrentTimer(timer.value * 60);
  }, [timer])

  React.useEffect(() => {
    if(isCountActive) {
      const interval = setInterval(() => {
        setCurrentTimer(timer => {
          if(timer > 1) {
            return timer - 1;
          }else {
            setCountActive(false);
            setCurrentTimer(timer.value * 60);
            return 0;
          }
        })
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCountActive])

  const onStartClick = () => {
    setCountActive(true);
  }
  const onPauseClick = () => {
    setCountActive(false);
  }

  const minutes = Math.floor(currentTimer / 60) < 10 ? '0' + Math.floor(currentTimer / 60) : Math.floor(currentTimer / 60);
  const seconds = (currentTimer % 60) < 10 ? '0' + (currentTimer % 60) : (currentTimer % 60);
  const difference = (timer.value * 60 - currentTimer) / (timer.value*60);

  return (
    <div className="counter">
      <div className="counter__wrapper">
        <svg id="counter-timer">
          <circle strokeDashoffset={1070*difference} cx="50%" cy="50%" r="170"></circle>
        </svg>
        <div className="counter__value-box">
           <p className="counter__time">{minutes}:{seconds}</p>
           <button onClick={onPauseClick}
                  className={isCountActive ? "counter__pause counter__button" : "counter__pause counter__button hidden"}>pause</button>
           <button onClick={onStartClick} 
                  className={isCountActive ? "counter__restart counter__button hidden" : "counter__restart counter__button"}>
              start
           </button>
        </div>
      </div>
    </div>
  )
}

export default Counter
