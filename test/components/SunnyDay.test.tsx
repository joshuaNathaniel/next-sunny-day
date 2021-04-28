import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import SunnyDay from '../../components/SunnyDay'
import Sun from '../../components/SunnyDayLoader'
import { clientSideHandler } from '../../pages/api/location/[[...geocoordinates]]'

jest.spyOn(console, 'error')
jest.mock('react-geolocated', () => ({
  geolocated: () => (component: unknown) => component,
}))
jest.mock('../../pages/api/location/[[...geocoordinates]]')

const clientSideHandlerMock = clientSideHandler as jest.MockedFunction<() => Promise<string>>

describe('SunnyDay', () => {
  it('should show an unsupported message when geolocation is unavailable', async () => {
    SunnyDay.defaultProps = {
      isGeolocationAvailable: false,
      isGeolocationEnabled: false,
    }

    render(<SunnyDay loader={Sun} />)

    expect(await screen.findByText('common:notSupported')).toBeInTheDocument()
  })

  it('should show a prompt to allow device location', async () => {
    SunnyDay.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: false,
    }

    render(<SunnyDay loader={Sun} />)

    expect(await screen.findByText('common:prompt')).toBeInTheDocument()
  })

  it('should show a loader until coords are available', async () => {
    SunnyDay.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
    }

    render(<SunnyDay loader={Sun} />)

    expect(await screen.findByTestId('Sun')).toBeInTheDocument()
  })

  it('should show a loader until latitude and longitude are available', async () => {
    SunnyDay.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
      coords: {},
    }

    render(<SunnyDay loader={Sun} />)

    expect(await screen.findByTestId('Sun')).toBeInTheDocument()
  })

  it('should show a message if latitude is missing', async () => {
    SunnyDay.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
      coords: {
        longitude: '0',
      },
    }

    render(<SunnyDay loader={Sun} />)

    expect(await screen.findByText('common:deviceIssue')).toBeInTheDocument()
  })

  it('should show a message if longitude is missing', async () => {
    SunnyDay.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
      coords: {
        latitude: '0',
      },
    }

    render(<SunnyDay loader={Sun} />)

    expect(await screen.findByText('common:deviceIssue')).toBeInTheDocument()
  })

  it('should show the date', async () => {
    SunnyDay.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
      coords: {
        latitude: '0',
        longitude: '0',
      },
    }
    clientSideHandlerMock.mockResolvedValue('04/26/2021')

    render(<SunnyDay loader={Sun} />)

    expect(await screen.findByText('04/26/2021')).toBeInTheDocument()
  })

  it('should show the date', async () => {
    SunnyDay.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
      coords: {
        latitude: '0',
        longitude: '0',
      },
    }
    clientSideHandlerMock.mockResolvedValueOnce('04/27/2021')

    render(<SunnyDay loader={Sun} />)

    expect(await screen.findByText('04/27/2021')).toBeInTheDocument()
  })

  it('should handle an error', async () => {
    SunnyDay.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
      coords: {
        latitude: '0',
        longitude: '0',
      },
    }
    clientSideHandlerMock.mockRejectedValueOnce(new Error('Invalid Date'))

    render(<SunnyDay loader={Sun} />)

    expect(await screen.findByText('common:error')).toBeInTheDocument()
  })
})
