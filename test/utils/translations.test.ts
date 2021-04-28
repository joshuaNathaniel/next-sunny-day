import { getTranslations } from '../../utils/translations'
import { Translate } from 'next-translate'

type Translations = {
  first?: string
  second?: string
  third?: string
}

const t: (value: string) => string = (value: string) => value

describe('translations', () => {
  describe('getTranslations', () => {
    it('should return all translated values', () => {
      enum Translation {
        FIRST = 'first',
        SECOND = 'second',
        THIRD = 'third',
      }
      const translations = getTranslations<Translations>(t as Translate, Translation)

      expect(translations).toEqual({
        first: 'first',
        second: 'second',
        third: 'third',
      })
    })
  })
})
