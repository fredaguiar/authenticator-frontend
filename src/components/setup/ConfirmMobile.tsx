import { Button, Input, Text } from '@rneui/themed';
import { useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { SetupRootStackParams } from '../../nav/RootNavigator';
import { useAuthContext } from '../../context/AuthContext';
import { Formik } from 'formik';

type TCODES = { code1: string; code2: string; code3: string; code4: string; code5: string };

const ConfirmMobile = ({}: {}) => {
  const { confirmMobile, loadingConfirmMobile, errorConfirmMobile } = useAuthContext();
  const navigation = useNavigation<NavigationProp<SetupRootStackParams>>();

  const CODES = { code1: '', code2: '', code3: '', code4: '', code5: '' };

  if (loadingConfirmMobile)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View>
      <Text>
        A number code was sent to your registered PHONE NUMBER via SMS. Please fill the space below
        with that code. The code will be expired in 10 minutes.
      </Text>
      <Formik
        initialValues={{ code1: '', code2: '', code3: '', code4: '', code5: '' }}
        onSubmit={(values) => {
          console.log(values);
          const codeStr = Object.keys(CODES).map((code) => values[code as keyof typeof CODES]);
          confirmMobile(parseInt(codeStr.join('')));
        }}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            {errorConfirmMobile && (
              <Text style={{ color: 'red' }}>{errorConfirmMobile.message}</Text>
            )}

            {Object.keys(CODES).map((code) => (
              <Input
                key={code}
                style={styles.inputCode}
                onChangeText={handleChange(code)}
                onBlur={handleBlur(code)}
                value={values[code as keyof typeof CODES]}
                keyboardType="number-pad"
              />
            ))}

            <Button
              onPress={handleSubmit as any}
              title="Login"
              containerStyle={{ width: 300, marginBottom: 20 }}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('ConfirmMobile')}
              style={{ marginBottom: 40 }}>
              <Text style={{ textDecorationLine: 'underline', fontSize: 20 }}>
                Not a member yet? Sign up.
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  inputCode: {
    marginTop: 15,
    width: 100,
  },
});

export default ConfirmMobile;
