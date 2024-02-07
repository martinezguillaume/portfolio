import {vars, cssInterop} from 'nativewind'
import Ionicons from '@expo/vector-icons/Ionicons'

cssInterop(Ionicons, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      fontSize: 'size',
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
      '--color-text-primary': '#000',
    }),
    dark: vars({
      '--color-primary': '#1d9bf0',
      '--color-text-primary': '#FFF',
    }),
  },
}
