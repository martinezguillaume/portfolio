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
  const defaultClassName = 'text-primary text-base'

  if (props.type === 'material-community-icons') {
    return (
      <MaterialCommunityIcons
        className={`${defaultClassName} ${className}`}
        {...props}
      />
    )
  }

  return <Feather className={`${defaultClassName} ${className}`} {...props} />
}
