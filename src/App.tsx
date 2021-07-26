import React, { useEffect, useState } from 'react';
import s from './App.module.scss';
import getCityWeather from './utils/fetchHelpers';
import { WeatherResult } from './interface/weatherResult';
import ArrowImage from "./assets/arrow.png";
import useLocalStorage from './hook/useLocalStorage';

const App = () => {

  const [storage, setStorage] = useLocalStorage('wither');
  const [wither, setWither] = useState<WeatherResult|null>(null);

  useEffect(() => {
    getCityWeather('gdfgfgf').then(w => setWither(w)).catch(e => {
        console.log(e);
    });
  },[])

  return (
    <div className={s.root}>
      <h1>{wither?.city},{wither?.country}</h1>
      <div className={s.wrapper}>
        <img src={wither?.iconUrl} alt={wither?.iconName} />
        <span>{wither?.temp} &#8451;</span>
      </div>
      <div className={s.params}>
        <span>По ощущениям {wither?.feelsLike} &#8451;</span>
        <span>Ветер {wither?.windDeg} {wither?.windSpeed} <img src={ArrowImage} width='15px' alt='arrow' style={{transform: `rotate(${wither?.windDeg}deg)`}} /></span>
        <span>Видимость {wither?.visibility} км</span>
        <span>Давление {wither?.pressure} мм</span>
        <span>Влажность {wither?.humidity} %</span>
      </div>
    </div>
  );
};

export default App;
