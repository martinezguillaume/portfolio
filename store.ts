import {create} from 'zustand'
import * as dayjs from 'dayjs'
import * as Localization from 'expo-localization'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'dayjs/locale/fr'

import {i18n} from './i18n'

type AppState = {
  locale: 'fr' | 'en'
  setLocale: (locale: AppState['locale']) => void
}

const initialLocale: AppState['locale'] = Localization.locale.startsWith('fr')
  ? 'fr'
  : 'en'
const changeAppLanguage = (locale: AppState['locale']) => {
  dayjs.locale(locale)
  i18n.locale = locale
}
changeAppLanguage(initialLocale)

export const useAppStore = create<AppState>()(
  persist(
    set => ({
      locale: initialLocale,
      setLocale: locale => {
        changeAppLanguage(locale)
        set({locale})
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.log('an error happened during hydration', error)
          } else {
            if (state?.locale) {
              changeAppLanguage(state.locale)
            }
          }
        }
      },
    },
  ),
)
