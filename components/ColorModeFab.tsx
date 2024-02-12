import {memo} from 'react'
import {useColorScheme} from 'nativewind'

import {Fab} from './base'

export const ColorModeFab = memo(() => {
  const {toggleColorScheme, colorScheme} = useColorScheme()

  return (
    <Fab onPress={toggleColorScheme}>
      <Fab.Icon
        type="material-community-icons"
        name={
          colorScheme === 'light'
            ? 'moon-waning-gibbous'
            : 'white-balance-sunny'
        }
        className="text-xl"
      />
    </Fab>
  )
})
