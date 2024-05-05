import {WithSkiaWeb} from '@shopify/react-native-skia/lib/module/web'

export const SkyBackground = () => (
  <WithSkiaWeb
    // @ts-ignore
    getComponent={() => import('./SkyBackground')}
  />
)
