import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18n-js'
import { Fab, useColorMode, Text, Container } from 'native-base'
import { FC } from 'react'

import { RootStackParamList } from '~/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen: FC<Props> = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <Container centerContent>
      <Text>{t('home.test')}</Text>
      <Fab onPress={toggleColorMode} />
    </Container>
  )
}
