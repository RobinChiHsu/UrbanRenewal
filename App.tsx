/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AppContainer from './src/navigation/AppContainer';
import {ApolloProvider} from '@apollo/client';
import {apolloClient} from './src/graphql/client';
import {SafeAreaView} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaView style={{flex: 1}}>
        <AppContainer />
      </SafeAreaView>
    </ApolloProvider>
  );
}

export default App;
