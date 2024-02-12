import {Text as RNText, TextProps as RNTextProps} from 'react-native'

export const Text = ({className, ...props}: RNTextProps) => (
  <RNText className={`text-primary text-base ${className}`} {...props} />
)
