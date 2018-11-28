import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchDeckResults } from '../utils/api';
import { receiveDecks } from '../actions';


class DeckListView extends Component {

  // check if loaded
  state = {
    ready: false,
  }

  componentDidMount() {
    const { decksData } = this.props;

    fetchDeckResults().then((decks) => decksData(decks))
  }

  render() {
    const { decks, decksArray } = this.props;

    // if deck is empty
    if (decksArray === null) {
      return (
        <View style={styles.container}>
          <Text>No Decks</Text>
        </View>
      )  
    }

    // display all the decks
    return (
      <View style={styles.container}>
        
        {decksArray.map((deck) => (
          <View key={decks[deck].title}>
            <Text>{decks[deck].title}</Text>
          </View>
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
});

function mapStateToProps (decks) {
  const decksArray = Object.keys(decks).length !== 0 
    ? Object.keys(decks) 
    : null

  return {
    decks: Object.keys(decks).length !== 0
      ? decks 
      : null,
    decksArray,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    decksData : (decks) => {
      dispatch(receiveDecks(decks))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckListView)