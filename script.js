 
var gameMode1= "enter number of players";
var gameMode2 = "enter betting amount";
var gameMode3 = "deal cards";
var gameMode4 = "player turn";
var gameMode5 = "result";

var gameMode = gameMode1;
var playerHand = [];
var allPlayerHand = [];
var dealerHand = [];
var cardDeck = [];
var numberOfPlayers = 0;
var playerNumber = 0;
var playerWallet = [];
var playerBets = [];
var bettingIndex = 0;


var main = function (input) {
  var myOutputValue =
    "Please enter the number of players and press the click button👆🏻";
  if (gameMode == gameMode1 && input > 0) {
    numberOfPlayers = input;
    gameMode = gameMode2;
 //dollar wallet 

    createWallet(numberOfPlayers);
    playerNumber = 1;
    return (myOutputValue =
      "Number of players " +
      numberOfPlayers +
      "<br><br>" +
      printWallet(numberOfPlayers) +
      "<br>Player 1 Please enter the amount of dollars that you would like to bet and press click👆🏻");

  }

 // bets  collected
  if (gameMode == gameMode2) {
    if (gameMode == gameMode2 && input == "again")
      return (myOutputValue =
        "Dealer is shuffling a new deck <br><br>Player " +
        playerNumber +
        ", Please enter the amount of dollars that you would like to bet and press click👆🏻");

    if (
      gameMode == gameMode2 &&
      input > 0 &&
      playerNumber < numberOfPlayers
    ) {
      playerBets.push(input);
      playerNumber += 1;
      return (myOutputValue =
        printBettingSlip() +
        "<br><br>Player " +
        playerNumber +
        ", Please enter the amount of dollars that you would like to bet and press click👆🏻");
    }
    if (
      gameMode == gameMode2 &&
      input > 0 &&
      playerNumber == numberOfPlayers
    ) {
      playerBets.push(input);
      playerNumber = 0;
      gameMode = gameMode3;
      return (myOutputValue =
        printBettingSlip() +
        "<br>All players have submitted their bets. Press click to start the game👆🏻");
    }
    return (
      "Player " +
      playerNumber +
      ", Please enter the amount of dollars that you would like to bet and press click👆🏻"
    );
  }

  if (gameMode == gameMode3) {
  //shuffled and dealt 
    allPlayerHand = [];
    //deck is created and shuffled
    cardDeck = shuffleCards(makeDeck());

    //players are dealt 2 cards each
    var playerIndex = 0;
    while (playerIndex < numberOfPlayers) {
      var currentPlayerHand = dealPlayerCards(cardDeck);
      playerIndex += 1;
      allPlayerHand.push(currentPlayerHand);
    }
    console.log(allPlayerHand);

    //dealer is dealt 2 cards
    dealerHand = dealDealerCards(cardDeck);
    console.log(dealerHand);

 //changes to player turn
    gameMode = gameMode4;
    playerNumber = 0;

    var myOutputValue =
      "Dealer deals the cards<br><br><br>Player " +
      (playerNumber + 1) +
      " turn<br><br>Press click to view your hand";
    return myOutputValue;
  }


  if (gameMode == gameMode4 && playerNumber < numberOfPlayers) {

    var myOutputValue =
      "Player " +
      (playerNumber + 1) +
      " hand:<br>" +
      showHand(allPlayerHand[playerNumber]) +
      '<br>To hit: Input "hit"<br>To stand: Input "stand"<br><br>You need a minimum of 14 points to Stand';

    if (input == "hit") {
      drawCard(allPlayerHand[playerNumber], cardDeck);
      myOutputValue =
        "Player " +
        (playerNumber + 1) +
        " hand:<br>" +
        showHand(allPlayerHand[playerNumber]) +
        '<br>To hit: Input "hit"<br>To stand: Input "stand"<br><br>You need a minimum of 14 points to Stand';
      return myOutputValue;
 
    }
    if (input == "stand" && countHand(allPlayerHand[playerNumber]) >= 14) {
      playerNumber += 1;
      if (playerNumber == numberOfPlayers) {
      
        dealerHand = topupDealerHand(dealerHand, cardDeck);
        gameMode = gameMode5;
        return (myOutputValue =
          "Dealer turn<br><br>Dealer is drawing the cards<br><br><br>Press click to view results");
      }
      return (myOutputValue =
        "Player " +
        (playerNumber + 1) +
        " turn<br><br>Press click to view your hand");
    }
    return myOutputValue;
  }
  if (gameMode == gameMode4 && playerNumber == numberOfPlayers) {

    dealerHand = topupDealerHand(dealerHand, cardDeck);
    gameMode = gameMode5;
  }

 
  if (gameMode == gameMode5) {
 
    myOutputValue =
      printFinalResults() +
      "<br>" +
      printWallet(numberOfPlayers) +
      '<br>Input "again" to play another round';
    playerBets = [];
    playerNumber = 1;
    gameMode = gameMode2;
    console.log(playerWallet);
    return myOutputValue;
  }
  return myOutputValue;
};


