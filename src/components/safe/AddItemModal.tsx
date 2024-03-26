import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Divider } from '@rneui/themed';
import { userProfileVar } from '../../cache';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import { PrivateRootStackParams } from '../../nav/RootNavigator';

export type TItemType = 'photo' | 'video' | 'audio' | 'text' | 'file' | 'password';
type TItemTypeValues = { label: string; iconName: string };
const TItemTypeMap: Record<TItemType, TItemTypeValues> = {
  photo: {
    label: 'photo',
    iconName: 'camera',
  },
  video: {
    label: 'video',
    iconName: 'video-box',
  },
  audio: {
    label: 'audio',
    iconName: 'microphone',
  },
  text: {
    label: 'text',
    iconName: 'text-box-outline',
  },
  file: {
    label: 'file',
    iconName: 'file-outline',
  },
  password: {
    label: 'password',
    iconName: 'key-outline',
  },
};

const AddItemModal = ({}: {}) => {
  const {
    params: { safeId, itemType },
  } = useRoute<RouteProp<PrivateRootStackParams, 'AddItemModal'>>();
  const navigation = useNavigation<NavigationProp<PrivateRootStackParams>>();
  const user = useReactiveVar(userProfileVar);
  const [selectedSafeId, setSelectedSafeId] = useState<string | undefined>(safeId);

  const { label, iconName } = TItemTypeMap[itemType];

  return (
    <View style={styles.container}>
      <Divider style={{ borderWidth: 1, borderColor: 'gray' }} />
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <MaterialCommunityIcons
          name={iconName}
          size={50}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{ fontSize: 20, marginBottom: 20 }}>Add {label} </Text>
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <Text style={{ fontSize: 20 }}>Destination safe</Text>
          <Picker
            style={styles.dropDown}
            selectedValue={selectedSafeId}
            onValueChange={(val: string) => {
              setSelectedSafeId(val);
            }}
            mode="dropdown">
            {user?.safes.map((item) => (
              <Picker.Item key={item._id} label={item.name} value={item._id} />
            ))}
          </Picker>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <ButtonImport onPress={() => {}} title="Import from phone" />
        </View>

        <View style={{ alignItems: 'center' }}>
          <MaterialCommunityIcons
            name="close-circle"
            size={50}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={{ fontSize: 20 }}>Close</Text>
          <Text style={{ fontSize: 20 }}>Close</Text>
          <Text style={{ fontSize: 20 }}>Close</Text>
          <Text style={{ fontSize: 20 }}>Close</Text>
          <Text style={{ fontSize: 20 }}>Close</Text>
          <Text style={{ fontSize: 20 }}>Close</Text>
        </View>
      </View>
    </View>
  );
};

const ButtonImport = ({
  onPress,
  title,
  width,
}: {
  onPress: () => void;
  title: string;
  width?: number;
}) => (
  <Button
    onPress={onPress}
    title={title}
    color="white"
    containerStyle={{ margin: 5, width: width ? width : 200 }}
    radius="5"
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

export default AddItemModal;
