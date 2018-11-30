import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { lightGray } from '../utils/colours';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { addQuestion } from '../actions';
import { addQuestionToDeck } from '../utils/api';

// Create new question given a deckID

class NewQuestionView extends Component {

  state = {
    newQuestion: '',
    newAnswer: '',
  }

  handleSubmit = () => {
    const { deckID, addNewQuestion } = this.props;
    const { newQuestion, newAnswer } = this.state;

    // add question to deck in AsyncStorage which returns the question object used to add in redux
    addNewQuestion(deckID, addQuestionToDeck(deckID, newQuestion, newAnswer));

    // redirect back to the DeckView
    this.props.navigation.navigate('DeckView');

  }

  render() {
    const { deckID, questions } = this.props;
    const { newQuestion, newAnswer } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.addQuestionTitle}>Add Your Question and Answer Below</Text>
        <TextInput
          style={styles.addQuestion}
          placeholder="Question"
          value={newQuestion}
          onChangeText={(newQuestion) => this.setState({newQuestion}) }
          maxLength={100}
        />
        <TextInput
          style={styles.addAnswer}
          placeholder="Answer"
          value={newAnswer}
          onChangeText={(newAnswer) => this.setState({newAnswer}) }
          maxLength={100}
        />
        <TextButton
          style={styles.addQuestionBtn} 
          onPress={this.handleSubmit}
          disabled={ newQuestion === '' || newAnswer === '' ? true : false }
        >
          Add Deck
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  addQuestionTitle: {
    fontSize: 42,
    textAlign: 'center',
    padding: 20,
  },
  addQuestion: {
    fontSize: 20,
    height: 50,
    width: 300,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  addAnswer: {
    fontSize: 20,
    height: 50,
    width: 300,
    borderWidth: 1,
    padding: 10,
  },
  addQuestionBtn: {
    fontSize: 20,
    backgroundColor: lightGray,
    width: 200,
    height: 60,
    paddingTop: 20,
  }
});

// # PROPS #
// get deckID and title and the individual deck with that deckID
function mapStateToProps (decks, { navigation }) {
  const { deckID } = navigation.state.params

  return {
    deckID,
    questions: decks[deckID].questions,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewQuestion: (deckID, newQuestionArr) => {
      dispatch(addQuestion(deckID, newQuestionArr))
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewQuestionView);