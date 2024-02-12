import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native'
import {useAssets} from 'expo-asset'
import {useFonts} from 'expo-font'
import {Slot, SplashScreen} from 'expo-router'
import {ReactNode, useEffect} from 'react'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {View} from 'react-native'

import {useColorSchemeStore, useLocalStore} from '@/stores'
import {ICONS, IMAGES} from '@/assets'
import {ThemeName, themes} from '@/themes'
import '../global.css'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    ...Feather.font,
    ...MaterialCommunityIcons.font,
  })

  const [assets, assetsError] = useAssets([
    ...Object.values(IMAGES),
    ...Object.values(ICONS),
  ])

  const isLoading = !fontsLoaded || !assets

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (assetsError) {
      throw assetsError
    }
    if (fontsError) {
      throw fontsError
    }
  }, [assetsError, fontsError])

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync()
    }
  }, [isLoading])

  if (isLoading) {
    return null
  }

  return <RootLayoutNav />
}

function Theme({name, children}: {name: ThemeName; children: ReactNode}) {
  const {colorScheme} = useColorSchemeStore()
  return (
    <View className="flex-1" style={themes[name][colorScheme]}>
      {children}
    </View>
  )
}

function RootLayoutNav() {
  const locale = useLocalStore(state => state.locale)
  const {colorScheme} = useColorSchemeStore()

  return (
    <Theme name="twitter">
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Slot key={locale} />
      </ThemeProvider>
    </Theme>
  )
}
