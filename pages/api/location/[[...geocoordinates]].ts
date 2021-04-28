import type { NextApiRequest, NextApiResponse } from 'next'

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '../../../utils/app-constants'
import { fetchForecast, fetchForecastURL, findNextSunnyDay } from '../../../helpers/location-helper'

export type GeoRequest = { query: { geocoordinates: string[] } }
export type LocationRequest = NextApiRequest & GeoRequest

export const clientSideHandler = async (
  latitude: string,
  longitude: string,
  host?: string
): Promise<string> => {
  const response = await fetch(`${host ?? ''}/api/location/${latitude}/${longitude}`)
  const { date } = await response.json()

  return new Date(date).toLocaleDateString()
}

const get = async (
  {
    query: {
      geocoordinates: [
        latitude = DEFAULT_LATITUDE.toString(),
        longitude = DEFAULT_LONGITUDE.toString(),
      ] = [],
    },
  }: LocationRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const forecastUrl = await fetchForecastURL(latitude, longitude)
    const forecast = await fetchForecast(forecastUrl)
    const date = findNextSunnyDay(forecast)

    res.status(200).json({ date })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default get