var createWallet = function (number) {
  var walletIndex = 0;
  while (walletIndex < number) {
    playerWallet.push(Number(1000));
    walletIndex += 1;
  }
  return playerWallet;
};

var printWallet = function (number) {
  var walletBalance = "Current balance<br>";
  var walletIndex = 0;

  while (walletIndex < number) {
    var playerIndex = walletIndex + 1;
    walletBalance =
      walletBalance +
      "Player " +
      playerIndex +
      ": " +
      playerWallet[walletIndex] +
      " dollars<br>";
    walletIndex += 1;
  }
  console.log(playerWallet);
  return walletBalance;
};

var printBettingSlip = function () {
  var bettingSlip = "Bets on the table<br>";
  var betIndex = 0;
  while (betIndex < playerBets.length) {
    var playerIndex = betIndex + 1;
    bettingSlip =
      bettingSlip +
      "Player " +
      playerIndex +
      ": " +
      playerBets[betIndex] +
      " dollars<br>";
    betIndex += 1;
  }
  return bettingSlip;
};


var makeDeck = function () {

  var cardDeck = [];

  var suits = ["♦️", "♣️", "♥️", "♠️"];


  var suitIndex = 0;
  while (suitIndex < suits.length) {
    var currentSuit = suits[suitIndex];

    var rankCounter = 1;
    while (rankCounter <= 13) {

      var cardName = rankCounter;
  
      if (cardName == 1) {
        cardName = "Ace";
      } else if (cardName == 11) {
        cardName = "Jack";
      } else if (cardName == 12) {
        cardName = "Queen";
      } else if (cardName == 13) {
        cardName = "King";
      }
  
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
 
      console.log(card);
      cardDeck.push(card);
    
      rankCounter += 1;
    }

    suitIndex += 1;
  }
  return cardDeck;
};


var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};
var shuffleCards = function (deck) {

  var currentIndex = 0;
  while (currentIndex < deck.length) {
    var randomIndex = getRandomIndex(deck.length);
    var randomCard = deck[randomIndex];
    var currentCard = deck[currentIndex];
    deck[currentIndex] = randomCard;
    deck[randomIndex] = currentCard;
    currentIndex += 1;
  }
  return deck;
};


var dealPlayerCards = function (cardDeck) {
  var playerHand = [];
  var cardIndex = 0;
  while (cardIndex < 2) {
    var drawnCard = cardDeck.pop();
    playerHand.push(drawnCard);
    cardIndex += 1;
  }
  console.log(playerHand);
  return playerHand;
};


var dealDealerCards = function (cardDeck) {
  var dealerHand = [];
  var cardIndex = 0;
  while (cardIndex < 2) {
    var drawnCard = cardDeck.pop();
    dealerHand.push(drawnCard);
    cardIndex += 1;
  }
  return dealerHand;
};


var showHand = function (hand) {
  var handIndex = 0;
  var handOutput = " ";
  while (handIndex < hand.length) {
    handOutput =
      handOutput + hand[handIndex].name + hand[handIndex].suit + "<br>";


    handIndex += 1;
  }
  return handOutput;
};


var countHand = function (hand) {
  var rankIndex = 0;
  var totalPoints = 0;
  while (rankIndex < hand.length) {

    var currentCardRank = hand[rankIndex].rank;
    var currentCardPoints = currentCardRank;
 
    if (
      currentCardRank == 11 ||
      currentCardRank == 12 ||
      currentCardRank == 13
    ) {
      currentCardPoints = 10;
    }

    totalPoints = totalPoints + currentCardPoints;

    rankIndex += 1;
  }

  if (totalPoints == 2) {
    totalPoints = totalPoints + 19;
    return totalPoints;
  }


  var index = 0;
  while (index < hand.length) {
    var currentCardRank = hand[index].rank;
    var currentCardPoints = currentCardRank;
    if (currentCardPoints == 1 && totalPoints <= 11) {
      totalPoints = totalPoints + 10;

      return totalPoints;
    }
    index += 1;
  }

  return totalPoints;
};


