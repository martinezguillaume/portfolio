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
        backgroundColor: 'muted.800',
      },
    },
  },
})

type CustomThemeType = typeof theme

declare module 'native-base' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ICustomTheme extends CustomThemeType {}
}
