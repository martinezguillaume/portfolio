import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { t } from 'i18n-js'
import { Box, Fab, Icon, Row, Text, useColorMode } from 'native-base'
import { FC, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Feather } from '@native-base/icons'

import { HomeScrollView } from '~/components'
import { RootStackParamList } from '~/types'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export const HomeScreen: FC<Props> = () => {
  const { toggleColorMode } = useColorMode()

  const data = useMemo<{ description?: string; icon: string; link?: boolean }[]>(
    () => [
      {
        icon: 'map-pin',
        description: t('home.locationDescription'),
      },
      {
        icon: 'gift',
        description: t('home.birthdayDescription'),
      },
      {
        icon: 'link',
        link: true,
        description: 'martinezguillaume.github.com',
      },
      {
        icon: 'calendar',
        description: t('home.developerDescription'),
      },
    ],
    []
  )

  return (
    <Box height="100%" maxW={500} alignSelf="center">
      <HomeScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text fontSize={16} fontWeight={800}>
          Guillaume Martinez
        </Text>
        <Text color="muted.500">@martinezguillaume</Text>

        <Text mt={4}>{t('home.description')}</Text>

        <Row flexDirection="row" flexWrap="wrap" mt={2} space={2}>
          {data.map((item) => (
            <Text key={item.icon} fontSize={12} ml={1} mt={2} color="muted.500">
              <Icon color="muted.500" size="4" as={Feather} name={item.icon} /> {item.description}
            </Text>
          ))}
        </Row>
        <Box height={3000} />
      </HomeScrollView>
      <Fab onPress={toggleColorMode} />
    </Box>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 16,
  },
})
