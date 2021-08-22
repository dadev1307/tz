import {WeatherData, Hour} from '../interface/weatherData';
import {WeatherResult, WeatherHour} from '../interface/weatherResult';
import {kilometerHToMeterS, millibarsToMillimeter} from './utils';
import {SearchData} from "../interface/SearchData";

const WEATHER_BASE = 'http://api.weatherapi.com/v1/forecast.json';

const KEY = '64150b20e9c7424794b90444212807';
const SEARCH_BASE = 'http://api.weatherapi.com/v1/search.json';


function AdapterWeatherHour(data: Hour): WeatherHour {
    const wh: WeatherHour = {
        condition: data.condition,
        tempC: Math.round(data.temp_c),
        tempF: Math.round(data.temp_f),
        time: data.time,
        timeEpoch: data.time_epoch
    }
    return wh;
}

function AdapterWeatherDataToWeatherResult(data: WeatherData, isHour: boolean): WeatherResult {
    const wr: WeatherResult = {
        id: `${data.location.localtime}x${data.location.lon}`,
        city: data.location.name,
        tempC: Math.round(data.current.temp_c),
        tempF: Math.round(data.current.temp_f),
        lat: data.location.lat,
        lon: data.location.lon,
        condition: data.current.condition,
        hour: data.forecast.forecastday[0].hour.map((item) => AdapterWeatherHour(item)).slice(9).filter((it, idx) => idx % 3 === 0),
        wind: {
            speedKilometerPerHour: data.current.wind_kph,
            speedMeterPerSeconds: kilometerHToMeterS(data.current.wind_kph)
        },
        humidity: data.current.humidity,
        preacure: {
            millibars: data.current.pressure_mb,
            inches: data.current.precip_in,
            millimeter: millibarsToMillimeter(data.current.pressure_mb)
        },
        params: [],
        isShowHour: isHour
    };
    wr.params = [
        {
            iconName: 'barometer',
            name: 'Давление',
            units: 'мм',
            value: wr.preacure.millimeter
        },
        {
            iconName: 'wind',
            name: 'Ветер',
            units: 'м/с',
            value: wr.wind.speedMeterPerSeconds
        },
        {
            iconName: 'humidity',
            name: 'Влажность',
            units: '%',
            value: wr.humidity
        }
    ]

    return wr;
}



export const searchCity = async (city: string): Promise<SearchData[]> => {
    const url = `${SEARCH_BASE}?key=${KEY}&lang=ru&q=${city}`;
    return fetch(url).then(res => res.json());
}

export const getWither = async (geo: string, isHour: boolean = false): Promise<WeatherResult> => {
    const url = `${WEATHER_BASE}?key=${KEY}&lang=ru&q=${geo}`;
    return fetch(url).then(res => res.json()).then(res => AdapterWeatherDataToWeatherResult(res, isHour));
}


