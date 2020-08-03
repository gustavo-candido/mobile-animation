import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  State,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  event,
  set,
  block,
  cond,
  eq,
  add,
  neq,
  useCode,
} from 'react-native-reanimated';

const { Value } = Animated;

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
    backgroundColor: '#50fa7b',
  },
});

const BasicPan: React.FC = () => {
  const panX = useState(new Value(0))[0];
  const offsetX = useState(new Value(0))[0];

  const handlePanX = ({ nativeEvent }) => {
    const { translationX, state } = nativeEvent;

    // block([
    //   set(panX, add(translationX, offsetX)),
    //   cond(eq(state, State.END), [set(offsetX, add(offsetX, translationX))]),
    // ]);
    block([set(panX, translationX)]);
  };
  // [offsetX, panX]
  // );
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#282a36"
      />
      <SafeAreaView style={styles.container}>
        <PanGestureHandler
          onGestureEvent={handlePanX}
          onHandlerStateChange={handlePanX}
        >
          <Animated.View
            style={[styles.square, { transform: [{ translateX: panX }] }]}
          />
        </PanGestureHandler>

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

export default BasicPan;

// SyntheticEvent {
//   "_dispatchInstances": FiberNode {
//     "tag": 5,
//     "key": null,
//     "type": "RCTView",
//   },
//   "_dispatchListeners": [Function anonymous],
//   "_targetInst": FiberNode {
//     "tag": 5,
//     "key": null,
//     "type": "RCTView",
//   },
//   "bubbles": undefined,
//   "cancelable": undefined,
//   "currentTarget": 73,
//   "defaultPrevented": undefined,
//   "dispatchConfig": Object {
//     "registrationName": "onGestureHandlerEvent",
//   },
//   "eventPhase": undefined,
//   "isDefaultPrevented": [Function functionThatReturnsFalse],
//   "isPropagationStopped": [Function functionThatReturnsFalse],
//   "isTrusted": undefined,
//   "nativeEvent": Object {
//     "absoluteX": 151.3333282470703,
//     "absoluteY": 235.6666717529297,
//     "handlerTag": 4,
//     "numberOfPointers": 1,
//     "state": 4,
//     "translationX": -6.536997318267822,
//     "translationY": 61.81465530395508,
//     "velocityX": -15.038355827331543,
//     "velocityY": 296.0890197753906,
//     "x": 21.33333396911621,
//     "y": 155.6666717529297,
//   },
//   "target": undefined,
//   "timeStamp": 1596459341287,
//   "type": undefined,
// }
