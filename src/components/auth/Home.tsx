import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';

const Home = ({}: {}) => {
  return (
    <View>
      <Text>You are logged in</Text>
      <Button onPress={() => {}} title="Logout">
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default Home;
