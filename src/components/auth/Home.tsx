import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const Home = ({}: {}) => {
  const authContext = useAuth();
  return (
    <View>
      <Text>You are logged in</Text>
      <Button
        onPress={() => {
          authContext.logout();
        }}
        title="Logout">
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default Home;
