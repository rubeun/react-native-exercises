import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Create a New Deck

export default class NewDeckView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NewDeckView</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});