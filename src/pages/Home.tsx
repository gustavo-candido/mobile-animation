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
        <View
          style={{
            borderStyle: 'dashed',
            borderWidth: 2,
            borderColor: 'white',
            padding: 20,
            borderRadius: 1,
          }}
        >
          <Text>Home</Text>
        </View>
      </View>
    </>
  );
};

export default Home;
