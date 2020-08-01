import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import BasicMotion from './pages/BasicMotion';

const AppStack = createStackNavigator();

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#282a36',
          },
        }}
        initialRouteName="BasicMotion"
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="BasicMotion" component={BasicMotion} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
