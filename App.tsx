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

function App(): React.JSX.Element {
  return (
    <ApolloProvider client={apolloClient}>
      <AppContainer />
    </ApolloProvider>
  );
}

export default App;
