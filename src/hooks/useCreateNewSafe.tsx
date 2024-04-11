import { gql, useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { safeIdVar, userProfileVar } from '../cache';
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
      const currUser = userProfileVar() as TUser;
      userProfileVar({ ...currUser, safes: [...currUser.safes, ...[data.createSafe]] });
      safeIdVar(data.createSafe._id);
      navigation.goBack();
    },
  });

  const createNewSafe = (name: string) => {
    createSafeMutation({ variables: { safeInput: { name } } });
  };

  return { createNewSafe, loading, error };
};

export default useCreateNewSafe;
