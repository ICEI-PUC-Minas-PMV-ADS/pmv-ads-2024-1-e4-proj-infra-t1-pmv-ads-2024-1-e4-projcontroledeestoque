import type {PropsWithChildren} from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import Animated, {interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset,} from 'react-native-reanimated';

import {ThemedView} from '@/components/ThemedView';
import {ThemedSafeAreaView} from "@/components/ThemedSafeAreaView";

const HEADER_HEIGHT = 250;

export default function ThemedViewRoot({
  children,
}: PropsWithChildren) {
  useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedSafeAreaView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
