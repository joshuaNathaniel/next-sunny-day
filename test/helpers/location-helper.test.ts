import { setupServer, SetupServerApi } from 'msw/node'
import {
  fetchForecast,
  fetchForecastURL,
  findNextSunnyDay,
  WeatherPeriod,
} from '../../helpers/location-helper'
import { forecastUrl, handlers } from '../__mocks__/handlers'
import weather from '../__mocks__/data/weather'

describe('location-helper', () => {
  let server: SetupServerApi

  beforeAll(() => {
    server = setupServer(...handlers)
    server.listen()
  })

  afterAll(() => {
    server.close()
  })

  describe('fetchForecast', () => {
    it('should return weather periods', async () => {
      const actualPeriods = await fetchForecast({ forecast: { url: forecastUrl } })

      expect(actualPeriods).toStrictEqual(weather.properties.periods)
    })
  })

  describe('fetchForecastURL', () => {
    const latitude = '0',
      longitude = '0'

    it('should return a url to fetch weather periods', async () => {
      const {
        forecast: { url },
      } = await fetchForecastURL(latitude, longitude)

      expect(url).toStrictEqual(forecastUrl)
    })
  })

  describe('findNextSunnyDay', () => {
    it('should find the date of the next sunny weather period', () => {
      const date = findNextSunnyDay(weather.properties.periods)

      expect(date).toBe(weather.properties.periods[2].startTime)
    })

    it('should not find the date of the next sunny weather period', () => {
      const expectedPeriods: WeatherPeriod[] = [],
        date = findNextSunnyDay(expectedPeriods)

      expect(date).toBe(undefined)
    })
  })
})
