import {Fab, Icon, useColorMode} from 'native-base'
import {memo} from 'react'
import {Feather} from '@native-base/icons'

export const ColorModeFab = memo(() => {
  const {toggleColorMode} = useColorMode()

  return (
    <Fab
      right={20}
      onPress={toggleColorMode}
      icon={<Icon _dark={{name: 'sun'}} _light={{name: 'moon'}} as={Feather} />}
    />
  )
})
