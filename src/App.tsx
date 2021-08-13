import React, {lazy, Suspense, useEffect, useState} from 'react';
import s from './App.module.scss';
import {DisplayMode} from './interface/displayMode';
import {getGeoPosition} from './utils/utils';
import {WeatherResult} from './interface/weatherResult';
import {Error} from './interface/Error';
import useLocalStorage from './hook/useLocalStorage';
import WindowLoader from "./components/WindowLoader";
import {ICity, useSettings} from "./context/settingsContext";
import {getWither} from "./utils/fetchHelpers";
import SearchCity from "./components/SearchCity";


const SearchCityWindow = lazy(() => import('./components/SearchCityWindow'));
const Settings = lazy(() => import('./components/Settings'));
const Weathers = lazy(() => import('./components/Weathers'));
const ErrorModal = lazy(() => import('./components/ErrorModal'));
const Weather = lazy(() => import('./components/Weather'));

const App = () => {
    const [settingsStorage, setSettingsStorage] = useLocalStorage();
    const [withers, setWithers] = useState<WeatherResult[]>([]);
    const [currentMode, setCurrentMode] = useState<DisplayMode>(DisplayMode.LOADER);
    const [error, setError] = useState<Error | null>(null);
    const settings = useSettings();

    const autoSearchCurrentPosition = () => {
        getGeoPosition().then(result => {
            const {latitude, longitude} = result.coords;

            getWither(`${latitude},${longitude}`).then((res) => {
                setWithers([res]);
                settings.setSettings({...settings, citys: [{name: res.city, lat: latitude, lon: longitude, isHour: false}]})
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
    
    const autoSearchCitys = () => {
        Promise.all(settingsStorage.citys.map((city: ICity) => {
            return getWither(`${city.lat},${city.lon}`, city.isHour);
        })).then((res) => {
            // @ts-ignore
            setWithers(res);
            setCurrentMode(DisplayMode.WEATHERS);
        }).catch((e) => {
            setError({
                icon: 'warning',
                title: 'Произошла ошибка :(',
                text: 'Пожалуйста введите город вручную',
                btnText: 'Ввести',
                handleError: () => {
                    setError(null);
                    setCurrentMode(DisplayMode.SEARCH);
                }
            })
        });
    }
    
    const getCityWeather = (nameCity: string) => {
        getWither(nameCity).then((res) => {
            settings.setSettings({...settings, citys: [...settings.citys, {name: res.city, lat: res.lat, lon: res.lon, isHour: false}]})
            setWithers([...withers, res]);
            setCurrentMode(DisplayMode.WEATHERS);
        })
    }

    useEffect(() => {
        if(settingsStorage) {
           settings.setSettings({...settings, ...settingsStorage}); 
        }
        if (!settingsStorage.citys.length) {
            autoSearchCurrentPosition();
        } else {
            autoSearchCitys();
        }

    }, []);

    return (
        <Suspense fallback={<WindowLoader/>}>
            <div className={s.root}>
                {error && <ErrorModal error={error}/>}
                {currentMode === DisplayMode.WEATHERS &&
                <Weathers showSettings={() => {
                    setCurrentMode(DisplayMode.SETTINGS)
                }}>
                    {withers && withers.map((wither, idx) => <Weather key={`${wither.lat}${wither.lon}`} idx={idx} data={wither}/>)}
                </Weathers>}

                {currentMode === DisplayMode.SETTINGS && <Settings closeSettings={() => {
                    setCurrentMode(DisplayMode.WEATHERS)
                }}/>}
                {currentMode === DisplayMode.SEARCH && <SearchCityWindow><SearchCity getCityWeather={getCityWeather}/></SearchCityWindow>}
                {currentMode === DisplayMode.LOADER && <WindowLoader/>}
            </div>
        </Suspense>
    );
};

export default App;
