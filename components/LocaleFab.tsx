import {Fab, Menu} from 'native-base'
import {FC, memo} from 'react'

import {i18n} from '~/i18n'
import {useAppStore} from '~/store'

export const LocaleFab: FC = memo(() => {
  const setLocale = useAppStore(state => state.setLocale)
  const locale = useAppStore(state => state.locale)

  return (
    <Menu
      // eslint-disable-next-line react/no-unstable-nested-components
      trigger={triggerProps => (
        <Fab
          {...triggerProps}
          height="56px"
          width="56px"
          _dark={{bg: 'white'}}
          _light={{bg: 'black'}}
          p={0}
          _text={{fontSize: '2xl'}}
          label={locale === 'fr' ? '🇫🇷' : '🇬🇧'}
        />
      )}>
      <Menu.OptionGroup
        defaultValue={locale}
        title={i18n.t('home.language')}
        type="radio"
        onChange={setLocale}>
        <Menu.ItemOption value="fr">🇫🇷 Français</Menu.ItemOption>
        <Menu.ItemOption value="en">🇬🇧 English</Menu.ItemOption>
      </Menu.OptionGroup>
    </Menu>
  )
})
