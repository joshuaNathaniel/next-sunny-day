import fetch from 'isomorphic-unfetch'

enum ShortForecast {
  SUNNY = 'Sunny',
}

type ForecastURL = {
  forecast: {
    url: string
  }
}

export type WeatherPeriod = {
  shortForecast: string
  startTime: string
}

const getWeatherVendorApiUrl = (
  latitude: string | number,
  longitude: string | number
): string /** Looking for <any>? Gotcha! **/ =>
  `https://api.weather.gov/points/${latitude},${longitude}`

export const fetchForecast = async ({
  forecast: { url },
}: ForecastURL): Promise<WeatherPeriod[]> => {
  const forecastResponse = await fetch(url)
  const {
    properties: { periods },
  } = await forecastResponse.json()

  return periods
}

export const fetchForecastURL = async (
  latitude: string,
  longitude: string
): Promise<ForecastURL> => {
  const response = await fetch(getWeatherVendorApiUrl(latitude, longitude))
  const {
    properties: { forecast: url },
  } = await response.json()

  return {
    forecast: {
      url,
    },
  }
}

export const findNextSunnyDay = (periods: WeatherPeriod[]): string | undefined => {
  const { startTime } =
    periods.find(
      ({ shortForecast }: { shortForecast: string }) => shortForecast === ShortForecast.SUNNY
    ) ?? {}

  return startTime
}
