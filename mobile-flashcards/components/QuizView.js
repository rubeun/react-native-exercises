import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import QuizCardView from './QuizCardView';
import TextButton from './TextButton';
import { lightGray } from '../utils/colours';

// QuizView accepts deckID to get deck questions and answers
// option: stackNavigator can swap between question, answer and answered panes

class QuizView extends Component {

  // current index, score, current question and answer
  state = {
    currentQuestionIndex: 0,
    correctAnswers: 0,
    currentQuestion: '',
    currentAnswer: ''
  }

  // reset state and populate first question and answer
  handleResetState = () => {
    const { questions } = this.props;

    this.setState({
      currentQuestionIndex: 0,
      correctAnswers: 0,
      currentQuestion: questions[0].question,
      currentAnswer: questions[0].answer,
    });

  }

  // increment correctAnswers count and go to next question by incrementing current index
  handleAnswerCorrect = () => {
    const { questions, totalCards } = this.props;
    const { currentQuestionIndex } = this.state;

    // if last card, don't update question or answer. increment correct answer count and current index so we can show the score page
    if (currentQuestionIndex === totalCards - 1) {
      this.setState((state) => ({                                                                  
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        correctAnswers: state.correctAnswers + 1,
      }));
    } else {
      this.setState((state) => ({                                                                  
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        correctAnswers: state.correctAnswers + 1,
        currentQuestion: questions[currentQuestionIndex + 1].question,
        currentAnswer: questions[currentQuestionIndex + 1].answer,
      })); 
    }

  }

  // go to next question by incrementing current index
  handleAnswerIncorrect = () => {
    const { questions, totalCards } = this.props;
    const { currentQuestionIndex } = this.state;

    // if last card, don't update question or answer. increment index so we can show the score page
    if (currentQuestionIndex === totalCards - 1) {
      this.setState((state) => ({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      }));
    } else {
      this.setState((state) => ({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        currentQuestion: questions[currentQuestionIndex + 1].question,
        currentAnswer: questions[currentQuestionIndex + 1].answer,
      }));
    }
  }

  // restart the quiz from first question (i.e. just reset state)
  handleRestartQuiz = () => {
    this.handleResetState();
  }

  // reset the state and return to original deck view
  handleReturnToDeck = () => {
    const { deckID, navigation, title } = this.props;

    // reset state then navigate back to original deck view
    this.handleResetState();
    navigation.navigate('DeckView',{ deckID, title })
  }

  componentWillMount() {
    // reset state for default values at the start
    this.handleResetState();
  }
  

  render() {
    const { totalCards } = this.props;
    const { currentQuestionIndex, currentQuestion, currentAnswer, correctAnswers } = this.state;
    console.log("Correct Answers:", this.state.correctAnswers);

    // If not the last card, display QuizCard with questions, answers and handlers passed down
    if (currentQuestionIndex < totalCards) {
      return (
        <View style={styles.container}>
          <QuizCardView
            key={currentQuestion}
            question={currentQuestion}
            answer={currentAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={totalCards}
            handleAnswerCorrect={this.handleAnswerCorrect}
            handleAnswerIncorrect={this.handleAnswerIncorrect}
          />
        </View>
      )
    } else {
      // display Score Page with buttons to restart or return to deck
      return (
        <View style={styles.container}>
          <Text style={styles.quizTitle}>END OF QUIZ!</Text>
          <Text style={styles.quizScore}>{correctAnswers}/{totalCards} Correct</Text>
          <TextButton 
            style={styles.quizBtn}
            onPress={this.handleRestartQuiz}  
          >
            Restart Quiz
          </TextButton>
          <TextButton 
            style={styles.quizBtn}
            onPress={this.handleReturnToDeck}
          >
            Back to Deck
          </TextButton>
        </View>
      )
    }
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
    marginBottom: 60,
  },
  quizScore: {
    fontSize: 40,
    marginBottom: 60,
  },
  quizBtn: {
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
  const { deckID, totalCards, title } = navigation.state.params

  return {
    deckID,
    questions: decks[deckID].questions,
    totalCards,
    title
  }
}

export default connect(mapStateToProps)(QuizView);