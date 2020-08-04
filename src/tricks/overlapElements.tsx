import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

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
    backgroundColor: '#50fa7b',
  },

  cover: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});

const overlapElements: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="#282a36"
      />
      <View
        style={[
          StyleSheet.absoluteFill,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <View>
          <View
            style={{
              ...styles.square,
              backgroundColor: 'rgba(255, 0, 0,.3)',
            }}
          />
          <View style={StyleSheet.absoluteFillObject}>
            <View
              style={{
                ...styles.square,
                backgroundColor: 'rgba(0, 0, 255,.3)',
              }}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default overlapElements;
