import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { userProfileVar } from '../cache';
import { TSafe, TUser } from '../context/AuthContext';

const GQL_CREATE_SAFE = gql`
  mutation CreateSafe($safeInput: SafeInput!) {
    createSafe(safeInput: $safeInput) {
      name
      _id
    }
  }
`;

const useCreateNewSafe = () => {
  const navigation = useNavigation();
  const [createSafeMutation, { loading, error }] = useMutation(GQL_CREATE_SAFE, {
    onCompleted: (data: { createSafe: TSafe }) => {
      console.log('createSafeMutation COMPLETE:', data.createSafe);
      const curr = userProfileVar() as TUser;
      userProfileVar({ ...curr, safes: [...curr.safes, ...[data.createSafe]] });
      navigation.goBack();
    },
  });

  const createNewSafe = (name: string) => {
    createSafeMutation({ variables: { safeInput: { name } } });
  };

  return { createNewSafe, loading, error };
};

export default useCreateNewSafe;
