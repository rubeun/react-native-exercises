import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';


class DeckListView extends Component {

  // check if loaded
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>DeckListView</Text>
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
    decksObj : (decks) => {
      dispatch(receiveDecks(decks))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckListView)