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
import Animated from 'react-native-reanimated';

const { Value, cond, eq } = Animated;

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

const BasicNativeAnimation: React.FC = () => {
  const state = useState(new Value(State.UNDETERMINED))[0];

  const onStateChange = Animated.event([
    {
      nativeEvent: {
        state,
      },
    },
  ]);

  const opacity = cond(eq(state, State.BEGAN), 0.2, 1);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#282a36"
      />
      <SafeAreaView style={styles.container}>
        <TapGestureHandler
          onHandlerStateChange={onStateChange}
          numberOfTaps={1}
        >
          <Animated.View style={{ opacity }}>
            <View style={styles.square} />
          </Animated.View>
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

export default BasicNativeAnimation;
