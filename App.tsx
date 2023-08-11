import { INativebaseConfig, NativeBaseProvider, StorageManager } from 'native-base'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18n-js'
import * as Localization from 'expo-localization'
import * as Font from 'expo-font'
import { Feather, MaterialCommunityIcons } from '@native-base/icons'
import { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

import { Navigation } from './navigation'
import en from './locales/en.json'
import fr from './locales/fr.json'
import { theme } from './theme'

// Localization config
const locale = Localization.locale.substring(0, 2)
/* eslint-disable import/no-named-as-default-member */
dayjs.locale(locale)
i18n.translations = {
  en,
  fr,
}
i18n.locale = locale
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
  theme,
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        // const cacheImages = Object.values(IMAGES).map((image) =>
        //   Asset.fromModule(image).downloadAsync()
        // )
        const cacheFonts = [Feather.font, MaterialCommunityIcons.font].map((font) =>
          Font.loadAsync(font)
        )

        await Promise.all([...cacheFonts])
      } catch (e) {
        console.warn(e)
      } finally {
        // Tell the application to render
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View style={styles.flex} onLayout={onLayoutRootView}>
      <NativeBaseProvider colorModeManager={colorModeManager} config={config}>
        <Navigation />
      </NativeBaseProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
