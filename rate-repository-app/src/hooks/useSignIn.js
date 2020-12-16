import { useContext } from 'react';
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { SIGN_IN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useHistory } from 'react-router-native';

export const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const [mutate, result] = useMutation(SIGN_IN);
  const history = useHistory();
  const apolloClient = useApolloClient();
  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } }
    });

    await authStorage.setAccessToken(data.authorize.accessToken);
    history.push('/');

    apolloClient.resetStore();
    return data;
  };


  return [signIn, result];
};