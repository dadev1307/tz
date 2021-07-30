import {WeatherData} from '../interface/weatherData';
import {WeatherResult} from '../interface/weatherResult';
import { meterToKilometer } from './utils';

const WEATHER_BASE = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=92a5e3077a957bda5e2ec140dfdef682';
const WEATHER_ICON_BASE = 'https://openweathermap.org/img/wn';



function getWeatherData(data: WeatherData):WeatherResult {
    const result: WeatherResult = {
        city: data.name,
        country: data.sys.country,
        iconName: data.weather[0].icon,
        iconUrl: `${WEATHER_ICON_BASE}/${data.weather[0].icon}@2x.png`,
        description: data.weather[0].description,
        windDeg: data.wind.deg,
        windSpeed: data.wind.speed,
        temp: data.main.temp,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        feelsLike: data.main.feels_like,
        visibility: meterToKilometer(data.visibility)
    }
    return result;
}


export default async (city: string | null):Promise<WeatherResult> => {
    let URL = WEATHER_BASE;
    
    let weatherData = await fetch(URL).then(data => {
        if(data.ok) {
            return data.json();
        }
        throw new Error('City not found');
    }).then(result => result);
    
    return getWeatherData(weatherData);
    
}

