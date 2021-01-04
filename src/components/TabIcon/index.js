import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesome,MaterialIcons } from '@expo/vector-icons/';

export default function TabIcon({ name, tintColor }) {
  return <MaterialIcons name={name} size={24} color={tintColor} />;
}

TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired,
};
