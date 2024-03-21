import { View } from 'react-native';
import { Button, Text, makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PrivateRootStackParams } from '../../nav/RootNavigator';

const Bottom = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<PrivateRootStackParams, 'CreateSafe'>>();
  const styles = useStyles({});
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <ButtonAddItem
          onPress={() => {
            navigation.navigate('CreateSafe');
          }}
          title="Create new safe"
          width={200}
        />
      </View>
      <Text style={{ fontWeight: 'bold' }}>Add new item:</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}>
        <ButtonAddItem onPress={() => {}} title="Photo" />
        <ButtonAddItem onPress={() => {}} title="Video" />
        <ButtonAddItem onPress={() => {}} title="Audio" />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}>
        <ButtonAddItem onPress={() => {}} title="Text" />
        <ButtonAddItem onPress={() => {}} title="File" />
        <ButtonAddItem onPress={() => {}} title="Password" />
      </View>
    </View>
  );
};

const ButtonAddItem = ({
  onPress,
  title,
  width,
}: {
  onPress: () => void;
  title: string;
  width?: number;
}) => (
  <Button
    onPress={onPress}
    title={title}
    color="white"
    containerStyle={{ margin: 5, width: width ? width : 120 }}
    radius="5"
    titleStyle={{
      color: 'black',
      fontWeight: 'normal',
    }}
  />
);

const useStyles = makeStyles((theme, props: {}) => ({
  container: {
    height: 250,
    backgroundColor: 'rgb(197, 197, 197)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default Bottom;
