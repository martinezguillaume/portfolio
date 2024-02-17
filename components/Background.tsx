import {memo} from 'react'
import {View, ViewProps} from 'react-native'

type BackgroundProps = ViewProps

export const Background = memo<BackgroundProps>(({className, ...props}) => {
  return (
    <View
      className={`flex-1 absolute inset-x-0 inset-y-0 bg-background transition duration-300 ${className}`}
      {...props}
    />
  )
})
