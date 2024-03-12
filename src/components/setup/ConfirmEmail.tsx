import { Button, Text } from '@rneui/themed';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { SetupRootStackParams } from '../../nav/RootNavigator';

const ConfirmEmail = ({}: {}) => {
  const navigation = useNavigation<NavigationProp<SetupRootStackParams>>();
  const [enable, setEnable] = useState(false);
  return (
    <View>
      <Text>
        A number code was sent to your registered EMAIL . Please fill the space below with that
        code. The code will be expired in 10 minutes.
      </Text>

      <Button
        onPress={() => {}}
        title="Save and Sign up"
        disabled={!enable}
        containerStyle={{ width: 300, marginBottom: 20 }}
      />
    </View>
  );
};

export default ConfirmEmail;
