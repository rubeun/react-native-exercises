import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { black } from '../utils/colours';

export default function TextButton({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.default, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  default: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center', 
    borderWidth: 1,
    height: 100,
    width: 200,
    marginTop: 20,
    paddingTop: 30,
  }
})