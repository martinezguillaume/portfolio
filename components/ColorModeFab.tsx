import {Fab, Icon, useColorMode} from 'native-base'
import {memo} from 'react'
import {Ionicons} from '@native-base/icons'

export const ColorModeFab = memo(() => {
  const {toggleColorMode} = useColorMode()

  return (
    <Fab
      right="80px"
      height="56px"
      width="56px"
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
