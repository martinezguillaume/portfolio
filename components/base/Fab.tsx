import {Pressable, PressableProps} from 'react-native'

import {Icon, IconProps} from './Icon'

type FabProps = PressableProps

export const Fab = ({className, ...props}: FabProps) => {
  return (
    <Pressable
      className={`absolute bottom-2 right-4 w-16 h-16 z-10 bg-background-contrast shadow justify-center items-center rounded-full ${className}`}
      {...props}
    />
  )
}

type FabIconProps = IconProps

Fab.Icon = ({className, ...props}: FabIconProps) => (
  <Icon className={`text-primary-contrast text-xl ${className}`} {...props} />
)
