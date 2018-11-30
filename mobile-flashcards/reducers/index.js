import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions';

// @TODO question reducer
function questionReducer(state = {}, action) {
  switch (action.type) {

    case ADD_QUESTION:
      return state.concat([action.newQuestionArr]);
    default :
      return state;
  }
}

function decks(state = {}, action) {
  switch(action.type) {

    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK :
      return {
        ...state,
        ...action.deck
      }
    case ADD_QUESTION :
      const { deckID } = action;
      return {
        ...state,
        [deckID]: {
          ...state[deckID],
          questions: questionReducer(state[deckID].questions, action)
        }
      }      
    default :
      return state;
  }
}

export default decks;