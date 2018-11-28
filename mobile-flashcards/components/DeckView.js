import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextButton from './TextButton';
import { white, purple, black } from '../utils/colours';

// DeckView accepts deckID - from which the decks title & questions array of question objects can be obtained
// click Add Question button to go to NewQuestionView 
// click Start Quiz to go to QuizView

export default class DeckView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DeckView</Text>
        <TextButton style={styles.iosSubmitBtn}>Add Card</TextButton>
        <TextButton style={styles.iosSubmitBtn}>Start Quiz</TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosSubmitBtn: {
    backgroundColor: black,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
})