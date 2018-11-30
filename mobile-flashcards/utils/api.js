import { AsyncStorage } from 'react-native';
import { DECK_STORAGE_KEY, formatDecks } from './_decks';

// get decks from AsyncStorage
export function fetchDeckResults() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((decks) => {
      return formatDecks(decks);
    })
}

// add deck to AsyncStorage
export function storeDeck(deckTitle) {

  const newDeckObj = createNewDeck(deckTitle);

  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(newDeckObj));
}

// remove deck from AsyncStorage
export function removeDeck(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results); 
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
    })
}

// creates a new deck with the deckName string and returns the object
export function createNewDeck(deckName) {
  const deckKey = deckName.replace(/\s/g,'_');

  return {
    [deckKey]: {
      title: deckName,
      questions: []
    }
  }
}

// adds new question and answer to array questions in deck with deckID
export function addQuestionToDeck(deckID, newQuestion, newAnswer) {
  const newQuestionArr = [{
    question: newQuestion,
    answer: newAnswer,
  }];

  // load from then store to AsyncStorage
  AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[deckID] = {
        ...data[deckID],
        questions: data[deckID].questions.concat(newQuestionArr)
      };
      AsyncStorage.setItem(DECK_STORAGE_KEY,JSON.stringify(data));
    });
  
  // return new question & answer as object for use in storing in AsyncStorage
  return newQuestionArr[0];
}