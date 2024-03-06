import { useState } from 'react';
import { Button, Text } from '@rneui/themed';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Formik } from 'formik';
import GlobalStyles from '../../styles/GlobalStyles';
import KeyboardAvoid from '../../utils/KeyboardAvoid';
import { RootStackParams } from '../../nav/RootNavigator';
import { useAuthContext } from '../../context/AuthContext';

type LoginNavProp = NavigationProp<RootStackParams>;

const Login = ({}: {}) => {
  const { login, loadingLogin, errorLogin, loginGoogle, loadingGoogle, errorGoogle, logout } =
    useAuthContext();
  const navigation = useNavigation<LoginNavProp>();

  if (loadingLogin)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <KeyboardAvoid>
      <View style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground]}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            login(values.email, values.password);
          }}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text style={{ margin: 5 }}>Email</Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                style={{ backgroundColor: 'white', margin: 5 }}
              />
              <Text style={{ margin: 5 }}>Password</Text>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
                style={{ backgroundColor: 'white', margin: 5 }}
              />
              {errorLogin && <Text style={{ color: 'red' }}>{errorLogin.message}</Text>}
              <Button onPress={handleSubmit as any} title="Login" buttonStyle={{ margin: 5 }}>
                <Text>Login</Text>
              </Button>
              {errorGoogle && (
                <Text style={{ color: 'red' }}>
                  Google authentication error: {errorGoogle.message}
                </Text>
              )}
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={loginGoogle}
                disabled={loadingGoogle}
              />
              <Button
                onPress={() => {
                  logout();
                }}
                title="Logout">
                <Text>Logout</Text>
              </Button>
              <Button
                onPress={handleSubmit as any}
                title="Not a member yet?"
                buttonStyle={{ margin: 5 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text>Sign-up</Text>
                </TouchableOpacity>
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoid>
  );
};

const styles = StyleSheet.create({
  inputText: {
    margin: 5,
  },
});

export default Login;
