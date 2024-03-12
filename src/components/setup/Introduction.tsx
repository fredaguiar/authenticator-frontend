import { Button, Text } from '@rneui/themed';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { RootStackParams } from '../../nav/RootNavigator';

type NavProp = NavigationProp<RootStackParams>;

const Introduction = ({}: {}) => {
  const navigation = useNavigation<NavProp>();
  return (
    <View>
      <Text>A Brief Introduction</Text>
      <View>
        {/* <Video
          source={{
            uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          }}
          controls={true}
          resizeMode="cover"
          hideShutterView={true}
          paused={true}
        /> */}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Introduction')}
        style={{ marginBottom: 40 }}>
        <Text style={{ textDecorationLine: 'underline', fontSize: 20 }}>Skip/Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Introduction;
