import { Button, Text } from '@rneui/themed';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { SetupRootStackParams } from '../../nav/RootNavigator';
import { useAuthContext } from '../../context/AuthContext';

const Introduction = ({}: {}) => {
  const navigation = useNavigation<NavigationProp<SetupRootStackParams>>();
  const { confirmMobile, loadingConfirmMobile, errorConfirmMobile } = useAuthContext();
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
