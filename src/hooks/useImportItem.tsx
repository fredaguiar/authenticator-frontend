import { gql, useMutation, useReactiveVar } from '@apollo/client';
import { useState } from 'react';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { safeIdVar, userProfileVar } from '../cache';
import { TITem, TSafe } from '../context/AuthContext';
import { PrivateRootStackParams } from '../nav/RootNavigator';

const GQL_ADD_ITEM = gql`
  mutation AddItem($itemInput: ItemInput!) {
    addItem(ItemInput: $itemInput) {
      name
      type
      _id
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

const useImportItem = () => {
  const [errorItem, setErrorItem] = useState<string | undefined>();
  const [data, setData] = useState<TITem>();
  const currUser = useReactiveVar(userProfileVar);
  const safeId = useReactiveVar(safeIdVar);

  const [addItemMutation, { loading: loadingItem }] = useMutation(GQL_ADD_ITEM, {
    onCompleted: (data: { addItem: TITem }) => {
      console.log('addItemMutation COMPLETE:', data.addItem);

      if (!currUser || currUser.safes.length === 0) {
        setErrorItem('Safe not found');
        return;
      }

      const updatedSafes = currUser.safes.map((safe: TSafe) => {
        if (safe._id === safeId) {
          return { ...safe, items: [...safe.items, ...[data.addItem]] };
        }
        return safe;
      });

      userProfileVar({ ...currUser, safes: updatedSafes });
      setData(data.addItem);
    },
    onError(error) {
      setErrorItem(`Server error: ${error.message}`);
    },
  });

  const importItem = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, (res: ImagePickerResponse) => {
      if (res.didCancel) {
        return;
      }
      if (res.errorCode) {
        setErrorItem(res.errorMessage);
        return;
      }

      const asset = res.assets && res.assets.length > 0 ? res.assets[0] : undefined;
      if (!ALLOWED_IMAGE_TYPES.includes(asset?.type || '')) {
        setErrorItem(`Image type not supported: ${asset?.type}`);
        return;
      }
      if (!asset) {
        setErrorItem('Image not found');
        return;
      }
      const { base64, fileName, type } = asset;
      console.log('fileName, type, safeId', fileName, type, safeId);
      addItemMutation({
        variables: { itemInput: { name: fileName, type, safeId } },
      });
    });
  };

  return { importItem, data, loadingItem, errorItem };
};

// const imageUri = imagePickerResponse?.assets && imagePickerResponse.assets[0].uri;

export default useImportItem;
