import {makeVar, TypePolicies} from '@apollo/client';
import {SignInResponse} from '@react-native-google-signin/google-signin';
import FBProfile from 'react-native-fbsdk-next/lib/typescript/src/FBProfile';

export const __isDebug__ = makeVar<boolean>(false);
export const __idToken__ = makeVar<string>('');
export const __userInfo__ = makeVar<SignInResponse | null | undefined>(null);
export const __userFBInfo__ = makeVar<FBProfile | null | undefined>(null);
export const __fbToken__ = makeVar<string>('');

export const policies: TypePolicies = {
  Query: {
    fields: {
      __idToken__: {
        read() {
          return __idToken__('');
        },
      },
    },
  },
};
