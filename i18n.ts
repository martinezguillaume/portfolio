import {I18n} from 'i18n-js'

import en from './locales/en.json'
import fr from './locales/fr.json'

export const i18n = new I18n({
  en,
  fr,
})
i18n.enableFallback = true
