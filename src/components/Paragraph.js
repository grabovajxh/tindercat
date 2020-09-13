import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Paragraph = ({ children }) => <Text style={styles.text}>{children}</Text>;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 26,
    color: theme.colors.secondary,
    textAlign: 'center',
    marginBottom: 2,
  },
});

export default memo(Paragraph);
