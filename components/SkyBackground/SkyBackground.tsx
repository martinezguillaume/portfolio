import {memo, useEffect} from 'react'
import {Canvas, RoundedRect} from '@shopify/react-native-skia'
import {StyleSheet, useWindowDimensions} from 'react-native'
import {
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'

type SkyBackgroundProps = {}

const getRandomInt = (min: number, max: number) =>
  Math.random() * (max - min) + min

export const SkyBackground = memo(({}: SkyBackgroundProps) => {
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Stars density={400} size={1} />
      <Stars density={2000} size={2} />
    </Canvas>
  )
})

const Stars = memo(
  ({
    size,
    density,
    animated,
  }: {
    size: number
    density: number
    animated?: boolean
  }) => {
    const {width, height} = useWindowDimensions()
    const length = Math.round((width * height) / density)

    return Array(length)
      .fill(null)
      .map((_, i) => (
        <Star
          key={i}
          x={getRandomInt(-5, width + 5)}
          y={getRandomInt(-5, height + 5)}
          size={size}
          animated={animated}
        />
      ))
  },
)

const Star = memo(
  ({
    size,
    x,
    y,
    animated,
  }: {
    x: number
    y: number
    size: number
    animated?: boolean
  }) => {
    const opacity = useSharedValue(0)

    useEffect(() => {
      if (animated) {
        opacity.value = withDelay(
          getRandomInt(0, 3000),
          withRepeat(withTiming(1, {duration: 2000}), -1, true),
        )
      }
    }, [animated, opacity])

    return (
      <RoundedRect
        x={x}
        y={y}
        width={size}
        height={size}
        r={size / 2}
        opacity={animated ? opacity : getRandomInt(0.1, 1)}
        color="white"
      />
    )
  },
)

export default SkyBackground
