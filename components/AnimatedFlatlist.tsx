import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const AnimatedFlatList = ({ data }: { data: { key: string; label: string }[] }) => {
  const renderItem = ({ item, index }) => {
    const offset = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: withSpring(offset.value) }],
      };
    });

    return (
      <Animated.View
        style={[styles.item, animatedStyle]}
        onTouchStart={() => (offset.value = -10)}
        onTouchEnd={() => (offset.value = 0)}>
        <Text style={styles.text}>{item.label}</Text>
      </Animated.View>
    );
  };

  return <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.key} />;
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9c2ff',
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default AnimatedFlatList;
export { AnimatedFlatList };
