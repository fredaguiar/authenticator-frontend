import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { userProfileVar } from '../cache';
import { TSafe, TUser } from '../context/AuthContext';

const GQL_UPDATE_SAFE_OPTIONS = gql`
  mutation TODO($safeInput: SafeInput!) {
    createSafe(safeInput: $safeInput) {
      name
      _id
    }
  }
`;

const useUpdateSafeOptions = () => {
  const navigation = useNavigation();
  const [updateSafeOptionsMutation, { loading, error }] = useMutation(GQL_UPDATE_SAFE_OPTIONS, {
    onCompleted: (data: { updateSafeOptions: TSafe }) => {
      console.log('updateSafeOptionsMutation COMPLETE:', data.updateSafeOptions);
      const currUser = userProfileVar() as TUser;
      navigation.goBack();
    },
  });

  const updateSafeOptions = (name: string) => {
    updateSafeOptionsMutation({ variables: { safeInput: { name } } });
  };

  return { updateSafeOptions, loading, error };
};

export default useUpdateSafeOptions;
