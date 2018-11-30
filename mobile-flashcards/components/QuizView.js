import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import QuizCardView from './QuizCardView';

// QuizView accepts deckID to get deck questions and answers
// option: stackNavigator can swap between question, answer and answered panes

class QuizView extends Component {

  // score
  state = {
    currentQuestionIndex: null,
    correctAnswers: null,
    totalAnswers: null,
  }

  // increment correctAnswers and go to next question
  handleAnswerCorrect = () => {
    this.setState((state) => ({
      currentQuestionIndex: state.currentQuestionIndex++,
      correctAnswers: state.correctAnswers++, 
    }))
  }

  // go to next question
  handleAnswerIncorrect = () => {
    this.setState((state) => ({
      currentQuestionIndex: state.currentQuestionIndex++,
    }))
  }
  

  componentWillMount() {

    this.setState({
      currentQuestionIndex: 0,
      correctAnswers: 0,
      totalAnswers: this.props.questions.length
    })

  }

  render() {
    const { questions } = this.props;
    const { currentQuestionIndex, totalAnswers } = this.state;
    const questionText = questions[currentQuestionIndex].question;
    const answerText = questions[currentQuestionIndex].answer;

    return (
      <View style={styles.container}>
        <QuizCardView
          key={questionText}
          question={questionText}
          answer={answerText}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalAnswers}
          handleAnswerCorrect={this.handleAnswerCorrect}
          handleAnswerIncorrect={this.handleAnswerIncorrect}
        />
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