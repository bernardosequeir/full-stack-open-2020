import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from './Text';


const styles = StyleSheet.create({
  statBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  stat: { display: 'flex', alignItems: 'center' }
});
const Stat = ({ value, description }) => (
  <View style={styles.stat}>
    <Text fontSize="subheading" fontWeight="bold">
      {value}
    </Text>
    <Text>
      {description}
    </Text>
  </View >
);

const Stats = ({ stars, forks, reviews, ratings }) => (
  <View style={styles.statBox}>
    <Stat value={`${(stars / 1000).toFixed(1)}k`} description="Stars" />
    <Stat value={`${(forks / 1000).toFixed(1)}k`} description="Forks" />
    <Stat value={reviews} description="Reviews" />
    <Stat value={ratings} description="Rating" />
  </View>
);

export default Stats;