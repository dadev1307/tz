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