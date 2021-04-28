import { setupServer, SetupServerApi } from 'msw/node'
import fetch from 'isomorphic-unfetch'

import { clientSideHandler } from '../../../../pages/api/location/[[...geocoordinates]]'
import { nextHandlers, handlers } from '../../../__mocks__/handlers'
import weather from '../../../__mocks__/data/weather'

describe('location/latitude/longitude', () => {
  describe('get', () => {
    let server: SetupServerApi

    beforeAll(() => {
      server = setupServer(...handlers, ...nextHandlers)
      server.listen()
    })

    afterAll(() => {
      server.close()
    })

    it('should return a date', async () => {
      const response = await fetch('https://next-sunny-day/api/location/1/1')
      const { date } = await response.json()

      expect(date).toStrictEqual(weather.properties.periods[2].startTime)
    })

    it('should use default geolocation to return a date', async () => {
      const response = await fetch('https://next-sunny-day/api/location/1')
      const { date } = await response.json()

      expect(date).toStrictEqual(weather.properties.periods[2].startTime)
    })

    it('should use default geolocation given an empty query to return a date', async () => {
      const response = await fetch('https://next-sunny-day/api/location/')
      const { date } = await response.json()

      expect(date).toStrictEqual(weather.properties.periods[2].startTime)
    })

    it('should throw a 500', async () => {
      const response = await fetch('https://next-sunny-day/api/location/1/2')
      const { status } = await response.json()

      expect(status).toStrictEqual(500)
    })
  })

  describe('clientSideHandler', () => {
    let server: SetupServerApi

    beforeAll(() => {
      server = setupServer(...nextHandlers)
      server.listen()
    })

    afterAll(() => {
      server.close()
    })
    it('should', async () => {
      const date = await clientSideHandler('0', '0', 'https://next-sunny-day')

      expect(date).toStrictEqual(weather.properties.periods[2].startTime)
    })
  })
})
