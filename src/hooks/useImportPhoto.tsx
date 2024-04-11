import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { safeIdVar, userProfileVar } from '../cache';
import { TITem, TSafe, TUser } from '../context/AuthContext';

const GQL_ADD_ITEM = gql`
  mutation AddItem($itemInput: ItemInput!) {
    addItem(ItemInput: $itemInput) {
      name
      _id
      type
    }
  }
`;

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/jpeg',
  'image/jpeg',
];

const useImportPhoto = () => {
  const [errorPhoto, setErrorPhoto] = useState<string | undefined>();
  const navigation = useNavigation();

  const [addItemMutation, { loading: loadingPhoto }] = useMutation(GQL_ADD_ITEM, {
    onCompleted: (data: { addItem: TITem }) => {
      console.log('addItemMutation COMPLETE:', data.addItem);
      const currUser = userProfileVar() as TUser;
      const safeId = safeIdVar() as string;

      const updatedSafes = currUser.safes.map((safe: TSafe) => {
        if (safe._id === safeId) {
          return { ...safe, items: [...safe.items, ...[data.addItem]] };
        }
        return safe;
      });

      userProfileVar({ ...currUser, safes: updatedSafes });
      navigation.goBack();
    },
    onError(error) {
      console.log('Server error:', error.message);
    },
  });

  const importPhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, (res: ImagePickerResponse) => {
      if (res.didCancel) {
        return;
      }
      if (res.errorCode) {
        setErrorPhoto(res.errorMessage);
        return;
      }

      const asset = res.assets && res.assets.length > 0 ? res.assets[0] : undefined;
      if (!ALLOWED_IMAGE_TYPES.includes(asset?.type || '')) {
        setErrorPhoto(`Image type not supported: ${asset?.type}`);
        return;
      }
      addItemMutation({ variables: { itemInput: { name } } });
    });
  };

  return { importPhoto, loadingPhoto, errorPhoto };
};

// const imageUri = imagePickerResponse?.assets && imagePickerResponse.assets[0].uri;

export default useImportPhoto;
