import {create} from 'zustand'
import * as dayjs from 'dayjs'
import * as Localization from 'expo-localization'
import {persist, createJSONStorage} from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import 'dayjs/locale/fr'

import {i18n} from './i18n'

type LocaleState = {
  locale: 'fr' | 'en'
  setLocale: (locale: LocaleState['locale']) => void
}

const initialLocale: LocaleState['locale'] = Localization.locale.startsWith(
  'fr',
)
  ? 'fr'
  : 'en'
const changeAppLanguage = (locale: LocaleState['locale']) => {
  dayjs.locale(locale)
  i18n.locale = locale
}
changeAppLanguage(initialLocale)

export const useLocalStore = create<LocaleState>()(
  persist(
    set => ({
      locale: initialLocale,
      setLocale: locale => {
        changeAppLanguage(locale)
        set({locale})
      },
    }),
    {
      name: 'locale-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.warn('an error happened during hydration', error)
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

type ColorSchemeState = {
  colorScheme: 'light' | 'dark'
  setColorScheme: (colorScheme: ColorSchemeState['colorScheme']) => void
  toggleColorScheme: () => void
}

export const useColorSchemeStore = create<ColorSchemeState>()(
  persist(
    set => ({
      colorScheme: 'dark',
      setColorScheme: colorScheme => set({colorScheme}),
      toggleColorScheme: () =>
        set(state => ({
          colorScheme: state.colorScheme === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'color-scheme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