var determineWinner = function (dealerHand, hand, number) {
  var dealerPoints = countHand(dealerHand);
  var playerPoints = countHand(hand);
  var playerIndex = number + 1;

  if (dealerPoints > 21 && playerPoints > 21) {
    return "Its a draw";
  }
  if (dealerPoints > 21 && playerPoints <= 21) {
    if (playerPoints == 21 && hand.length == 2) {
      playerBlackjackSettlement(number);
      return "Player " + playerIndex + " BLACKJACK!!";
    }
    playerWinSettlement(number);
    return "Player " + playerIndex + " wins";
  }
  if (dealerPoints <= 21 && playerPoints > 21) {
    if (dealerPoints == 21 && dealerHand.length == 2) {
      dealerBlackjackSettlement(number);
      return "Dealer BLACKJACK!!";
    }
    dealerWinSettlement(number);
    return "Dealer wins";
  }
  if (dealerPoints <= 21 && playerPoints <= 21) {
    if (
      dealerPoints == 21 &&
      dealerHand.length == 2 &&
      dealerPoints > playerPoints
    ) {
      dealerBlackjackSettlement(number);
      return "Dealer BLACKJACK!!";
    }
    if (playerPoints == 21 && hand.length == 2 && playerPoints > dealerPoints) {
      playerBlackjackSettlement(number);
      return "Player " + playerIndex + " BLACKJACK!!";
    }
    if (playerPoints == 21 && hand.length == 2 && dealerHand.length > 2) {
      playerBlackjackSettlement(number);
      return "Player " + playerIndex + " BLACKJACK!!";
    }
    if (dealerPoints == 21 && dealerHand.length == 2 && hand.length > 2) {
      dealerBlackjackSettlement(number);
      return "Dealer BLACKJACK!!";
    }
    if (dealerPoints > playerPoints) {
      dealerWinSettlement(number);
      return "Dealer wins";
    }
    if (dealerPoints < playerPoints) {
      playerWinSettlement(number);
      return "Player " + playerIndex + " wins";
    } else return "Its a draw";
  }
};


var playerWinSettlement = function (number) {
  var playerCurrentPoints = playerWallet[number];
  var playerBet = playerBets[number];
  playerWallet[number] = Number(playerCurrentPoints) + Number(playerBet);
};


var dealerWinSettlement = function (number) {
  var playerCurrentPoints = playerWallet[number];
  var playerBet = playerBets[number];
  playerWallet[number] = Number(playerCurrentPoints) - Number(playerBet);
};

var playerBlackjackSettlement = function (number) {
  var playerCurrentPoints = playerWallet[number];
  var playerBet = playerBets[number];
  playerWallet[number] = Number(playerCurrentPoints) + Number(2 * playerBet);
};


var dealerBlackjackSettlement = function (number) {
  var playerCurrentPoints = playerWallet[number];
  var playerBet = playerBets[number];
  playerWallet[number] = Number(playerCurrentPoints) - Number(2 * playerBet);
};


var drawCard = function (hand, deck) {
  console.log("card drawn");
  var drawnCard = deck.pop();
  hand.push(drawnCard);
  return hand;
};


var topupDealerHand = function (hand, deck) {
  
  var topupIndex = 0;
  while (topupIndex < 3) {
 
    var dealerPoints = countHand(hand);
    if (dealerPoints < 17) {
      drawCard(hand, deck);
    }
    topupIndex += 1;
  }
  return hand;
};


var printFinalResults = function () {
  var myOutputValue = "Dealer hand<br>" + showHand(dealerHand) + "<br>";
  var resultsIndex = 0;
  while (resultsIndex < numberOfPlayers) {
    myOutputValue =
      myOutputValue +
      "Player " +
      (resultsIndex + 1) +
      " hand:<br>" +
      showHand(allPlayerHand[resultsIndex]) +
      "<br>" +
      determineWinner(dealerHand, allPlayerHand[resultsIndex], resultsIndex) +
      "<br><br>";
    resultsIndex += 1;
  }
  return myOutputValue;
};
