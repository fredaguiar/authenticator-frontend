import { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Button, Text } from '@rneui/themed';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Formik } from 'formik';
import GlobalStyles from '../../styles/GlobalStyles';
import KeyboardAvoid from '../../utils/KeyboardAvoid';
import { RootStackParams } from '../../nav/RootNavigator';

type LoginNavProp = NavigationProp<RootStackParams>;

const GQL_LOGIN = gql`
  mutation Login($userInput: UserLogin!) {
    login(userInput: $userInput) {
      name
      email
      token
    }
  }
`;

const GQL_ALIVE = gql`
  query Query {
    alive
  }
`;

const Login = ({}: {}) => {
  const navigation = useNavigation<LoginNavProp>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [login, { data, loading, error }] = useMutation(GQL_LOGIN);
  // const { data, loading, error } = useQuery(GQL_ALIVE);

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <KeyboardAvoid>
      <View style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground]}>
        <View>
          {error && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}
          {/* <Text>Server: {data?.alive}</Text> */}
          <Text>Logged in: {data?.login?.name}</Text>
        </View>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            login({
              variables: {
                userInput: { email: values.email, password: values.password },
              },
            });
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
              {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
              <Button onPress={handleSubmit as any} title="Login" buttonStyle={{ margin: 5 }}>
                <Text>Login</Text>
              </Button>
              <Button
                onPress={handleSubmit as any}
                title="Google sign-in"
                buttonStyle={{ margin: 5 }}>
                <Text>Google sign-in</Text>
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
