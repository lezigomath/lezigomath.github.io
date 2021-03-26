const appId = "timesup-vrylc";
const appConfig = {
    id: appId};


    let mongoCollection;

    async function initCards() {
        let user;
        try {

          if(mongoCollection == null){
            const app = new Realm.App(appConfig);
            user = await app.logIn(Realm.Credentials.anonymous());

            const mongo = app.services.mongodb("mongodb-atlas");

          
            mongoCollection = mongo.db("TimesUp").collection("cards");

          }
            let cards = await mongoCollection.find();

            for(var i = 0; i  < cards.length ; i++)
              cards[i].descrptionVisible = false;

            return cards;
        }
        finally{
        }
    }

async function init  (){
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

            sortBy: function(){
              this.cards.sort(wordComparer);
               // window.location.reload();
            },

            sortByGame: function(){
              this.cards.sort(gameComparer);
               // window.location.reload();
            },
            

            sendWord: function(){
              if(this.name == "" || this.description == "" || this.game == ""){
                alert("Un des champs obligatoire n'est pas rempli");
                return;
              }
              var wordtoSend = {
                  word: this.name,
                  descrption: this.description,
                  game: this.gameID,
              }
              console.log(wordtoSend);
              mongoCollection.insertOne(wordtoSend);
              this.loadCards();
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

          tryDeleteWord: function(card){
            if(confirm("Voulez vous supprimer le mot " + card.word)){
              mongoCollection.deleteOne( { "_id" : card._id });
              this.loadCards();
            }
        },

            getFoundCards: function(){
                return this.playedCards.filter(card => card.found);
            },

            showCurrentDetail : function(cardid){
              for(var i = 0; i  < this.playedCards.length ; i++)
                this.playedCards[i].descrptionVisible = false;
              
             if(this.playedCards[cardid].descrptionVisible == true){
              this.playedCards[cardid].descrptionVisible = false
             }
             else{this.playedCards[cardid].descrptionVisible = true}
            },

            loadCards : async function(){
              let cards = await initCards();
                this.cards = cards;
                this.cards1 = cards.filter(card => card.game == 1);
                this.cards2 = cards.filter(card => card.game == 2);
                this.currentCardIsLoaded = true;
            },
        },

        

        async created (){
          await this.loadCards();
            
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

    function wordComparer(a, b) {
      if (a.word > b.word) {
        return 1;
      }
      if (a.word < b.word) {
        return -1;
      }
      return 0;}

      function gameComparer(a, b) {
        if (a.game > b.game) {
          return 1;
        }
        if (a.game < b.game) {
          return -1;
        }
        return 0;
    };