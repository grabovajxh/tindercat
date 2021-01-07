import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/fotologo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 122,
    height: 155,
    marginBottom: 30,
    marginTop: 30,
  },
});

export default memo(Logo);
