import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

const Button = ({ mode, style, children, ...props }) => (
  <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: theme.colors.surface },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}
  >
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '35%',
    height: 60,
    marginVertical: 2,
    borderRadius:50,
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Button);
