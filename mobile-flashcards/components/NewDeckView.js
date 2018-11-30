import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { storeDeck, createNewDeck } from '../utils/api';
import { addDeck } from '../actions';
import { green, white, lightGray } from '../utils/colours';

// Create a New Deck

class NewDeckView extends Component {

  state = {
    newDeckName: ''
  }

  // handle state change when user types in textbox
  handleChange = (e) => {

    if (e.target.id === 'new-deck-name') {
      const newDeckName = e.target.value;
      this.setState(() => ({
        newDeckName
      }))  
    }
  }

  // handle adding new deck name on submit, then clear text box.
  handleSubmit = (e) => {
    e.preventDefault();

    const { newDeckName } = this.state;
    const { addNewDeckDispatcher, navigation } = this.props;

    // deckID needed to navigate to new deck after adding it
    const deckID = newDeckName.replace(/\s/g,'_');
    
     // store deck into async then dispatch to redux
    addNewDeckDispatcher(storeDeck(newDeckName)) // sending deck to redux
    
    this.setState(() => ({
      newDeckName: '',
    }));

    console.log("Navigate to DeckView with deckID:" + deckID + " title:" + newDeckName);
    navigation.navigate('DeckView',{ deckID, title: newDeckName });
  }

  

  render() {
    const { newDeckName } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.addDeckTitle}>What is the title of your new deck?</Text>
        <TextInput
          style={styles.addDeckInput}
          placeholder="Deck Name"
          value={newDeckName}
          onChangeText={(newDeckName) => this.setState({newDeckName}) }
          maxLength={100}
        />
        <TextButton
          style={styles.addDeckBtn} 
          onPress={this.handleSubmit}
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
    marginTop: 90,
  },
  addDeckTitle: {
    fontSize: 42,
    textAlign: 'center',
    padding: 20,
  },
  addDeckInput: {
    fontSize: 20,
    height: 50,
    width: 300,
    borderWidth: 1,
    padding: 10,
  },
  addDeckBtn: {
    fontSize: 20,
    backgroundColor: lightGray,
    width: 200,
    height: 60,
    paddingTop: 20,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    addNewDeckDispatcher: (newDeck) => {
      dispatch(addDeck(newDeck))
    }
  }
}


export default connect(null, mapDispatchToProps)(NewDeckView);