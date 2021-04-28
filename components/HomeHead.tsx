import { FC } from 'react'
import Head from 'next/Head'

interface IHomeHeadProps {
  description: string
  keywords: string
  title: string
}

const HomeHead: FC<IHomeHeadProps> = ({
  description,
  keywords,
  title,
}: IHomeHeadProps): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet={'UTF-8'} />
      <meta name={'description'} content={description} />
      <meta name={'keywords'} content={keywords} />
      <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'} />
    </Head>
  )
}

export default HomeHead
