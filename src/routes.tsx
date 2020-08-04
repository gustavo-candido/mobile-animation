import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import BasicMotion from './pages/BasicMotion';
import BasicNativeAnimation from './pages/BasicNativeAnimation';
import TapAndHold from './pages/TapAndHold';
import BasicPan from './pages/BasicPan';
import BasicReanimated from './pages/BasicReanimated';

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
        initialRouteName="BasicPan"
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="BasicMotion" component={BasicMotion} />
        <AppStack.Screen
          name="BasicNativeAnimation"
          component={BasicNativeAnimation}
        />
        <AppStack.Screen name="TapAndHold" component={TapAndHold} />
        <AppStack.Screen name="BasicPan" component={BasicPan} />
        <AppStack.Screen name="BasicReanimated" component={BasicReanimated} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
