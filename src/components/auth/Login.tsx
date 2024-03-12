import { Button, Text, Input, Divider } from '@rneui/themed';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Formik } from 'formik';
import GlobalStyles from '../../styles/GlobalStyles';
import KeyboardAvoid from '../../utils/KeyboardAvoid';
import { PublicRootStackParams } from '../../nav/RootNavigator';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';

const Login = ({}: {}) => {
  const { login, loadingLogin, errorLogin, loginGoogle, loadingGoogle, errorGoogle, logout } =
    useAuthContext();
  const navigation = useNavigation<NavigationProp<PublicRootStackParams>>();

  useEffect(() => {
    logout();
  });

  if (loadingLogin)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <KeyboardAvoid>
      <View
        style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground, GlobalStyles.Container]}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            login({ email: values.email, password: values.password });
          }}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Input
                label="Email"
                placeholder="username@email.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <Input
                label="Password"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              {errorLogin && <Text style={{ color: 'red' }}>{errorLogin.message}</Text>}

              <View style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  onPress={handleSubmit as any}
                  title="Login"
                  containerStyle={{ width: 300, marginBottom: 20 }}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Signup')}
                  style={{ marginBottom: 40 }}>
                  <Text style={{ textDecorationLine: 'underline', fontSize: 20 }}>
                    Not a member yet? Sign up.
                  </Text>
                </TouchableOpacity>

                {errorGoogle && (
                  <Text style={{ color: 'red' }}>
                    Google authentication error: {errorGoogle.message}
                  </Text>
                )}
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Standard}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={loginGoogle}
                  disabled={loadingGoogle}
                />
              </View>
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
