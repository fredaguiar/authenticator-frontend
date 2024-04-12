import { Text } from '@rneui/themed';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ErrorMessageUI = ({ message, display }: { message: string | undefined; display: any }) => {
  if (display) {
    <View>
      <MaterialCommunityIcons
        name="alert-circle-outline"
        size={20}
        color="red"
        style={{
          marginRight: 20,
        }}
      />
      <Text style={{ color: 'red' }}>{message}</Text>
    </View>;
  }
  return <></>;
};

export default ErrorMessageUI;
