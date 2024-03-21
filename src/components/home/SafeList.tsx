import { View } from 'react-native';
import { Text } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  return (
    <View>
      <SafeItem safeName="BFF dd" />
      <SafeItem safeName="Family" />
      <SafeItem safeName="Personal documents. Year 2025 and 2026" />
      <SafeItem safeName="Work LAST" />
    </View>
  );
};

export default SafeList;
