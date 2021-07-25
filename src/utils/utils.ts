export const meterToKilometer = (meter: number):number => {
  return +(meter / 1000).toFixed(1);
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