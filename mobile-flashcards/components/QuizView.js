import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// QuizView accepts deckID to get deck questions and answers
// option: stackNavigator can swap between question, answer and answered panes

export default class QuizView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>QuizView</Text>
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