import React, {lazy, Suspense, useEffect, useState} from 'react';
import s from './App.module.scss';
import {DisplayMode} from './interface/displayMode';
import {getGeoPosition} from './utils/utils';
import {WeatherResult} from './interface/weatherResult';
import {Error} from './interface/Error';
import useLocalStorage from './hook/useLocalStorage';
import Loader from "./components/Loader";


const SearchCity = lazy(() => import('./components/SearchCity'));
const Settings = lazy(() => import('./components/Settings'));
const Weathers = lazy(() => import('./components/Weathers'));
const ErrorModal = lazy(() => import('./components/ErrorModal'));

const App = () => {
  const [settings, setSettings] = useLocalStorage();
  const [wither, setWither] = useState<WeatherResult | null>(null);
  const [currentMode, setCurrentMode] = useState<DisplayMode>(DisplayMode.LOADER);
  const [error, setError] = useState<Error | null>(null);
  

  const components = {
    [DisplayMode.LOADER]: Loader,
    [DisplayMode.SEARCH]: SearchCity, 
    [DisplayMode.SETTINGS]: Settings,
    [DisplayMode.WEATHERS]: Weathers
  }

  useEffect(() => {
    if (!settings) {
      getGeoPosition().then(result => {
        setCurrentMode(DisplayMode.WEATHERS);
      }).catch((e) => {
        setError({
          icon: 'warning',
          title: 'Не удалось определить местоположение',
          text: 'Пожалуйста введите город вручную',
          btnText: 'Ввести',
          handleError: () => {
            setError(null);
            setCurrentMode(DisplayMode.SEARCH);
          }
        })
      });
    }

    if(settings) {
      setCurrentMode(DisplayMode.WEATHERS);
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className={s.root}>
        { error && <ErrorModal error={error}  /> }
        {React.createElement(components[currentMode], {
          showSettings(){setCurrentMode(DisplayMode.SETTINGS)}
        })}
      </div>
    </Suspense>
  );
};

export default App;
