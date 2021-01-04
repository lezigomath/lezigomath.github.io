let mongoCollection;

async function initDb(){
    
    const appId = "timesup-vrylc";
    const appConfig = {
        id: appId};
    const app = new Realm.App(appConfig);
    var user = await app.logIn(Realm.Credentials.anonymous());
 
    const mongo = app.services.mongodb("mongodb-atlas");
    mongoCollection = mongo.db("TimesUp").collection("cards");
    
}

async function init(){

    await initDb();
    app= new Vue({
        el : "#app",
        data: {
           gameID :'',
           name :'',
           description:'',
            
        },
        methods: {
            sendWord: function(){
                var wordtoSend = {
                    word: this.name,
                    descrption: this.description,
                    game: this.gameID,
                }
                console.log(wordtoSend);
                mongoCollection.insertOne(wordtoSend);
            }
        }
    });
}

var app;    

window.onload = init;

