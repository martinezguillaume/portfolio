import {extendTheme} from 'native-base'

export const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        lineHeight: null,
      },
    },
    Divider: {
      baseStyle: {
        _dark: {
          backgroundColor: 'muted.800',
        },
        _light: {
          backgroundColor: 'muted.300',
        },
      },
    },
    Box: {
      baseStyle: {
        _dark: {
          borderColor: 'muted.800',
        },
        _light: {
          borderColor: 'muted.300',
        },
      },
    },
  },
})

type CustomThemeType = typeof theme

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
