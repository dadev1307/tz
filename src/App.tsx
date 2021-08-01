import React, { ChangeEvent, lazy, Suspense, useEffect, useState } from 'react';
import s from './App.module.scss';
import { DisplayMode } from './interface/displayMode';
import { getGeoPosition } from './utils/utils';
import { WeatherResult } from './interface/weatherResult';
import useLocalStorage from './hook/useLocalStorage';
import Loader from './components/Loader';

const SearchCity = lazy(() => import('./components/SearchCity'));
const Settings = lazy(() => import('./components/Settings'));
const Weathers = lazy(() => import('./components/Weathers'));

const App = () => {
  const [settings, setSettings] = useLocalStorage();
  const [wither, setWither] = useState<WeatherResult | null>(null);
  const [fullMode, setFullMode] = useState(false);
  const [currentMode, setCurrentMode] = useState<DisplayMode>(DisplayMode.LOADER);

  const components = {
    [DisplayMode.LOADER]: Loader,
    [DisplayMode.SEARCH]: SearchCity,
    [DisplayMode.SETTINGS]: Settings,
    [DisplayMode.WEATHERS]: Weathers
  }

  const handleMode = (ev:ChangeEvent<HTMLInputElement>) => {
    const mode:DisplayMode = +ev.target.value;
    setCurrentMode(mode);
  }

  useEffect(() => {
    if (!settings) {
      getGeoPosition().then(result => {
        setCurrentMode(DisplayMode.WEATHERS);
        setSettings(result);
        console.log('Ваше место положение', result);
      }).catch((e) => {
        setCurrentMode(DisplayMode.SEARCH);
      });
    }

    if(settings) {
      setCurrentMode(DisplayMode.WEATHERS);
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <input type='number' onChange={handleMode}/>
      <div className={s.root}>
        {React.createElement(components[currentMode])}
      </div>
    </Suspense>
  );
};

export default App;
