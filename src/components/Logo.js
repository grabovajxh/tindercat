import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/tinder-catalog.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 168,
    height: 168,
    marginBottom: 1,
  },
});

export default memo(Logo);
