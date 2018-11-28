import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { red } from '../utils/colours';

// QuizView accepts deckID to get deck questions and answers
// option: stackNavigator can swap between question, answer and answered panes

class QuizCardView extends Component {

  state = {
    flipButtonLabel: 'Answer'
  }

  // flip card to show answer using Animated.spring
  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0, 
        friction: 8,
        tension: 10,
      }).start();
      this.setState({
        flipButtonLabel: 'Answer'
      });
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180, 
        friction: 8,
        tension: 10,
      }).start();  
      this.setState({
        flipButtonLabel: 'Question'
      });
    }
  }

  // increment correct number in QuizView state and go to next question
  answerCorrect = () => {

  }

  // go to next question
  answerIncorrect = () => {

  }

  componentWillMount() {

    // animate flipcard
    this.animatedValue = new Animated.Value(0);
    this.value = 0; // default value
    this.animatedValue.addListener(({ value }) => {
       this.value = value;
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
       inputRange: [0, 180],
       outputRange: ['180deg', '360deg'],
    });

  }



  render() {
    const { question, answer, questionNumber, totalQuestions } = this.props;

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }

    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View style={styles.question}>
        <Text style={styles.questionCount}>{questionNumber}/{totalQuestions}</Text>
        <View>
          <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
            <Text style={styles.flipText}>{question}</Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={styles.flipText}>{answer}</Text>
          </Animated.View>
        </View>
        <TouchableOpacity
          onPress={() => this.flipCard()}
        >
          <Text style={styles.flipBtn}>{this.state.flipButtonLabel}</Text>
        </TouchableOpacity>
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
  questionCount: {
    fontSize: 26,
    textAlign: 'left',
  },
  flipCard: {
    width: 300,
    height: 300,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    textAlign: 'center',
    position: 'absolute',
    top: 0,
  },
  flipText: {
    fontSize: 40,
    textAlign: 'center',
  },
  flipBtn: {
    fontSize: 25,
    textAlign: 'center',
    color: red,
  }
});

export default QuizCardView;