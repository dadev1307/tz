import React, { useEffect, useState } from 'react';
import s from './App.module.scss';
import getCityWeather from './utils/fetchHelpers';
import cn from 'classnames';
import { WeatherResult } from './interface/weatherResult';
import Rain from "./assets/rain.png";
import Sun from "./assets/sun.png";
import {ReactComponent as PanelArrow} from "./assets/arrow.svg";
import {ReactComponent as Settings} from "./assets/settings.svg";
import useLocalStorage from './hook/useLocalStorage';

const App = () => {

  const [storage, setStorage] = useLocalStorage('wither');
  const [wither, setWither] = useState<WeatherResult|null>(null);
  
  const [fullMode, setFullMode] = useState(false);
  const [countCity, setCountCity] = useState(1);
  
  const handleFullMode = () => setFullMode(!fullMode);
  const handleCountCity = (e:React.ChangeEvent<HTMLInputElement>) => setCountCity(+e.target.value);
  
  const repeatCity = () => {
      const items = [];
      for(let i = 1; i <= countCity; i++) {
          items.push(i);
      }
      return items;
  }

  useEffect(() => {
    getCityWeather('gdfgfgf').then(w => setWither(w)).catch(e => {
        console.log(e);
    });
  },[]);
  
  return (
      <div className={s.root}>
          <input type="number" className={s.countCity} placeholder='Сколько городов вывести' value={countCity} onChange={handleCountCity} />
          <div className={cn(s.wrapper, s.test)}>
              <div className={s.withers}>
                  {repeatCity().map(item => 
                    <article className={s.wither}>
                      <div className={s.witherMain}>
                          <p className={s.city}>
                              <span className={s.icon}></span>
                              Санкт-Петербург, RU
                          </p>
                          <div className={s.sky}>
                              <span className={s.skyName}>Облачно</span>
                              <span className={s.skyTemp}>16 °С</span>
                              <img className={s.skyImage} src={Rain} width='55' height='55' alt="sky"/>
                          </div>
                      </div>
                      <div className={cn(s.witherAdditions, {[s.active] : fullMode })}>
                          <div className={s.additionItem}>
                              <span>Влажность</span>
                              <span>60%</span>
                          </div>
                          <div className={s.additionItem}>
                              <span>Ветер</span>
                              <span>2 м/c</span>
                          </div>
                          <div className={s.additionItem}>
                              <span>Давление</span>
                              <span>746</span>
                          </div>
                      </div>
                  </article>
                  )}
              </div>
              <div className={s.panel} onClick={handleFullMode}>
                  <PanelArrow className={s.panelArrow} />
              </div>
              <Settings className={s.settings} />
          </div>
      </div>
  )

  return (
    <div className={s.root}>
      <h1>{wither?.city},{wither?.country}</h1>
      <div className={s.wrapper}>
        <img src={wither?.iconUrl} alt={wither?.iconName} />
        <span>{wither?.temp} &#8451;</span>
      </div>
      <div>
        <span>По ощущениям {wither?.feelsLike} &#8451;</span>
        <span>Ветер {wither?.windDeg} {wither?.windSpeed}</span>
        <span>Видимость {wither?.visibility} км</span>
        <span>Давление {wither?.pressure} мм</span>
        <span>Влажность {wither?.humidity} %</span>
      </div>
    </div>
  );
};

export default App;
