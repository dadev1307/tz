export interface WeatherResult {
  city: string,
  country: string,
  iconName: string,
  iconUrl: string,
  description: string,
  windDeg: number,
  windSpeed: number,
  temp: number,
  humidity: number,
  pressure: number,
  feelsLike: number,
  visibility: number
}