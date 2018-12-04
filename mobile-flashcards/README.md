# Rubeun's Mobile Flashcards iOS App
Mobile Flashcards React Native App for iOS developed using Expo.

This iOS App allows user to create decks of flashcards with the ability to create unlimited correct/incorrect questions quizzed to the user. User can cheat by looking at the answer if the user wants with no penalty. 

## Installation
To install this app on your iOS device and run it:

On Your Computer:
* Download all these files to your computer
* Change into the directory by `cd mobile-flashcards`
* Install by `yarn install`
* Launch by `yarn start`
* A QR code will appear when the server has started successfully

On Your Mobile Device
* Download the Expo iOS app in the [App Store](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8)
* Open your camera on your mobile device and scan the QR code which opens the Expo App

## Views

The device will have

 View | Purpose 
 --- | --- 
DeckListView | a list of all the decks available and number of cards in them (default view) 
DeckView | a selected deck with number of cards and option to create a question or start a quiz 
NewQuestionView | allows the user to create a new question and answer inside the selected deck 
QuizView | shows either a quiz card or score page depending on if you're at the end 
QuizCardView | shows individual quiz questions with the ability to flip to see the answer and mark correct/incorrect 
NewDeckView | allows user to create a new deck with user designated title 
