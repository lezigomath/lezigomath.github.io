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
            cards:[],
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
          
            let cards = await initCards();
            this.cards = cards;
            this.cards1 = cards.filter(card => card.game == 1);
            this.cards2 = cards.filter(card => card.game == 2);
            this.currentCardIsLoaded = true;
        },
    
    })
}

window.onload = init;


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
