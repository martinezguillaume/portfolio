import {vars, cssInterop} from 'nativewind'
import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {Image} from 'react-native'

cssInterop(Feather, {
  className: {
    target: 'style',
  },
})

cssInterop(MaterialCommunityIcons, {
  className: {
    target: 'style',
  },
})

cssInterop(Image, {
  className: {
    target: 'style',
  },
  tintClassName: {
    target: false,
    nativeStyleToProp: {
      color: 'tintColor',
    },
  },
})

export type ThemeName = 'twitter'
export type ColorScheme = 'light' | 'dark'

export const themes: Record<
  ThemeName,
  Record<ColorScheme, Record<string, string>>
> = {
  twitter: {
    light: vars({
      '--color-primary': '#1d9bf0',
      '--color-primary-contrast': '#FFF',

      '--color-background': '#FFF',
      '--color-background-contrast': '#000',

      '--color-divider': 'rgba(0, 0, 0, 0.1)',

      '--color-text-primary': '#000',
      '--color-text-secondary': 'rgba(0, 0, 0, 0.6)',
    }),
    dark: vars({
      '--color-primary': '#1d9bf0',
      '--color-primary-contrast': '#000',

      '--color-background': '#000',
      '--color-background-contrast': '#FFF',

      '--color-divider': 'rgba(255, 255, 255, 0.2)',

      '--color-text-primary': '#FFF',
      '--color-text-secondary': 'rgba(255, 255, 255, 0.6)',
    }),
  },
}
