const appId = "timesup-vrylc";
const appConfig = {
    id: appId};

    async function initCards() {
        let user;
        try {
            const app = new Realm.App(appConfig);
            user = await app.logIn(Realm.Credentials.anonymous());

            const mongo = app.services.mongodb("mongodb-atlas");
            const mongoCollection = mongo.db("TimesUp").collection("cards");
            let cards = await mongoCollection.find();

            for(var i = 0; i  < cards.length ; i++)
              cards[i].descrptionVisible = false;

            return cards;
        }
        finally{
        }
    }

function init (){
    app= new Vue ({
        el: '#app',
        data: {
            accessCode :'',
            cards1 :[],
            cards2 :[],
            currentCards :[],
            currentCard : null,
            currentCardIsLoaded : false,
            playedCards:[],
            gameID :'',
            name :'',
            description:'',
        },
        methods: {
            navToMain: function(){
                window.location='./TimesUp.html'
            },
            navToLink: function(link){
                window.location='./Credits.html'
            },
            navToHelp: function (){
                window.location ='./Help.html'
            },
            navtoTour1: function (){
                window.location ='./Tour1.html'
            },
            navToTour2: function(){
                window.location ='./Tour2.html'
            }, 

            getRandomCardFromCurrentCards: function (){
                if (this.currentCards.length > 0){
                    var randomIdx = Math.trunc(Math.random()*100 % this.currentCards.length );
                    var takenElements = this.currentCards.splice(randomIdx, 1);
                    this.currentCard = takenElements[0];
                }
                else {
                  stopTurn();
                }
            },
            sendWord: function(){
              var wordtoSend = {
                  word: this.name,
                  descrption: this.description,
                  game: this.gameID,
              }
              console.log(wordtoSend);
              mongoCollection.insertOne(wordtoSend);
          },
          deleteWord: function(){
              var wordtoSend = {
                  word: this.name,
                  descrption: this.description,
                  game: this.gameID,
              }
              console.log(wordtoSend);
              mongoCollection.deleteOne(wordtoSend);
          },

            foundCard: function (){
                this.currentCard.found =true;
                this.playedCards.push(this.currentCard);
                this.getRandomCardFromCurrentCards();
            },

            nextCard: function(){
                this.currentCard.found = false;
                this.playedCards.push(this.currentCard);
                this.getRandomCardFromCurrentCards();
            },

            getFoundCards: function(){
                return this.playedCards.filter(card => card.found);
            },

            onFoundBtnClick: function (){
              this.foundCard();
              this.addSessionStorage();
            },

            addSessionStorage: function(){
                let cardString = JSON.stringify(this.getFoundCards());
                if(typeof(Storage) !== "undefined") {
                    sessionStorage.setItem("cards",cardString);
                }
                else {
                    document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
                }
              },
            
            getFromSessionStorage: function(){
              let cardObj = JSON.parse(this.cardString);
              sessionStorage.getItem("cards");
            },

            startGame: function(){
              showGame();
              hideRappel();
              startTimer();              
            },

            comptCardPlayed: function(){
              let nbCardPlayed = 53 - this.currentCards.length;
              return nbCardPlayed;
            },

            showCurrentDetail : function(cardid){
              for(var i = 0; i  < this.playedCards.length ; i++)
                this.playedCards[i].descrptionVisible = false;
              
             if(this.playedCards[cardid].descrptionVisible == true){
              this.playedCards[cardid].descrptionVisible = false
             }
             else{this.playedCards[cardid].descrptionVisible = true}
            }
        },

        async created (){
            var searchCode= new URLSearchParams(window.location.search)
            this.accessCode = searchCode.get('code')
            sessionStorage.setItem("code",this.accessCode);
            let cards = await initCards();
            this.cards1 = cards.filter(card => card.game == 1);
            this.cards2 = cards.filter(card => card.game == 2);
            if (this.accessCode == "game1"){
                this.currentCards = this.cards1;
            }
            else if (this.accessCode == "game2"){
                this.currentCards = this.cards2;
            }
            else window.location='./TimesUp.html';
              
            this.getRandomCardFromCurrentCards();
            this.currentCardIsLoaded = true;
        },
    })
}

window.onload = init;

var timerActive = false;
var pomoTimer = 0;
var seconds = 00;
var minutes = 2;
var increment = 30;

function decrementTimer() {
  if (timerActive) {
    return;
  }

  if (seconds ==0) {
   seconds = increment
   minutes --
  }
  else{
    seconds ="00"
  }

    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("minutes").innerHTML = minutes;
  
}

function incrementTimer() {
  if (timerActive) {
    return;
  }

  if (seconds == 0) {
    seconds = increment;
  } 
  else{
    seconds ="00";
    minutes ++;
  }

 
    document.getElementById("seconds").innerHTML = seconds;
    document.getElementById("minutes").innerHTML = minutes;
  
}

function resetTimer() {
  minutes = 2;
  seconds = "00";
  timerActive = false;
  document.getElementById('timer').classList.remove('times-up');
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
  stopTimer();
}

function stopTimer() {
  clearInterval(pomoTimer);
  return;
}

function startTimer() {
  document.getElementById('timer').classList.remove('times-up');
  if (!timerActive) {
    pomoTimer = setInterval(runTimer, 1000);
    timerActive = true;
  } else {
    stopTimer();
    timerActive = false;
  }
}

function runTimer() {
  seconds -= 1;

  if (seconds < 0) {
    minutes -= 1;

    if (minutes < 0) {
      document.getElementById('seconds').innerHTML = "00";
      document.getElementById('minutes').innerHTML = "0";
      document.getElementById('timer').classList.add('times-up');
      stopTimer();
      $("#smallModal").modal();
      return;
    }

    seconds = 59;
  }

  if (minutes < 10) {
    document.getElementById("minutes").innerHTML = minutes;
  } else {
    document.getElementById('minutes').innerHTML = minutes;
  }

  if (seconds < 10) {
    document.getElementById('seconds').innerHTML = "0" + seconds;
  } else {
    document.getElementById('seconds').innerHTML = seconds;
  }
}

function hideRappel(){
  var x = document.getElementById("rappelR");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function showGame() {
  document.getElementById('gameD').style.display='block';
}

function stopTurn(){
    resetTimer();
    $("#smallModal").modal();
}

function showDetail(){
  if(document.getElementById('wordDetail').style.display === "none"){
    document.getElementById('wordDetail').style.display = "block";}
    else {
      document.getElementById('wordDetail').style.display = "none";}
    }

