import React, { useState } from 'react';
import { View, StatusBar, Dimensions, StyleSheet } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  Value,
  event,
  useCode,
  block,
  cond,
  eq,
  set,
  add,
} from 'react-native-reanimated';

const measures = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
  STATUS_BAR: StatusBar.currentHeight,

  SQUARE_SIZE: 100,
  DURATION: 1000,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: measures.STATUS_BAR,
  },

  circle: {
    width: measures.SQUARE_SIZE,
    height: measures.SQUARE_SIZE,
    borderRadius: measures.SQUARE_SIZE / 2,
  },
});

const Circle: React.FC<{ color: string }> = ({ color }) => {
  const gestureState = useState(new Value(0))[0];
  const panX = useState(new Value(0))[0];
  const offsetX = useState(new Value(0))[0];
  const translateX = useState(new Value(0))[0];

  const panY = useState(new Value(0))[0];
  const offsetY = useState(new Value(0))[0];
  const translateY = useState(new Value(0))[0];

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX: panX,
        translationY: panY,
        state: gestureState,
      },
    },
  ]);

  useCode(
    () =>
      block([
        cond(
          eq(gestureState, State.ACTIVE),
          [
            set(translateX, add(offsetX, panX)),
            set(translateY, add(offsetY, panY)),
          ],
          [
            set(offsetX, translateX),
            set(panX, 0),
            set(offsetY, translateY),
            set(panY, 0),
          ]
        ),
      ]),
    []
  );

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onGestureEvent}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: color,
            transform: [{ translateX }, { translateY }],
          },
        ]}
      />
    </PanGestureHandler>
  );
};

const BasicPan: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#282a36DC"
      />
      <View style={styles.container}>
        <Circle color="rgba(255,0,0,.5)" />
        <Circle color="rgba(0,0,255,.5)" />
      </View>
    </>
  );
};

export default BasicPan;
