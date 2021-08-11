const condition:ICondition = {
    "1000": "sunny",
    "1003": "cloudy",
    "1006": "cloudy",
    "1009": "cloud",
    "1030": "cloud",
    "1063": "rain",
    "1066": "snow",
    "1069": "snow",
    "1072": "snow",
    "1087": "stormSnowers",
    "1114": "snow",
    "1117": "snow",
    "1135": "cloudy",
    "1147": "cloudy",
    "1150": "rain",
    "1153": "rain",
    "1168": "rain",
    "1171": "rain",
    "1180": "rain",
    "1183": "rain",
    "1186": "rain",
    "1189": "rain",
    "1192": "rain",
    "1195": "rain",
    "1198": "rain",
    "1201": "rain",
    "1204": "snow",
    "1207": "snow",
    "1210": "snow",
    "1213": "snow",
    "1216": "snow",
    "1219": "snow",
    "1222": "snow",
    "1225": "snow",
    "1237": "snow",
    "1240": "rain",
    "1243": "rain",
    "1246": "rain",
    "1249": "rain",
    "1252": "snow",
    "1255": "snow",
    "1258": "snow",
    "1261": "snow",
    "1264": "snow",
    "1273": "stormSnowers",
    "1276": "stormSnowers",
    "1279": "stormSnowers",
    "1282": "stormSnowers"
}
interface ICondition {
    [T:string]: string
}

export const meterToKilometer = (meter: number): number => {
    return +(meter / 1000).toFixed(1);
}

export const kilometerHToMeterS = (kmh: number): number => {
    return Math.round(kmh / 3.6);
}

export const millibarsToMillimeter = (mb: number): number => {
    return Math.round(mb * 0.75006375541921);
}

export const getTime = (date: string | Date): string => {
    const d = new Date(date);
    const h = d.getHours();
    const m = d.getMinutes();

    return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
}

export const getGeoPosition = (): Promise<GeolocationPosition> => {
    const geo = navigator.geolocation;
    return new Promise((resolve, reject) => {
        geo.getCurrentPosition(succes => {
            return resolve(succes);
        }, (err) => {
            return reject(err);
        })
    })
}

export const getIconByCode = (code: number):string => {
    return condition[code]
}