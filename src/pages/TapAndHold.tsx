import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

const {
  Value,
  event,
  Clock,
  timing,
  block,
  startClock,
  stopClock,
  cond,
  eq,
  neq,
  and,
  set,
  interpolate,
  Extrapolate,
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1f22',
  },

  square: {
    marginTop: 80,
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ff5555',
  },
});

const TapAndHold: React.FC = () => {
  const gestureState = useState(new Value(-1))[0];
  const clock = new Clock();

  const onStateChange = event([
    {
      nativeEvent: {
        state: gestureState,
      },
    },
  ]);

  const runOpacityTimer = (
    clock: Animated.Clock,
    gestureState: Animated.Value
  ): Animated.Node<number> => {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      time: new Value(0),
      frameTime: new Value(0),
    };

    const config = {
      duration: 300,
      toValue: new Value(-1),
      easing: Easing.inOut(Easing.ease),
    };

    return block([
      cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(config.toValue, 1),
        startClock(clock),
      ]),
      cond(and(eq(gestureState, State.END), neq(config.toValue, 0)), [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(config.toValue, 0),
        startClock(clock),
      ]),
      timing(clock, state, config),
      cond(state.finished, stopClock(clock)),
      interpolate(state.position, {
        inputRange: [0, 1],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP,
      }),
    ]);
  };

  const opacity = runOpacityTimer(clock, gestureState);
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#282a36"
      />
      <SafeAreaView style={styles.container}>
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <Animated.View
            style={[
              styles.square,
              {
                opacity,
              },
            ]}
          />
        </TapGestureHandler>

        <TouchableOpacity
          onPress={() => {
            for (let i = 0; i < 300000000; i++) {}
          }}
          style={{
            backgroundColor: '#6272a4',
            borderWidth: StyleSheet.hairlineWidth,
            paddingVertical: 10,
            paddingHorizontal: 20,
            marginBottom: 50,
          }}
        >
          <Text style={{ color: '#f8f8f2' }}>Busy</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default TapAndHold;
