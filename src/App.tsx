import React, {lazy, Suspense, useEffect, useState} from 'react';
import s from './App.module.scss';
import {DisplayMode} from './interface/displayMode';
import {getGeoPosition} from './utils/utils';
import {WeatherResult} from './interface/weatherResult';
import {Error} from './interface/Error';
import useLocalStorage from './hook/useLocalStorage';
import WindowLoader from "./components/WindowLoader";
import {SettingsProvider} from "./context/settingsContext";
import {getWither} from "./utils/fetchHelpers";


const SearchCity = lazy(() => import('./components/SearchCity'));
const Settings = lazy(() => import('./components/Settings'));
const Weathers = lazy(() => import('./components/Weathers'));
const ErrorModal = lazy(() => import('./components/ErrorModal'));
const Weather = lazy(() => import('./components/Weather'));

const App = () => {
    const [settings, setSettings] = useLocalStorage();
    const [wither, setWither] = useState<WeatherResult | null>(null);
    const [currentMode, setCurrentMode] = useState<DisplayMode>(DisplayMode.LOADER);
    const [error, setError] = useState<Error | null>(null);
    

    useEffect(() => {
        if (!settings) {
            getGeoPosition().then(result => {
                const {latitude, longitude} = result.coords;
                getWither(`${latitude},${longitude}`).then(res => {
                    setWither(res);
                    setCurrentMode(DisplayMode.WEATHERS);
                })
                
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

        if (settings) {
            setCurrentMode(DisplayMode.WEATHERS);
        }
    }, []);

    return (
        <SettingsProvider>
            <Suspense fallback={<WindowLoader/>}>
                <div className={s.root}>
                    {error && <ErrorModal error={error}/>}
                    {currentMode === DisplayMode.WEATHERS && 
                    <Weathers showSettings={() => {setCurrentMode(DisplayMode.SETTINGS)}}>
                        <Weather data={wither} />
                    </Weathers>}
                    
                    {currentMode === DisplayMode.SETTINGS && <Settings closeSettings={()=>{setCurrentMode(DisplayMode.WEATHERS)}} />}
                    {currentMode === DisplayMode.SEARCH && <SearchCity />}
                </div>
            </Suspense>
        </SettingsProvider>
    );
};

export default App;
