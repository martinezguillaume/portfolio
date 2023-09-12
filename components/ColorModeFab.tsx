import {Fab, Icon, useColorMode} from 'native-base'
import {memo} from 'react'
import {Ionicons} from '@native-base/icons'

export const ColorModeFab = memo(() => {
  const {toggleColorMode} = useColorMode()

  return (
    <Fab
      right={20}
      height="48px"
      width="48px"
      onPress={toggleColorMode}
      _dark={{bg: 'white'}}
      _light={{bg: 'black'}}
      icon={
        <Icon
          size={5}
          _dark={{name: 'ios-sunny', color: 'black'}}
          _light={{name: 'ios-moon', color: 'white'}}
          as={Ionicons}
        />
      }
    />
  )
})
