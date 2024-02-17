import {memo} from 'react'

import {useColorSchemeStore} from '@/stores'

import {Fab} from './base'

export const ColorModeFab = memo(() => {
  const {toggleColorScheme} = useColorSchemeStore()

  return (
    <Fab onPress={toggleColorScheme}>
      <Fab.Icon
        type="material-community-icons"
        name="moon-waning-gibbous"
        className="!text-xl color-yellow-500"
      />
    </Fab>
  )
})
