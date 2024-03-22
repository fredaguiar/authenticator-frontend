import { gql, useMutation } from '@apollo/client';
import { userProfileVar } from '../cache';
import { TUser } from '../context/AuthContext';

const GQL_CREATE_SAFE = gql`
  mutation CreateSafe($safeInput: SafeInput!) {
    createSafe(safeInput: $safeInput) {
      name
      _id
    }
  }
`;

const useCreateNewSafe = () => {
  const [createSafeMutation, { loading, error }] = useMutation(GQL_CREATE_SAFE, {
    onCompleted: (data) => {
      console.log('createSafeMutation COMPLETE:', data.createSafe);
      const curr = userProfileVar() as TUser;
      userProfileVar({ ...curr, safes: [...curr?.safes] });
    },
    onError(error) {
      console.log('createSafeMutation ERROR:', error.stack);
    },
  });

  const createNewSafe = async (name: string) => {
    return createSafeMutation({ variables: { safeInput: { name } } });
  };

  return { createNewSafe, loading, error };
};

export default useCreateNewSafe;
