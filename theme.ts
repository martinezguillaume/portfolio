import { extendTheme } from 'native-base'

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
  },
})

type CustomThemeType = typeof theme

declare module 'native-base' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ICustomTheme extends CustomThemeType {}
}
