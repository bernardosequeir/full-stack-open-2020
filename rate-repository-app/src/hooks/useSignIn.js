import { useContext } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

export const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } }
    });

    await authStorage.setAccessToken(data.authorize.accessToken);

    return data;
  };


  return [signIn, result];
};