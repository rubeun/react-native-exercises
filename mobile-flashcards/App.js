import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar 
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { red, green, purple, white, black, lightGray } from './utils/colours';
import { Constants } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DeckListView from './components/DeckListView';
import NewDeckView from './components/NewDeckView';
import DeckView from './components/DeckView';
import NewQuestionView from './components/NewQuestionView';
import QuizView from './components/QuizView';
//import { setLocalNotification } from './utils/helpers';


// custom StatusBar
function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} /> 
    </View>
  )
}

// ### TAB Navigation ###
// Tab Navigation configuration with react-navigation v3

const RouteConfigs = {
  DeckListView: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="credit-card-multiple" size={30} color={tintColor} />
    }
  },
  NewDeckView: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="credit-card-plus" size={30} color={tintColor} />
    }
  }
}

const TabNavigatorConfig = {
  navigationOptions: {

  },
  tabBarOptions: {
    showIcon: true,
    activeTintColor: white,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      height: 66,
      color: white,
      backgroundColor: black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
    },
  }
}

const TabNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

const Tabs = createAppContainer(TabNavigator);

// stack navigator when user selects a specific deck. Calls DeckView with deckID

const StackNavigator = createStackNavigator({
  Main: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    })
  },
  NewQuestionView: {
    screen: NewQuestionView,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    })
  },
  QuizView: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      },
    })
  }
})


const MainNavigator = createAppContainer(StackNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <FlashcardStatusBar backgroundColor={black} barStyle='light-content' />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}