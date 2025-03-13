import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {__fbToken__, __userFBInfo__, __userInfo__} from '../graphql/policies';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccessToken, LoginButton, Profile} from 'react-native-fbsdk-next';
import FBAccessToken from 'react-native-fbsdk-next/lib/typescript/src/FBAccessToken';
import FBProfile from 'react-native-fbsdk-next/lib/typescript/src/FBProfile';
import {IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env';
import {useReactiveVar} from '@apollo/client';

GoogleSignin.configure({
  iosClientId: IOS_CLIENT_ID,
  webClientId: WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const userInfo = useReactiveVar(__userInfo__);

  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('userInfo: ', userInfo);
    return userInfo;
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const response = await GoogleLogin(); // Google sign-in
      __userInfo__(response);
      await AsyncStorage.setItem('@userInfo', JSON.stringify(response));
    } catch (error) {
      console.log('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          onPress={handleGoogleLogin}
          disabled={userInfo !== null}
          style={styles.googleBtn}>
          <View style={styles.googleBtnContainer}>
            <Text style={styles.googleBtnText}>
              {userInfo !== null ? 'Already Log in' : 'Sign in with Google'}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(
              async (data: FBAccessToken | null) => {
                if (data) {
                  __fbToken__(data.accessToken.toString());
                  await AsyncStorage.setItem(
                    '@fbToken',
                    JSON.stringify(data.accessToken.toString()),
                  );
                }
              },
            );
            Profile.getCurrentProfile().then(async function (
              currentProfile: FBProfile | null,
            ) {
              if (currentProfile) {
                __userFBInfo__(currentProfile);
                await AsyncStorage.setItem(
                  '@userFBInfo',
                  JSON.stringify(currentProfile),
                );
              }
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  googleBtn: {
    marginVertical: 16,
  },
  googleBtnContainer: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#919191',
  },
  googleBtnText: {fontWeight: '700', color: '#666666'},
});
