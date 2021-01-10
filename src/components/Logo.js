import React, { memo } from 'react';
import { Image, StyleSheet,View } from 'react-native';

const Logo = () => (
  <View style={{ width:'100%',}}>
  <Image source={require('../assets/fotologo.png')} style={styles.image} />
  </View>
);

const styles = StyleSheet.create({
  image: {
    flexGrow:1,
    width: 190,
    height: 240,
    marginBottom:30,
    marginLeft:'auto',
    marginRight:'auto',
   
  },
});

export default memo(Logo);
