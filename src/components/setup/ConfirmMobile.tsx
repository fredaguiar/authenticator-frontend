import { Button, Input, Text, makeStyles } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { SetupRootStackParams } from '../../nav/RootNavigator';
import { useAuthContext } from '../../context/AuthContext';
import { Formik } from 'formik';
import GlobalStyles from '../../styles/GlobalStyles';

const ConfirmMobile = ({}: {}) => {
  const { confirmMobile, loadingConfirmMobile, errorConfirmMobile } = useAuthContext();
  const styles = useStyles();
  const navigation = useNavigation<NavigationProp<SetupRootStackParams>>();

  const CODES = { code1: '', code2: '', code3: '', code4: '', code5: '' };

  if (loadingConfirmMobile)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View
      style={[GlobalStyles.AndroidSafeArea, GlobalStyles.SkyBackground, GlobalStyles.Container]}>
      <Text>
        A number code was sent to your registered PHONE NUMBER via SMS. Please fill the space below
        with that code. The code will be expired in 10 minutes.
      </Text>
      <Formik
        initialValues={{ code1: '', code2: '', code3: '', code4: '', code5: '' }}
        onSubmit={(values) => {
          const codeStr = Object.keys(CODES).map((code) => values[code as keyof typeof CODES]);
          confirmMobile(parseInt(codeStr.join('')));
        }}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ display: 'flex', alignItems: 'center' }}>
            {errorConfirmMobile && (
              <Text style={{ color: 'red' }}>{errorConfirmMobile.message}</Text>
            )}
            <View style={styles.inputTextView}>
              {Object.keys(CODES).map((code) => (
                <Input
                  key={code}
                  containerStyle={styles.inputText}
                  onChangeText={handleChange(code)}
                  onBlur={handleBlur(code)}
                  value={values[code as keyof typeof CODES]}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </View>

            <Button
              onPress={handleSubmit as any}
              title="Confirm"
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

const useStyles = makeStyles((theme, props: {}) => ({
  inputText: {
    width: 70,
    textAlign: 'center',
  },
  inputTextView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
}));

export default ConfirmMobile;
