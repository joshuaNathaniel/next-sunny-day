import { FC, useEffect, useState } from 'react'
import { geolocated, GeolocatedProps } from 'react-geolocated'
import useTranslation from 'next-translate/useTranslation'

import { clientSideHandler as loadSunnyDay } from '../pages/api/location/[[...geocoordinates]]'
import { I18n } from 'next-translate'
import { getTranslations } from '../utils/translations'

enum Translation {
  DEVICE_ISSUE = 'deviceIssue',
  ERROR = 'error',
  PROMPT = 'prompt',
  NOT_SUPPORTED = 'notSupported',
}

type SunnyDayTranslations = {
  deviceIssue: string
  error: string
  prompt: string
  notSupported: string
}

export interface ISunnyDayProps extends GeolocatedProps {
  loader: FC
}

const SunnyDay: FC<ISunnyDayProps> = ({
  coords,
  isGeolocationAvailable,
  isGeolocationEnabled,
  loader: Loader,
}: ISunnyDayProps): JSX.Element => {
  const { t }: I18n = useTranslation('common')
  const { deviceIssue, error, prompt, notSupported } = getTranslations<SunnyDayTranslations>(
    t,
    Translation
  )
  const [date, setDate] = useState<string | null>(null)
  const { latitude, longitude } = coords ?? {}

  useEffect(() => {
    if (latitude && longitude) {
      loadSunnyDay(latitude, longitude)
        .then((value) => {
          return setDate(value)
        })
        .catch(() => {
          return setDate(error)
        })
    }
  }, [error, latitude, longitude])

  if (!isGeolocationAvailable && !isGeolocationEnabled) {
    return <>{notSupported}</>
  } else if (!isGeolocationEnabled) {
    return <>{prompt}</>
  } else if ((latitude && !longitude) || (!latitude && longitude)) {
    return <>{deviceIssue}</>
  } else if ((isGeolocationEnabled && !(latitude && latitude)) || !date) {
    return <Loader />
  } else {
    return <>{date}</>
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
})(SunnyDay)
