import {WeatherData} from '../interface/weatherData';
import {WeatherResult} from '../interface/weatherResult';
import { meterToKilometer } from './utils';

const WEATHER_BASE = 'http://api.weatherapi.com/v1/forecast.json';

const KEY = '64150b20e9c7424794b90444212807';
const SEARCH_BASE = 'http://api.weatherapi.com/v1/search.json';



function AdapterWeatherDataToWeatherResult(data: WeatherData):WeatherResult {
    const wr:WeatherResult = {};
    wr.city = data.location.name;
}


export default async (city: string | null):Promise<WeatherResult> => {
    let URL = WEATHER_BASE;
    
    let weatherData = await fetch(URL).then(data => {
        if(data.ok) {
            return data.json();
        }
        throw new Error('City not found');
    }).then(result => result);
    
    return AdapterWeatherDataToWeatherResult(weatherData);
    
}

