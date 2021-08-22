import React, {lazy, Suspense, useEffect, useState} from 'react';
import s from './App.module.scss';
import {DisplayMode} from './interface/displayMode';
import { citysWeatherToContextCitys, getGeoPosition } from './utils/utils';
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

    const addCityWeathers = (city: WeatherResult) => {
        const isCity = withers.find((item) => item.id === city.id);
        if(isCity) {
            setError({
                icon: 'warning',
                title: 'Место уже в списке',
                text: 'Местоположение которое вы ищите, уже находится в списке',
                btnText: 'Ок',
                handleError: () => {
                    setError(null);
                }
            })
            return;
        }
        settings.setSettings({...settings, citys: citysWeatherToContextCitys([...withers, city])});
        setWithers([...withers, city]);
    }

    const autoSearchCurrentPosition = () => {
        getGeoPosition().then(result => {
            const {latitude, longitude} = result.coords;

            getWither(`${latitude},${longitude}`).then((res) => {
                addCityWeathers(res);
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
            settings.setSettings({...settings, citys: citysWeatherToContextCitys([...withers, res])})
            setWithers([...withers, res]);
            setCurrentMode(DisplayMode.WEATHERS);
        })
    }

    const closeSettings = () => {
        if(withers.length){
            setCurrentMode(DisplayMode.WEATHERS);
        }else {
            setCurrentMode(DisplayMode.SEARCH);
        }

    }

    const addCity = (cityName: string) => {
        getWither(cityName).then(res => {
            addCityWeathers(res);
        }).catch(e => {
            setError({
                icon: 'error',
                title: 'Произошла ошибка :(',
                text: 'Не найдено подходящего местоположения',
                btnText: 'Закрыть',
                handleError: () => {
                    setError(null);
                }
            })
        })
    }
    const removeCity = (id: string) => {
        const weathersCitys = withers.filter((item) => item.id !== id);
        settings.setSettings({...settings, citys: citysWeatherToContextCitys(weathersCitys)});
        setWithers(weathersCitys);
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
                    {withers && withers.map((wither, idx) => <Weather key={wither.id} idx={idx} data={wither}/>)}
                    <div className={'ss'} draggable >123</div>
                    <div>144</div>
                </Weathers>}

                {currentMode === DisplayMode.SETTINGS && <Settings closeSettings={closeSettings} addCity={addCity} removeCity={removeCity} />}
                {currentMode === DisplayMode.SEARCH && <SearchCityWindow><SearchCity getCityWeather={getCityWeather}/></SearchCityWindow>}
                {currentMode === DisplayMode.LOADER && <WindowLoader/>}
            </div>
        </Suspense>
    );
};

export default App;
