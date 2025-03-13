import {policies} from './policies';
import {ApolloClient, from, InMemoryCache} from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {RetryLink} from '@apollo/client/link/retry';

const retryLink = new RetryLink();

const errorLink = onError(({graphQLErrors}) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      console.log(err, 'errorLink');
    }
  }
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: policies,
  }),
  link: from([retryLink, errorLink]),
});
