import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

const Home: React.FC = () => {
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
        <Text>Home</Text>
      </View>
    </>
  );
};

export default Home;
