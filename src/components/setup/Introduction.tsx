import { Text } from '@rneui/themed';
import { TouchableOpacity, View } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useAuthContext } from '../../context/AuthContext';
import { useRef, useState } from 'react';
import ErrorMessageUI from '../ui/ErrorMessageUI';
import SpinnerUI from '../ui/SpinnerUI';

const Introduction = ({}: {}) => {
  const { introViewed, loadingIntroViewed, errorIntroViewed } = useAuthContext();
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<any>({});

  if (loadingIntroViewed) return <SpinnerUI />;

  return (
    <View>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <ErrorMessageUI display={errorIntroViewed} message={errorIntroViewed.message} />
        <Video
          ref={video}
          style={{ width: 300, height: 300 }}
          source={{
            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
        <TouchableOpacity onPress={() => introViewed(true)} style={{ marginBottom: 40 }}>
          <Text style={{ textDecorationLine: 'underline', fontSize: 20 }}>Skip/Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Introduction;
