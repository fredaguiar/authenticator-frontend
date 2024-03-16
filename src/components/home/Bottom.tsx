import { View } from 'react-native';
import { Button, Text, makeStyles } from '@rneui/themed';

const Bottom = () => {
  const styles = useStyles({});
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Button
          onPress={() => {}}
          title="Create new safe"
          containerStyle={{ width: 200, marginVertical: 10 }}
          color="primary"
        />
      </View>
      <Text>Add new item:</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 5,
        }}>
        <Button
          onPress={() => {}}
          title="Photo"
          containerStyle={{ width: 100, marginBottom: 20 }}
          color="secondary"
        />
        <Button
          onPress={() => {}}
          title="Video"
          containerStyle={{ width: 100, marginBottom: 20 }}
          color="secondary"
        />
        <Button
          onPress={() => {}}
          title="Audio"
          containerStyle={{ width: 100, marginBottom: 20 }}
          color="secondary"
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme, props: {}) => ({
  container: {
    height: 200,
    backgroundColor: 'lightcoral',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default Bottom;
