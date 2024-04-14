import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useReactiveVar } from '@apollo/client';
import { Button, Switch, Text } from '@rneui/themed';
import * as yup from 'yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { safeIdVar, userProfileVar } from '../../cache';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { PrivateRootStackParams } from '../../nav/RootNavigator';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { IconButtonsSaveCancel } from '../ui/IconButtons';
import { Formik } from 'formik';
import useUpdateSafeOptions from '../../hooks/useUpdateSafeOptions';
import ErrorMessageUI from '../ui/ErrorMessageUI';
// import useUpdateSafeOptions from '../../hooks/useUpdateSafeOptions';

const validationSchema = yup.object().shape({});

const SafeOption = () => {
  const {
    params: { safeId },
  } = useRoute<RouteProp<PrivateRootStackParams, 'SafeOption'>>();
  const user = useReactiveVar(userProfileVar);
  const [autoSharing, setAutoSharing] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedSafeId, setSelectedSafeId] = useState(safeId);
  const { updateSafeOptions, loading, error } = useUpdateSafeOptions();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ name: '' }}
        onSubmit={(values) => {}}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}>
            <Picker
              style={[styles.dropDown, { marginBottom: 20 }]}
              selectedValue={selectedSafeId || undefined}
              onValueChange={(val: string) => {
                setSelectedSafeId(val);
              }}
              mode="dropdown">
              {user?.safes.map((item) => (
                <Picker.Item key={item._id} label={item.name} value={item._id} />
              ))}
            </Picker>
            <View style={[{ display: 'flex', flexDirection: 'row', marginBottom: 20 }]}>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 20,
                  marginRight: 10,
                }}>
                Auto-sharing:
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={autoSharing ? '#00ff00' : '#f4f3f4'}
                value={autoSharing}
                onValueChange={() => setAutoSharing((val) => !val)}
              />
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 20,
                }}>
                {autoSharing ? 'On' : 'Off'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => {}} style={{ marginBottom: 20 }}>
              <View
                style={{
                  display: 'flex',
                  backgroundColor: '#f77272',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Auto-sharing setup</Text>
              </View>
            </TouchableOpacity>
            <TextInput
              multiline
              numberOfLines={4}
              onChangeText={setDescription}
              value={description}
              style={{
                height: 100,
                width: 350,
                textAlignVertical: 'top',
                borderColor: 'gray',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: 'white',
                marginBottom: 20,
              }}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <ButtonSafe onPress={() => {}} title="Rename safe" iconName="lead-pencil" />
              <ButtonSafe onPress={() => {}} title="Delete safe" iconName="delete-outline" />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <ErrorMessageUI display={error} message={error?.message} />
              <IconButtonsSaveCancel
                onPressSave={handleSubmit as any}
                onPressCancel={() => {
                  navigation.goBack();
                }}
                loading={loading}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const ButtonSafe = ({
  onPress,
  title,
  iconName,
}: {
  onPress: () => void;
  title: string;
  iconName: string;
}) => (
  <Button
    onPress={onPress}
    title={title}
    color="primary"
    containerStyle={{ margin: 5, width: 170 }}
    radius="5"
    icon={<MaterialCommunityIcons name={iconName} size={30} style={{}} />}
    iconPosition="left"
    titleStyle={{
      color: 'black',
      fontWeight: 'normal',
    }}
  />
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(197, 197, 197)',
  },
  dropDown: {
    backgroundColor: 'white',
    width: 350,
  },
});

export default SafeOption;
