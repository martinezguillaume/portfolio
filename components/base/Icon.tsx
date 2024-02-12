import Feather from '@expo/vector-icons/Feather'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import {ComponentProps} from 'react'

export type IconProps =
  | ({
      type?: 'feather'
    } & ComponentProps<typeof Feather>)
  | ({
      type: 'material-community-icons'
    } & ComponentProps<typeof MaterialCommunityIcons>)

export const Icon = ({className, ...props}: IconProps) => {
  const newClassName = `text-primary text-base ${className}`

  if (props.type === 'material-community-icons') {
    return <MaterialCommunityIcons className={newClassName} {...props} />
  }

  return <Feather className={newClassName} {...props} />
}
