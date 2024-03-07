import { Button, Divider, Icon, Input, Text, CheckBox } from '@rneui/themed';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import KeyboardAvoid from '../../utils/KeyboardAvoid';
import GlobalStyles from '../../styles/GlobalStyles';
import { gql, useMutation } from '@apollo/client';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../nav/RootNavigator';

const GQL_SIGNUP = gql`
  mutation SigupUser($userInput: UserInput!) {
    sigupUser(userInput: $userInput) {
      name
      email
      token
    }
  }
`;

const LANGUAGES = [
  { label: 'Portuguese', value: 'pt' },
  { label: 'English', value: 'en' },
  { label: 'Spanish', value: 'es' },
];
const COUNTRIES = [
  { label: 'Brazil', value: 'br' },
  { label: 'United States', value: 'us' },
  { label: 'Mexico', value: 'mx' },
];

type SignupNavProp = NavigationProp<RootStackParams>;

const Signup = ({}: {}) => {
  const { signup, loadingSignup, errorSignUp } = useAuthContext();
  const [terms, setTerms] = useState(false);
  const navigation = useNavigation<SignupNavProp>();

  if (loadingSignup)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <KeyboardAvoid>
      <View style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground]}>
        <View>
          {errorSignUp && <Text style={{ color: 'red' }}>Error: {errorSignUp.message}</Text>}
        </View>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            language: 'pt',
            country: 'br',
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            signup({
              firstName: values.firstName,
              lastName: values.lastName,
              language: values.language,
              country: values.country,
              email: values.email,
              password: values.password,
            });
          }}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={styles.inputLabel}>Language</Text>
                  <Picker
                    style={styles.dropDown}
                    selectedValue={values.language}
                    onValueChange={handleChange('language')}
                    mode="dropdown">
                    {LANGUAGES.map((item) => (
                      <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                  </Picker>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={styles.inputLabel}>Country</Text>
                  <Picker
                    style={styles.dropDown}
                    selectedValue={values.country}
                    onValueChange={handleChange('country')}
                    mode="dropdown">
                    {COUNTRIES.map((item) => (
                      <Picker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                  </Picker>
                </View>
              </View>
              <Input
                label="First name"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
              />
              <Input
                label="Last name"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
              />
              <Input
                label="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              <Input
                label="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />

              <View>
                <CheckBox
                  title={
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text>I agree with the</Text>
                      <Text onPress={() => alert('terms of use')} style={styles.termsLink}>
                        Terms of use
                      </Text>
                      <Text>and</Text>
                      <Text onPress={() => alert('privacy police')} style={styles.termsLink}>
                        privacy police
                      </Text>
                    </View>
                  }
                  checked={terms}
                  onPress={() => {
                    setTerms(!terms);
                  }}
                  size={25}
                />
              </View>
              <Button
                onPress={handleSubmit as any}
                title="Save and Sign up"
                disabled={!terms}
                containerStyle={{ width: 300, marginBottom: 20 }}
              />
              <Button
                onPress={() => navigation.navigate('Login')}
                title="Cancel"
                containerStyle={{ width: 300, marginBottom: 20 }}
                color="secondary"
              />
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoid>
  );
};

const styles = StyleSheet.create({
  termsLink: {
    textDecorationLine: 'underline',
    marginHorizontal: 5,
    fontWeight: '800',
  },
  dropDown: {
    backgroundColor: 'white',
    width: 200,
    marginVertical: 10,
  },
  inputLabel: { alignSelf: 'center', marginRight: 10, fontSize: 20 },
});

export default Signup;
