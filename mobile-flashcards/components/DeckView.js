import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { white, black, gray } from '../utils/colours';

// DeckView accepts deckID - from which the decks title & questions array of question objects can be obtained
// click Add Question button to go to NewQuestionView 
// click Start Quiz to go to QuizView

class DeckView extends Component {
  render() {
    const { deckID, title, deck, navigation } = this.props;
    const deckCount = deck.questions.length;
    const deckEmpty = deckCount === 0 ? true : false;
    console.log("DeckView deckID:" + deckID + " title:" + title + " deck:" + deck);

    if (deckEmpty) {
      return (
        <View style={styles.container}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckCount}>0 Cards</Text>
          <TextButton 
            style={styles.addCardBtn}
            onPress={() => navigation.navigate('NewQuestionView', { deckID: deckID })}
          >
            Add Card
          </TextButton>
        </View>        
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckCount}>{deck.questions.length} Cards</Text>
          <TextButton 
            style={styles.addCardBtn}
            onPress={() => navigation.navigate('NewQuestionView', { deckID: deckID })}
          >
            Add Card
          </TextButton>
          <TextButton 
            style={styles.startQuizBtn}
            onPress={() => navigation.navigate('QuizView', { deckID: deckID, totalCards: deckCount, title: title })}
          >
            Start Quiz
          </TextButton>
        </View>
      )  
    }

  }
}

// # STYLES #
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 50,
    marginBottom: 10,
  },
  deckCount: {
    fontSize: 30,
    color: gray,
    marginBottom: 100,
  },
  addCardBtn: {
    backgroundColor: white,
    fontSize: 30,
    color: black,
  },
  startQuizBtn: {
    backgroundColor: black,
    fontSize: 30,
    color: white,
  },
})

// # PROPS #
// get deckID and title and the individual deck with that deckID
function mapStateToProps (decks, { navigation }) {
  const { deckID, title } = navigation.state.params;

  return {
    deckID,
    title,
    deck: decks[deckID],
  }
}

export default connect(mapStateToProps)(DeckView);