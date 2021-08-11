export interface WeatherResult {
  city: string,
  tempC: number,
  tempF: number,
  lat: number,
  lon: number,
  condition: Condition,
  wind: Wind,
  preacure: Preacure,
  humidity: number,
  hour: WeatherHour[],
  params: ParamItem[],
  isShowHour: boolean
}

export interface ParamItem {
  iconName: string,
  name: string,
  units: string,
  value: string | number
}

interface Condition {
  text: string,
  code: number
}

interface Wind {
  speedMeterPerSeconds: number,
  speedKilometerPerHour: number,
}

interface Preacure {
  millibars: number,
  millimeter: number,
  inches: number
}

export interface WeatherHour {
  time: string,
  timeEpoch: number,
  tempC: number,
  tempF:number,
  condition: Condition
}