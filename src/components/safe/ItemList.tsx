import { FlatList, View } from 'react-native';
import { useReactiveVar } from '@apollo/client';
import { Text } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { safeIdVar, userProfileVar } from '../../cache';
import { SafeUtil } from '../../utils/SafeUtil';
import { TITem } from '../../context/AuthContext';
import { FileTypeUtil } from '../../utils/FileTypeUtil';

const Item = ({ item }: { item: TITem }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#cccccc',
      }}>
      <MaterialCommunityIcons
        name={FileTypeUtil.getFileTypeIcon(item.type)}
        size={50}
        style={{ marginHorizontal: 5 }}
      />
      <Text style={{ flexGrow: 1 }}>{item.name}</Text>
    </View>
  );
};

const ItemList = () => {
  const user = useReactiveVar(userProfileVar);
  const safe = SafeUtil.getSafe(user, useReactiveVar(safeIdVar));

  console.log('ItemList items:', safe?.name, safe?.items);

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
