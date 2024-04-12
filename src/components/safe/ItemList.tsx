import { FlatList, View } from 'react-native';
import { useReactiveVar } from '@apollo/client';
import { Text } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { safeIdVar, userProfileVar } from '../../cache';
import { SafeUtil } from '../../utils/SafeUtil';
import { TITem, TUser } from '../../context/AuthContext';

const Item = ({ item }: { item: TITem }) => {
  return (
    <View
      style={{
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <MaterialCommunityIcons name="file-document-outline" size={50} style={{ marginRight: 5 }} />
      <Text style={{ width: 250 }}>
        {item.name} - {item.type}
      </Text>
      <MaterialCommunityIcons name="dots-vertical" size={50} style={{ alignSelf: 'flex-end' }} />
    </View>
  );
};

const ItemList = () => {
  const user = useReactiveVar(userProfileVar);
  const safe = SafeUtil.getSafe(user, useReactiveVar(safeIdVar));

  return (
    <View>
      <FlatList
        data={safe?.items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default ItemList;
