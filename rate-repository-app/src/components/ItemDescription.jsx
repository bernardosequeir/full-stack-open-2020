import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({

  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  descriptionHeader: {
    marginLeft: 10,
    display: 'flex',
    alignItems: "flex-start",
    flexShrink: 1

  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  }
});

const ItemDescription = ({ fullName, description, language, image }) => (
  <View style={styles.descriptionContainer}>
    <Image style={styles.image} source={{ uri: image, width: 50, height: 50 }} />
    <View style={styles.descriptionHeader}>
      <Text fontSize="subheading" fontWeight="bold">{fullName}</Text>
      <Text>{description}</Text>
      <View style={styles.language}>
        <Text color="textLight">{language}</Text>
      </View>
    </View>
  </View>
);

export default ItemDescription;