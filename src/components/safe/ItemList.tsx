import { FlatList, View } from 'react-native';
import { useReactiveVar } from '@apollo/client';
import { Text } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { safeIdVar, userProfileVar } from '../../cache';
import { SafeUtil } from '../../utils/SafeUtil';

const Item = ({ name }: { name: string }) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons name="file-document-outline" size={50} style={{ marginRight: 5 }} />
      <Text style={{ width: 250 }}>{name}</Text>
      <MaterialCommunityIcons name="dots-vertical" size={50} style={{ alignSelf: 'flex-end' }} />
    </View>
  );
};

const ItemList = () => {
  // const user = useReactiveVar(userProfileVar);
  // const safe = SafeUtil.getSafe(user, useReactiveVar(safeIdVar));

  const items = ['item 1', 'item 2', 'item 3', 'item 4'];

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <Item name={item} />}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

export default ItemList;
