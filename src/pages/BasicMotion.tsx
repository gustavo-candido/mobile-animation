import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Animated,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { Value } = Animated;

const DURATION = 3000;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1f22',
  },

  square: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#7F7EFF',
  },
});

const BasicMotion: React.FC = () => {
  const motion = useState(new Value(0))[0];

  useEffect(() => {
    const toUp = Animated.timing(motion, {
      toValue: 0,
      duration: DURATION,
      useNativeDriver: true,
    });

    const toDown = Animated.timing(motion, {
      toValue: 1,
      duration: DURATION,
      useNativeDriver: true,
    });

    Animated.loop(Animated.sequence([toUp, toDown])).start();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#282a36"
      />
      <SafeAreaView
        style={[styles.container, { marginTop: StatusBar.currentHeight }]}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Animated.View
            style={[
              styles.square,
              {
                transform: [
                  {
                    translateY: motion.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 400],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            for (let i = 0; i < 100000000; i++) {}
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

export default BasicMotion;
