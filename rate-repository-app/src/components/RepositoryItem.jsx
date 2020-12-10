import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import ItemDescription from './ItemDescription';
import Stats from './Stats';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: theme.colors.listItemBackground,
    padding: 10
  },


});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View>
        <ItemDescription fullName={item.fullName} description={item.description} language={item.language} image={item.ownerAvatarUrl} />
      </View>
      <View>
        <Stats stars={item.stargazersCount} forks={item.forksCount} reviews={item.reviewCount} ratings={item.ratingAverage} />
      </View>
    </View >
  );
};

export default RepositoryItem;