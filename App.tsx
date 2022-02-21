import { INativebaseConfig, NativeBaseProvider, StorageManager } from 'native-base'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18n-js'
import * as Localization from 'expo-localization'
import { Asset } from 'expo-asset'
import { useCallback, useState } from 'react'
import AppLoading from 'expo-app-loading'

import { Navigation } from './navigation'
import en from './locales/en.json'
import fr from './locales/fr.json'
import { IMAGES } from './assets'

// Localization config
/* eslint-disable import/no-named-as-default-member */
i18n.translations = {
  en,
  fr,
}
i18n.locale = Localization.locale.substring(0, 2)
i18n.fallbacks = 'en'
/* eslint-enable import/no-named-as-default-member */

// Native Base config
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      const val = await AsyncStorage.getItem('@color-mode')
      return val === 'dark' ? 'dark' : 'light'
    } catch (e) {
      return 'dark'
    }
  },
  set: async (value) => {
    try {
      if (value) {
        await AsyncStorage.setItem('@color-mode', value)
      }
    } catch (e) {
      console.log(e)
    }
  },
}
const config: INativebaseConfig = {
  strictMode: 'error',
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  const loadAssets = useCallback(async () => {
    const cacheImages = Object.values(IMAGES).map((image) => {
      return Asset.fromModule(image).downloadAsync()
    })

    await Promise.all([cacheImages])
  }, [])

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAssets}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <NativeBaseProvider colorModeManager={colorModeManager} config={config}>
      <Navigation />
    </NativeBaseProvider>
  )
}
