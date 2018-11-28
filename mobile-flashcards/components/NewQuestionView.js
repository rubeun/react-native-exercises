import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Create new question given a deckID

export default class NewQuestionView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NewQuestionView</Text>
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