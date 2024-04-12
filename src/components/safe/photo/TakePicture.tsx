import { Image, Text } from '@rneui/themed';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ErrorMessageUI from '../../ui/ErrorMessageUI';

const TakePicture = () => {
  const [imagePickerResponse, setImagePickerResponse] = useState<ImagePickerResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // getUserImage();
    setError(null);
  }, []);

  const onImageGalleryPress = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled');
      } else if (res.errorCode) {
        console.log('ImagePickerError: ', res.errorMessage);
      } else {
        setImagePickerResponse(res);
        // sendImageToAPI(res.assets[0].base64, res.assets[0].type);
      }
    });
  }, []);

  const onCameraPress = useCallback(() => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchCamera(options, (res: ImagePickerResponse) => {
      if (res.didCancel) {
        setError('User cancelled media capture');
        return;
      }
      if (res.errorCode) {
        setError(`Error: ${res.errorMessage}`);
        return;
      }
      setImagePickerResponse(res);
      const asset = res.assets && res.assets.length > 0 ? res.assets[0] : undefined;
      if (!asset || !asset.base64 || !asset.type) {
        setError('An error has occurred');
        return;
      }
      saveMedia(asset.base64, asset.type);
    });
  }, []);

  const saveMedia = (base64: string, type: string) => {
    const imageTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/jpeg',
      'image/jpeg',
    ];
    if (!imageTypes.includes(type)) {
      setError(`Type not supported: ${type}`);
      return;
    }
  };

  const imageUri = imagePickerResponse?.assets && imagePickerResponse.assets[0].uri;

  console.log('imageUri', imageUri);
  return (
    <View style={styles.container}>
      <ErrorMessageUI display={error} message={error || undefined} />
      <SafeAreaView>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          <CameraButton onPress={onImageGalleryPress} type="gallery" />
          <CameraButton onPress={onCameraPress} type="camera" />
        </View>

        <Image
          source={{
            uri: `${imageUri}`,
          }}
          containerStyle={{
            width: 400,
            height: 170,
          }}
        />
      </SafeAreaView>
    </View>
  );
};

type TCameraButton = 'gallery' | 'camera';
type TCameraButtonValues = { label: string; iconName: string };
const cameraButtonMap: Record<TCameraButton, TCameraButtonValues> = {
  gallery: {
    label: 'Camera',
    iconName: 'camera',
  },
  camera: {
    label: 'Gallery',
    iconName: 'camera-image',
  },
};

const CameraButton = ({
  onPress,
  style,
  disabled,
  type,
}: {
  onPress?: () => void;
  style?: object;
  disabled?: boolean;
  type: TCameraButton;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{}}>
      <View style={{ alignItems: 'center' }}>
        <MaterialCommunityIcons
          name={cameraButtonMap[type].iconName}
          size={50}
          style={style}
          disabled={disabled}
        />
        <Text>{cameraButtonMap[type].label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default TakePicture;
