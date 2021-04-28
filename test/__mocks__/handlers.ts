import { rest } from 'msw'
import weather from './data/weather'
import get, { LocationRequest } from '../../pages/api/location/[[...geocoordinates]]'
import type { NextApiResponse } from 'next'
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../utils/app-constants'

export const forecastUrl = 'https://weather.mock'

export const handlers = [
  rest.get(forecastUrl, (req, res, ctx) => {
    return res(ctx.json(weather))
  }),
  rest.get('https://api.weather.gov/points/0,0', (req, res, ctx) => {
    return res(ctx.json(weather))
  }),
  rest.get('https://api.weather.gov/points/1,1', (req, res, ctx) => {
    return res(ctx.json(weather))
  }),
  rest.get('https://api.weather.gov/points/1,2', () => {
    throw new Error('')
  }),
  rest.get(
    `https://api.weather.gov/points/${DEFAULT_LATITUDE},${DEFAULT_LONGITUDE}`,
    (req, res, ctx) => {
      return res(ctx.json(weather))
    }
  ),
]

export const nextHandlers = [
  rest.get('https://next-sunny-day/api/location/0/0', (req, res, ctx) => {
    return res(ctx.json({ date: weather.properties.periods[2].startTime }))
  }),
  rest.get('https://next-sunny-day/api/location/1', async (req, res, ctx) => {
    let actualJson = null
    const mockRes = ({
      status: () => mockRes,
      json: (body: unknown) => (actualJson = body),
    } as unknown) as NextApiResponse
    await get(({ query: { geocoordinates: [] } } as unknown) as LocationRequest, mockRes)

    return res(ctx.json(actualJson))
  }),
  rest.get('https://next-sunny-day/api/location/', async (req, res, ctx) => {
    let actualJson = null
    const mockRes = ({
      status: () => mockRes,
      json: (body: unknown) => (actualJson = body),
    } as unknown) as NextApiResponse
    await get(({ query: {} } as unknown) as LocationRequest, mockRes)

    return res(ctx.json(actualJson))
  }),
  rest.get('https://next-sunny-day/api/location/1/1', async (req, res, ctx) => {
    let actualJson = null
    const mockRes = ({
      status: () => mockRes,
      json: (body: unknown) => (actualJson = body),
    } as unknown) as NextApiResponse
    await get(({ query: { geocoordinates: [1, 1] } } as unknown) as LocationRequest, mockRes)

    return res(ctx.json(actualJson))
  }),
  rest.get('https://next-sunny-day/api/location/1/2', async (req, res, ctx) => {
    let actualStatus = null
    const mockRes = ({
      status: (statusCode: number) => {
        actualStatus = statusCode

        return mockRes
      },
      json: () => null,
    } as unknown) as NextApiResponse
    await get(({ query: { geocoordinates: [1, 2] } } as unknown) as LocationRequest, mockRes)

    return res(ctx.json({ status: actualStatus }))
  }),
]
