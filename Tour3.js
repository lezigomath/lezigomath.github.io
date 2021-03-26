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
            cards1 :[],
            cards2 :[],
            currentCards :[],
            currentCard : null,
            currentCardIsLoaded : false,
            playedCards:[],
        },
        methods: {
            navToMain: function(){
                window.location='./Accueil.html'
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

            getRandomCardFromCurrentCards: function (){
                if (this.currentCards.length > 0){
                    var randomIdx = Math.trunc(Math.random()*100 % this.currentCards.length );
                    var takenElements = this.currentCards.splice(randomIdx, 1);
                    this.currentCard = takenElements[0];
                }
                else {
                  stopTurn(); 
                  $("#smallModal").modal();
                }
            },

            arrayMaj: function(){
              if(this.playedCards.indexOf(this.currentCard) === -1) {
                this.playedCards.push(this.currentCard);
            }
            },

            foundCard: function (){
                this.currentCard.found =true;
                this.arrayMaj();
                this.getRandomCardFromCurrentCards();
            },

            nextCard: function(){
                this.currentCard.found = false;
                this.arrayMaj();
                this.currentCards.push(this.currentCard);
                this.getRandomCardFromCurrentCards();
            },

            getFoundCards: function(){
               let FoundCards = this.playedCards.filter(card => card.found);
               return FoundCards;
            }
        },

        clearSessionStorage: function(){
          sessionStorage.clear();
        },

        comptCardPlayed: function(){
          let nbCardPlayed = this.playedCards.length
          return nbCardPlayed;
        },
        showCurrentDetail : function(cardid){
          for(var i = 0; i  < this.playedCards.length ; i++)
            this.playedCards[i].descrptionVisible = false;

          this.playedCards[cardid].descrptionVisible = true;
        },
      

        async created (){
            let cards = await initCards();
            this.cards1 = cards.filter(card => card.game == 1);
            this.cards2 = cards.filter(card => card.game == 2);
            this.getRandomCardFromCurrentCards();
            this.currentCardIsLoaded = true;
        },
    })
}

window.onload = init;

var timerActive = false;
var pomoTimer = 0;
var seconds = 00;
var minutes = 1;

function decrementTimer() {
  if (timerActive) {
    return;
  }

  if (minutes > 1 && minutes < 35) {
    minutes -= 1;
  }

  if (minutes < 10) {
    document.getElementById("minutes").innerHTML = minutes;
  } else {
    document.getElementById("minutes").innerHTML = minutes;
  }
}

function incrementTimer() {
  if (timerActive) {
    return;
  }

  if (minutes >= 1 && minutes < 35) {
    minutes += 1;
  }

  if (minutes < 10) {
    document.getElementById("minutes").innerHTML = minutes;
  } else {
    document.getElementById("minutes").innerHTML = minutes;
  }
}
function startTimer() {
  document.getElementById('timer').classList.remove('times-up');
   newMinutes = minutes;
   newSeconds = seconds;
  if (!timerActive) {
    pomoTimer = setInterval(runTimer, 1000);
    timerActive = true;
  } else {
    stopTimer();
    timerActive = false;
  }
}

function resetTimer() {
  minutes = newMinutes;
  seconds = newSeconds;
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

function runTimer() {
  seconds -= 1;

  if (seconds < 0) {
    minutes -= 1;

    if (minutes < 0) {
      document.getElementById('seconds').innerHTML = "00";
      document.getElementById('minutes').innerHTML = "00";
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

function stopTurn(){
    resetTimer();
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
  document.getElementById('gameD').style.display='block';;
}


function showDetail(){
  if(document.getElementById('wordDetail').style.display === "none"){
    document.getElementById('wordDetail').style.display = "block";}
    else {
      document.getElementById('wordDetail').style.display = "none";}
    }

    function showCurrentDetail(){
      if(document.getElementById('currentWordDetail').style.display === "none"){
        document.getElementById('currentWordDetail').style.display = "block";}
        else {
          document.getElementById('currentWordDetail').style.display = "none";}
        }
