import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import env from '../env';
import {__userInfo__} from '../graphql/policies';

GoogleSignin.configure({
  iosClientId: env.IOS_CLIENT_ID,
  webClientId: env.WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

const Login = () => {
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.log('Login Error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          padding: 40,
        }}>
        <TouchableOpacity onPress={handleGoogleLogin}>
          <View
            style={{
              width: '100%',
              height: 40,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#919191',
            }}>
            <Text style={{fontWeight: '700', color: '#666666'}}>
              Sign in with Google
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
