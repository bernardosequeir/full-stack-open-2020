import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query {
    repositories{
      edges{
        node{
          fullName
          description
          language
          ownerAvatarUrl  
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
        }
      }
    }
  }
`;

export const GET_AUTH = gql`
  query {
    authorizedUser{
      id
      username
    }
  }
`; 