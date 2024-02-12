import {useMemo} from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export const HEADER_HEIGHT = 160
export const HEADER_HEIGHT_SMALL = 80
export const AVATAR_HEIGHT = 140
export const AVATAR_HEIGHT_SMALL = 80

export const useValues = () => {
  const insets = useSafeAreaInsets()

  return useMemo(
    () => ({
      headerHeight: insets.top + HEADER_HEIGHT,
      smallHeaderHeight: insets.top + HEADER_HEIGHT_SMALL,
      avatarHeight: AVATAR_HEIGHT,
      smallAvatarHeight: AVATAR_HEIGHT_SMALL,
      headerOffset: HEADER_HEIGHT - HEADER_HEIGHT_SMALL,
      avatarOffset: AVATAR_HEIGHT - AVATAR_HEIGHT_SMALL,
      insets,
    }),
    [insets],
  )
}
