import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Animated, {
  Clock,
  timing,
  Easing,
  Value,
  useCode,
  block,
  startClock,
  set,
  stopClock,
  cond,
} from 'react-native-reanimated';

const measures = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
  SQUARE_SIZE: 100,
  DURATION: 1000,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  square: {
    width: measures.SQUARE_SIZE,
    height: measures.SQUARE_SIZE,
    borderRadius: 10,
    backgroundColor: '#bd93f9',
  },
});

const BasicReanimated: React.FC = () => {
  const clock = useState(new Clock())[0];

  const state = useState({
    position: new Value(0),
    finished: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  })[0];

  const config = useState({
    duration: measures.DURATION,
    easing: Easing.linear,
    toValue: 1,
  })[0];

  useCode(
    () =>
      block([
        timing(clock, state, config),
        startClock(clock),
        cond(state.finished, [
          stopClock(clock),
          set(state.frameTime, 0),
          set(state.time, 0),
          set(state.finished, 0),
          set(state.position, 0),
          startClock(clock),
        ]),
      ]),
    []
  );
  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.square,
            {
              transform: [
                {
                  translateX: state.position.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, measures.WIDTH - measures.SQUARE_SIZE, 0],
                  }),
                  rotateZ: state.position.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, Math.PI, 0],
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          for (let i = 0; i < 300000000; i++) {}
        }}
      >
        <Text
          style={{
            color: '#f8f8f2',
            alignSelf: 'center',
            backgroundColor: '#6272a4',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginBottom: 50,
          }}
        >
          Busy
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default BasicReanimated;
