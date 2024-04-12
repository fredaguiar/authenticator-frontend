import { Button, Text, Input } from '@rneui/themed';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { Formik } from 'formik';
import * as yup from 'yup';
import GlobalStyles from '../../styles/GlobalStyles';
import KeyboardAvoid from '../../utils/KeyboardAvoid';
import { PublicRootStackParams } from '../../nav/RootNavigator';
import { useAuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';
import ErrorMessageUI from '../ui/ErrorMessageUI';
import SpinnerUI from '../ui/SpinnerUI';

const validationSchema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const Login = ({}: {}) => {
  const { login, loadingLogin, errorLogin, loginGoogle, loadingGoogle, errorGoogle, logout } =
    useAuthContext();
  const navigation = useNavigation<NavigationProp<PublicRootStackParams>>();

  useEffect(() => {
    // logout();
  });

  if (loadingLogin) return <SpinnerUI />;

  return (
    <KeyboardAvoid>
      <View
        style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground, GlobalStyles.Container]}>
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            login({ email: values.email, password: values.password });
          }}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <Input
                label="Email"
                placeholder="username@email.com"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                errorMessage={errors.email && touched.email ? errors.email : undefined}
              />
              <Input
                label="Password"
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
                errorMessage={errors.password && touched.password ? errors.password : undefined}
              />
              <ErrorMessageUI display={errorLogin} message={errorLogin?.message} />
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

                <ErrorMessageUI display={errorGoogle} message={errorGoogle?.message} />
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
