import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './stacks/AuthStack';
import {HomeStack} from './stacks/HomeStack';
import {useReactiveVar} from '@apollo/client';
import {__userFBInfo__, __userInfo__} from '../graphql/policies';

const Stack = createNativeStackNavigator();
export const navigationRef = React.createRef<any>();

const AppContainer = () => {
  const routeNameRef = useRef<any | null>(null);
  const userInfo = useReactiveVar(__userInfo__);
  const userFBInfo = useReactiveVar(__userFBInfo__);

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
        {(userInfo === null || userFBInfo === null) && (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
        <Stack.Screen name="HomeStack" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
