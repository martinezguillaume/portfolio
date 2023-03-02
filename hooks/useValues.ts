import { useMemo } from 'react'
import { Dimensions, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const COVER_HEIGHT = 180
export const COVER_HEIGHT_SMALL = 80
export const AVATAR_SIZE = 120
export const AVATAR_SIZE_SMALL = 80

export const useValues = () => {
  const insets = useSafeAreaInsets()

  return useMemo(
    () => ({
      coverHeight: insets.top + COVER_HEIGHT,
      smallCoverHeight: insets.top + COVER_HEIGHT_SMALL,
      avatarSize: AVATAR_SIZE,
      smallAvatarSize: AVATAR_SIZE_SMALL,
      headerOffset: COVER_HEIGHT - COVER_HEIGHT_SMALL,
      avatarOffset: AVATAR_SIZE - AVATAR_SIZE_SMALL,
      tabBarHeight: 48,
      insets,
      appWidth: Platform.OS === 'web' ? 600 : Dimensions.get('window').width,
    }),
    [insets]
  )
}
