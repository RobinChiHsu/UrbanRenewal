import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './stacks/AuthStack';
import {HomeStack} from './stacks/HomeStack';

const Stack = createNativeStackNavigator();
export const navigationRef = React.createRef<any>();

const AppContainer = () => {
  const routeNameRef = useRef<any | null>(null);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current?.getCurrentRoute?.()?.name;
      }}
      onStateChange={async () => {
        const currentRouteName =
          navigationRef.current?.getCurrentRoute?.()?.name;

        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
