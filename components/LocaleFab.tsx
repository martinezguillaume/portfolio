import { Fab, Menu } from 'native-base'
import { FC, memo } from 'react'

import { useAppStore } from '~/store'

export const LocaleFab: FC = memo(() => {
  const setLocale = useAppStore((state) => state.setLocale)
  const locale = useAppStore((state) => state.locale)

  return (
    <Menu
      // eslint-disable-next-line react/no-unstable-nested-components
      trigger={(triggerProps) => <Fab {...triggerProps} label={locale === 'fr' ? '🇫🇷' : '🇬🇧'} />}>
      <Menu.OptionGroup defaultValue={locale} title="Langue" type="radio" onChange={setLocale}>
        <Menu.ItemOption value="fr">🇫🇷 Français</Menu.ItemOption>
        <Menu.ItemOption value="en">🇬🇧 English</Menu.ItemOption>
      </Menu.OptionGroup>
    </Menu>
  )
})
