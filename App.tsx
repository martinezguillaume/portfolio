import { INativebaseConfig, NativeBaseProvider, StorageManager } from 'native-base'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Font from 'expo-font'
import { Feather, MaterialCommunityIcons } from '@native-base/icons'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'

import { Navigation } from './navigation'
import { theme } from './theme'
import { useAppStore } from './store'

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
  const locale = useAppStore((state) => state.locale)

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
        <Navigation key={locale} />
      </NativeBaseProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
})
