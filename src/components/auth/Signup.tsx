import { Button, Divider, Icon, Text } from '@rneui/themed';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik';
import KeyboardAvoid from '../../utils/KeyboardAvoid';
import GlobalStyles from '../../styles/GlobalStyles';

const Signup = ({}: {}) => {
  return (
    <KeyboardAvoid>
      <View style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground]}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          onSubmit={(values) => {
            alert(values);
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text style={{ margin: 5 }}>name</Text>
              <TextInput
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                style={{ backgroundColor: 'white', margin: 5 }}
              />
              <Text style={{ margin: 5 }}>email</Text>
              <TextInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                style={{ backgroundColor: 'white', margin: 5 }}
              />
              <Text style={{ margin: 5 }}>password</Text>
              <TextInput
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
                style={{ backgroundColor: 'white', margin: 5 }}
              />
              <Button onPress={handleSubmit as any} title="Sign-up" buttonStyle={{ margin: 5 }}>
                <Text>Sign up</Text>
              </Button>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoid>
  );
};

export default Signup;
