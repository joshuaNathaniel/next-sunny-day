import { Translate } from 'next-translate'

export const getTranslations = <T extends Record<string, string>>(
  t: Translate,
  Enum: Record<number, string>
): T => {
  const translations: Record<string, string> = {}

  for (const value of Object.values(Enum)) {
    translations[value] = t(value)
  }

  return translations as T
}
