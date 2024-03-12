import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';
import { useAuthContext } from '../../context/AuthContext';

const Home = ({}: {}) => {
  const { user, logout } = useAuthContext();
  return (
    <View>
      <Text>User: {user?.firstName}</Text>
      <Button
        onPress={() => {
          logout();
        }}
        title="Logout">
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default Home;
