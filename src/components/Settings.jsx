import React from 'react'

const Settings = ({isOpened = false, onCloseClick=f=>f, timers=[], onTimerChange=f=>f,
     themes=[], fonts=[], onThemeClick=f=>f, onFontClick=f=>f}) => {

  const onTimerAddClick = (timer) => {
    if(timer.value < 60) {
      const newTimer = {
        ...timer,
        value: timer.value + 1
      };
      onTimerChange(newTimer);
    }
  }
  const onTimerMinusClick = (timer) => {
    if(timer.value > 1) {
      const newTimer = {
        ...timer,
        value: timer.value - 1
      };
      onTimerChange(newTimer);
    }
  }
  return (
    <div className={isOpened ? "settings opened" : "settings"}>
      <div className="settings__wrapper">
        <div className="settings__header">
          <p className="settings__title">Settings</p>
          <span onClick={onCloseClick} className="settings__close"></span>
        </div>
        <div className="settings__body">
          
          <div className="settings__section settings__section--time">
            <p className="settings__section--title">Time (Minutes)</p>
            {
              timers &&
              timers.map((timer, i) => 
                <div key={`${timer.title}_${i}`} className="settings__run-group">
                  <span className="settings__run-group--title">{timer.title}</span>
                  <div className="custom-input-box">
                    <input readOnly type="number" name={timer.title} min="0" max="60"  value={timer.value}/>
                    <svg onClick={() => onTimerAddClick(timer)} className="input-add" xmlns="http://www.w3.org/2000/svg" width="14" height="7">
                      <path fill="none" stroke="#1E213F" strokeWidth="2" d="M1 6l6-4 6 4"/>
                    </svg>
                    <svg onClick={() => onTimerMinusClick(timer)} className="input-minus" xmlns="http://www.w3.org/2000/svg" width="14" height="7">
                      <path fill="none" stroke="#1E213F" strokeWidth="2" d="M1 1l6 4 6-4"/>
                    </svg>
                  </div>
                </div>)
            }
          </div>
          <div className="settings__section">
            <p className="settings__section--title">Font</p>
            <div className="settings__section-group">
              {
                fonts &&
                fonts.map((font, i) => {
                  return <span key={`${font}_${i}`}
                               style={{fontFamily:font.title, fontWeight:font.fontWeight}} onClick={() => onFontClick(font)}
                               className={ font.active?'settings__font active': 'settings__font' }>
                            Аа
                          </span>
                })
              }
            </div>
          </div>
          <div className="settings__section">
            <p className="settings__section--title">Color</p>
            <div className="settings__section-group">
              {
                themes &&
                themes.map((theme, i) => {
                  return <span key={`${theme}_${i}`}
                               style={{backgroundColor:theme.code}} onClick={() => onThemeClick(theme)}
                               className={ theme.active?'settings__color active': 'settings__color' }>
                          </span>
                })
              }
            </div>
          </div>
          <div className="settings__button-box">
            <button onClick={onCloseClick} className="settings__button">Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
