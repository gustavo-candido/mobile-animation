import React, { useState, useCallback } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Animated, {
  Clock,
  timing,
  Value,
  Easing,
  block,
  eq,
  stopClock,
  cond,
  useCode,
  set,
  startClock,
  neq,
} from 'react-native-reanimated';
import judgement from './judgement.png';
import world from './world.png';
import fool from './fool.png';

const cards = [world, judgement, fool];

const measures = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,

  CARD_WIDTH: Dimensions.get('window').width / 2,
  CARD_HEIGHT: Dimensions.get('window').height / 2,

  DURATION: 500,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cover: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#44475a',
  },

  card: {
    width: measures.CARD_WIDTH,
    height: measures.CARD_HEIGHT,
    position: 'absolute',
  },
});

const runTiming = (clock: Clock): any => {
  const state = {
    time: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    finished: new Value(0),
  };

  const config = {
    toValue: 1,
    duration: measures.DURATION,
    easing: Easing.linear,
  };

  return block([
    timing(clock, state, config),
    startClock(clock),
    cond(state.finished, stopClock(clock)),
    state.position,
  ]);
};

const Cards: React.FC = () => {
  const [toggle, setToggle] = useState(0);
  const clock = new Clock();
  const progress = new Value(0);

  useCode(() => block([set(progress, runTiming(clock))]), [toggle]);

  return (
    <>
      <View style={styles.container}>
        {cards.map((card, index) => {
          const open = [0, (Math.PI / 12) * (index - 1)];
          const close = [(Math.PI / 12) * (index - 1), 0];

          return (
            <Animated.View
              key={String(index)}
              style={[
                styles.card,
                {
                  transform: [
                    { translateY: measures.CARD_HEIGHT },
                    {
                      rotateZ: progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: toggle ? open : close,
                      }),
                    },
                    { translateY: -measures.CARD_HEIGHT },
                  ],
                },
              ]}
            >
              <Image source={card} style={styles.cover} />
            </Animated.View>
          );
        })}
      </View>

      <View
        style={{
          alignItems: 'center',
          marginBottom: 50,
        }}
      >
        <TouchableOpacity onPress={() => setToggle(1 - toggle)}>
          <Text
            style={{
              color: '#FFFF',
              backgroundColor: '#6272a4',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 5,
            }}
          >
            Click
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Cards;
