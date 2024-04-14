import { FlatList, TouchableOpacity, View } from 'react-native';
import { useReactiveVar } from '@apollo/client';
import { Text } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { safeIdVar, userProfileVar } from '../../cache';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { PrivateRootStackParams } from '../../nav/RootNavigator';

const SafeItem = ({
  safeName,
  safeId,
  navigation,
}: {
  safeName: string;
  safeId: string;
  navigation: NavigationProp<PrivateRootStackParams>;
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: '#eeeeee',
          borderRadius: 10,
          margin: 5,
        }}
        onPress={() => {
          safeIdVar(safeId);
        }}>
        <MaterialCommunityIcons name="treasure-chest" size={50} style={{ marginHorizontal: 5 }} />
        <Text style={{ flexWrap: 'wrap' }}>{safeName}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SafeOption', { safeId });
        }}>
        <MaterialCommunityIcons name="dots-horizontal" size={50} style={{ marginHorizontal: 5 }} />
      </TouchableOpacity>
    </View>
  );
};

const SafeList = () => {
  const user = useReactiveVar(userProfileVar);
  const navigation = useNavigation<NavigationProp<PrivateRootStackParams>>();
  return (
    <View>
      <FlatList
        data={user?.safes}
        renderItem={({ item }) => (
          <SafeItem safeName={item.name} safeId={item._id} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default SafeList;
