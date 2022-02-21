import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18n-js'
import { Box, Fab, Icon, Text, useColorMode } from 'native-base'
import { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Feather } from '@native-base/icons'

import { HomeScrollView } from '~/components'
import { RootStackParamList } from '~/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen: FC<Props> = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <>
      <HomeScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text fontSize={16} fontWeight={800}>
          Guillaume Martinez
        </Text>
        <Text color="muted.500">@martinezguillaume</Text>

        <Text mt={4}>{t('home.description')}</Text>

        <Box flexDirection="row" mt={4} alignItems="center">
          <Text fontSize={12} ml={1} color="blue.500" width={100} numberOfLines={1}>
            <Icon color="muted.500" size="4" as={Feather} name="link" />{' '}
            martinezguillaume.github.com
          </Text>
          <Text fontSize={12} ml={2} color="muted.500" numberOfLines={1}>
            <Icon color="muted.500" size="4" as={Feather} name="calendar" /> {t('home.date_title')}
          </Text>
        </Box>
        <Box height={3000} />
      </HomeScrollView>

      <Fab onPress={toggleColorMode} />
    </>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 16,
  },
})
