import {memo} from 'react'

import {useColorSchemeStore} from '@/stores'

import {Fab} from './base'

export const ColorModeFab = memo(() => {
  const {toggleColorScheme, colorScheme} = useColorSchemeStore()

  return (
    <Fab onPress={toggleColorScheme}>
      <Fab.Icon
        type="material-community-icons"
        name={
          colorScheme === 'light'
            ? 'moon-waning-gibbous'
            : 'white-balance-sunny'
        }
        className="!text-xl color-yellow-500"
      />
    </Fab>
  )
})
