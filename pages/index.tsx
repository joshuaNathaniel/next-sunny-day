import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'

import HomeHead from '../components/HomeHead'
import SunnyDayLoader from '../components/SunnyDayLoader'
import SunnyDay from '../components/SunnyDay'
import { getTranslations } from '../utils/translations'

enum Translation {
  DESCRIPTION = 'description',
  KEYWORDS = 'keywords',
  TITLE = 'title',
}

type HomeTranslations = {
  description: string
  keywords: string
  title: string
}

const Home: FC<never> = (): JSX.Element => {
  const { t } = useTranslation('common')
  const translations: HomeTranslations = getTranslations<HomeTranslations>(t, Translation)
  const { title } = translations

  return (
    <>
      <HomeHead {...translations} />
      <main>
        <h1 id="title">{title}</h1>
        <h1 id="sunny-day-container">
          <SunnyDay loader={SunnyDayLoader} />
        </h1>
      </main>
    </>
  )
}

export async function getStaticProps(): Promise<{ props: unknown }> {
  return {
    props: {},
  }
}

export default Home
