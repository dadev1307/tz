export const meterToKilometer = (meter: number):number => {
  return +(meter / 1000).toFixed(1);
}

export const kilometerHToMeterS = (kmh:number):number => {
  return +((kmh / 3.6).toFixed(2));
}

export const millibarsToMillimeter = (mb: number):number => {
  return Math.round(mb * 0.75006375541921);
}

export const getGeoPosition = ():Promise<GeolocationPosition> => {
  const geo = navigator.geolocation;
  return new Promise((resolve, reject)=> {
    geo.getCurrentPosition(succes => {
      return resolve(succes);
    },(err)=> {
      return reject(err);
    })
  })
}