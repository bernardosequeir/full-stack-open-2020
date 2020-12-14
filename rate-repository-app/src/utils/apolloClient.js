import ApolloClient from 'apollo-boost';

const createApolloClient = () => {
  return new ApolloClient({
    uri: 'http://172.29.66.254:5000/graphql'
  });
};

export default createApolloClient;