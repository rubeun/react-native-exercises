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
export function submitDeck({ deck, key }) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}

// remove deck from AsyncStorage
export function removeDeck(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results); 
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

