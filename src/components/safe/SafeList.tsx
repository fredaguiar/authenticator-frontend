import { FlatList, View } from 'react-native';
import { Text } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { userProfileVar } from '../../cache';

const SafeItem = ({ safeName }: { safeName: string }) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons name="treasure-chest" size={50} style={{ marginRight: 5 }} />
      <Text style={{ width: 250 }}>{safeName}</Text>
      <MaterialCommunityIcons name="dots-horizontal" size={50} style={{ alignSelf: 'flex-end' }} />
    </View>
  );
};

const SafeList = () => {
  const user = userProfileVar();

  return (
    <View>
      <FlatList
        data={user?.safes}
        renderItem={({ item }) => <SafeItem safeName={item.name} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default SafeList;
