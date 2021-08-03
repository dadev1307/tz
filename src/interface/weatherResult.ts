export interface WeatherResult {
  city: string,
  tempC: number,
  tempF: number,
  condition: Condition,
  wind: Wind,
  preacure: Preacure,
  humidity: number,
  hour: WeatherHour[]
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
  milibars: number,
  millimeter: number,
  inches: number
}

interface WeatherHour {
  time: string,
  timeEpoch: number,
  tempC: number,
  tempF:number,
  condition: Condition
}