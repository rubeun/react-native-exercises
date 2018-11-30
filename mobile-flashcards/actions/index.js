export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

// ### ACTION CREATORS ###

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  }
}

export function addQuestion(deckID, newQuestionArr) {
  return {
    type: ADD_QUESTION,
    deckID,
    newQuestionArr,
  }
}