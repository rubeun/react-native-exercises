import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchDeckResults } from '../utils/api';
import { receiveDecks } from '../actions';
import { red, green, purple, white, black, lightGray, lightBlue, gray } from '../utils/colours';
import { AppLoading } from 'expo';



class DeckListView extends Component {

  // check if loaded, if not show AppLoading
  state = {
    ready: false,
  }

  componentDidMount() {
    const { decksData } = this.props;

    fetchDeckResults()
      .then((decks) => decksData(decks))
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    const { decks, decksArray, navigation } = this.props;
    const { ready } = this.state;
    
    // show loading screen until app is ready
    if (ready === false) {
      return <AppLoading />
    }

    // if deck is empty
    if (decksArray === null) {
      return (
        <View style={styles.container}>
          <Text style={styles.deckTitle}>No Decks</Text>
        </View>
      )  
    }

    // display all the decks
    return (
      <ScrollView>
        
        {decksArray.map((deck) => (
          <TouchableOpacity 
            key={decks[deck].title} 
            style={styles.deckContainer}
            onPress={() => navigation.navigate('DeckView', {deckID: deck, title: decks[deck].title})}
          >
            <Text style={styles.deckTitle}>{decks[deck].title}</Text>
            <Text style={styles.deckCount}>{decks[deck].questions.length} Cards</Text>
          </TouchableOpacity>
        ))}

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  deckContainer: {
    height: 100,
    width: 300,
    borderRadius: 10,
    backgroundColor: lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 35,
  },
  deckTitle: {
    fontSize: 25,
  },
  deckCount: {
    fontSize: 18,
    color: gray,
  }
});

function mapStateToProps (decks) {
  const decksArray = Object.keys(decks).length !== 0 
    ? Object.keys(decks) 
    : null
  
  return {
    decks,
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