import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import QuizCardView from './QuizCardView';

// QuizView accepts deckID to get deck questions and answers
// option: stackNavigator can swap between question, answer and answered panes

class QuizView extends Component {

  // score
  state = {
    currentQuestionNumber: 1,
    correct: 0,
  }

  render() {
    const { deckID, questions } = this.props;
    const { currentQuestionNumber } = this.state;

    return (
      <View style={styles.container}>
        {questions.map((questionAndAnswer, index) => (
          <QuizCardView
            key={questionAndAnswer.question}
            question={questionAndAnswer.question}
            answer={questionAndAnswer.answer}
            questionNumber={index+1}
            totalQuestions={questions.length}
          />
        ))}
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
  quizTitle: {
    fontSize: 50,
    marginBottom: 100,
  }
});

// # PROPS #
// get deckID and title and the individual deck with that deckID
function mapStateToProps (decks, { navigation }) {
  const { deckID, title } = navigation.state.params

  return {
    deckID,
    questions: decks[deckID].questions,
  }
}

export default connect(mapStateToProps)(QuizView);