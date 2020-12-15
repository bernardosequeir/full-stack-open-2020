import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
  mutation authorizeMutation($credentials: AuthorizeInput!) {
    authorize(credentials: $credentials) {
      accessToken
    }
  }
`;