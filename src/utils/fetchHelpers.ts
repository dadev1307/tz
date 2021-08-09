import {WeatherData, Hour} from '../interface/weatherData';
import {WeatherResult, WeatherHour} from '../interface/weatherResult';
import {kilometerHToMeterS, millibarsToMillimeter} from './utils';
import {SearchData} from "../interface/SearchData";

const WEATHER_BASE = 'http://api.weatherapi.com/v1/forecast.json';

const KEY = '64150b20e9c7424794b90444212807';
const SEARCH_BASE = 'http://api.weatherapi.com/v1/search.json';


function AdapterWeatherHour(data: Hour):WeatherHour {
    const wh:WeatherHour = {
        condition: data.condition,
        tempC: data.temp_c,
        tempF: data.temp_f,
        time: data.time,
        timeEpoch:data.time_epoch
    }
    return wh;
}

function AdapterWeatherDataToWeatherResult(data: WeatherData):WeatherResult {
    const wr:WeatherResult = {
        city: data.location.name,
        tempC: data.current.temp_c,
        tempF: data.current.temp_f,
        condition: data.current.condition,
        hour: data.forecast.forecastday[0].hour.map((item) => AdapterWeatherHour(item)),
        wind: {
            speedKilometerPerHour: data.current.wind_kph,
            speedMeterPerSeconds: kilometerHToMeterS(data.current.wind_kph)
        },
        humidity: data.current.humidity,
        preacure: {
            millibars: data.current.pressure_mb,
            inches: data.current.precip_in,
            millimeter: millibarsToMillimeter(data.current.pressure_mb)
        }
    };
    
    return wr;
}

export const searchCity = async (city: string):Promise<SearchData[]> => {
    let url = `${SEARCH_BASE}?key=${KEY}&lang=ru&q=${city}`;
    return await fetch(url).then(res=> res.json());
}

export const getWither = async (geo: string): Promise<WeatherResult> => {
    let url = `${WEATHER_BASE}?key=${KEY}&lang=ru&q=${geo}`;
    return await fetch(url).then(res => res.json()).then(res => AdapterWeatherDataToWeatherResult(res));
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

