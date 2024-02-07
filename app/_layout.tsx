import AsyncStorage from '@react-native-async-storage/async-storage'
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {useAssets} from 'expo-asset'
import {loadAsync, useFonts} from 'expo-font'
import {Slot, SplashScreen} from 'expo-router'
import * as SystemUI from 'expo-system-ui'
import {
  INativebaseConfig,
  NativeBaseProvider,
  StorageManager,
  useColorMode,
  useColorModeValue,
} from 'native-base'
import {ReactNode, useEffect} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import {useColorScheme} from 'nativewind'
import {View} from 'react-native'

import {useAppStore} from '@/store'
import {ICONS, IMAGES} from '@/assets'
import {theme} from '@/theme'
import {ThemeName, themes} from '@/themes'
import '../global.css'

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
  set: async value => {
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

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    ...Ionicons.font,
  })

  const [assets] = useAssets([
    ...Object.values(IMAGES),
    ...Object.values(ICONS),
  ])

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  useEffect(() => {
    loadAsync(Ionicons.font)
    if (fontsLoaded && assets) {
      SplashScreen.hideAsync()
    }
  }, [assets, fontsLoaded])

  if (!fontsLoaded || !assets) {
    return null
  }

  return <RootLayoutNav />
}

function Theme({name, children}: {name: ThemeName; children: ReactNode}) {
  const {colorScheme} = useColorScheme()
  return (
    <View className="flex-1" style={themes[name][colorScheme]}>
      {children}
    </View>
  )
}

function RootLayoutNav() {
  const locale = useAppStore(state => state.locale)
  const {colorMode} = useColorMode()
  const backgroundColor = useColorModeValue(
    DefaultTheme.colors.background,
    DarkTheme.colors.background,
  )

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(backgroundColor)
  }, [backgroundColor])

  return (
    <Theme name="twitter">
      <ThemeProvider value={colorMode === 'dark' ? DarkTheme : DefaultTheme}>
        <NativeBaseProvider colorModeManager={colorModeManager} config={config}>
          <Slot key={locale} />
        </NativeBaseProvider>
      </ThemeProvider>
    </Theme>
  )
}
