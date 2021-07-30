import React, {useEffect, useState} from 'react';
import s from './App.module.scss';
import {DisplayMode} from "./interface/displayMode";
import {getGeoPosition} from "./utils/utils";
import cn from 'classnames';
import {WeatherResult} from './interface/weatherResult';
import Rain from "./assets/rain.png";
import {ReactComponent as PanelArrow} from "./assets/arrow.svg";
import {ReactComponent as Settings} from "./assets/settings.svg";
import useLocalStorage from './hook/useLocalStorage';
import Loader from "./components/Loader";

const App = () => {
  const [settings, setSettings] = useLocalStorage();
  const [wither, setWither] = useState<WeatherResult|null>(null);
  const [fullMode, setFullMode] = useState(false);
  const [currentMode, setCurrentMode] = useState<DisplayMode>(DisplayMode.LOADER);

  useEffect(() => {
      if(!settings) {
          getGeoPosition().then(result => {
              console.log('Ваше место положение', result);
          }).catch((e)=>{
              setCurrentMode(DisplayMode.SEARCH);
          });
      }
  },[]);
  
  return (
      <div className={s.root}>
          <Loader />
          <div className={cn(s.wrapper, s.test)}>
              <div className={s.withers}>
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
              </div>
              <div className={s.panel}>
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
