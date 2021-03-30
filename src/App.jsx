import {Header, Toolbar, Counter, Settings} from './components'
import './styles/all.scss';
import React from 'react';

function App() {

  const [isSettingsActive, setSettingsActive] = React.useState(false);
  const [themes, setThemes] = React.useState(themesArr);
  const [fonts, setFonts] = React.useState(fontsArr);
  const [timers, setTimers] = React.useState(timersArr);

  React.useEffect(()=> {
    const settings = localStorage.getItem('pomodoro-settings') || null;
    if(settings !== null) {
      const {themes, fonts, timers} = JSON.parse(settings);
      setThemes(themes);
      setFonts(fonts);
      setTimers(timers);
    }
  }, [])
  React.useEffect(() => {
    saveToLocalStorage();
  }, [themes, fonts, timers])

  const handleToolbarClick = (title) => {
    const newTimers = timers.map((item) => {
      return {...item, active: item.title === title};
    })
    setTimers(newTimers);
  }
  const handleSettingsIconClick = () => {
    setSettingsActive(!isSettingsActive);
  }
  const handleThemeClick = (theme) => {
    const newThemes = themes.map((item) => {
      return {...item, active: item.class === theme.class};
    })
    setThemes(newThemes);
  }
  const handleFontClick = (font) => {
    const newFonts = fonts.map((item) => {
      return {...item, active: item.title === font.title};
    })
    setFonts(newFonts);
  }
  const handleTimerChange = (timer) => {
    const newTimers = timers.map((item) => {
      return item.title === timer.title ? timer : item; 
    })
    setTimers(() => {
      return newTimers;
    });
  }
  const saveToLocalStorage = () => {
    const settings = {
      themes, fonts, timers
    };
    localStorage.setItem('pomodoro-settings', JSON.stringify(settings));
  }

  const activeTheme = themes.find((item) => item.active);
  const activeFont = fonts.find((item) => item.active);
  const activeTimer = timers.find((item) => item.active);

  return (
    <div className={`app ${activeTheme.class}`} 
         style={{fontFamily:activeFont.title, fontWeight:activeFont.fontWeight}}>
      <Header />
      <Toolbar timers={timers} onItemClick={handleToolbarClick}/>
      <Counter timer={activeTimer}/>
      <Settings onThemeClick={handleThemeClick}
                onCloseClick={handleSettingsIconClick}
                onFontClick={handleFontClick}
                onTimerChange={handleTimerChange}
                isOpened={isSettingsActive} themes={themes} fonts={fonts} timers={timers}/>
      <div className="settings-icon-box">
        <span onClick={handleSettingsIconClick} className="settings-icon"></span>
      </div>
    </div>
  );
}

const themesArr = [{class:'tomato-theme', code:'#f87070', active: true},
                {class:'cyan-theme', code:'#70f3f8', active: false},
                {class:'purple-theme', code:'#d881f8', active: false}];

const fontsArr = [{title:'Kumbh Sans', fontWeight:'700', active: true},
                {title:'Roboto Slab', fontWeight:'700', active: false},
                {title:'Space Mono', fontWeight:'400', active: false}];

const timersArr = [{title:'pomodoro', value:10, active: true},
                   {title:'short break', value:5, active: false}, 
                   {title:'long break', value:15, active: false}];

export default App;
