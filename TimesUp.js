async function init  (){
    
    app= new Vue({
        el : "#app",
        data: {
            accesCode:'',
            
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
            ValidateCode: function(e){
                console.log(this.accesCode)
                if (this.accesCode== "adminoptim"){
                    window.location='./Admin.html'
                }
                else {
                window.location='./Tour1.html?code='+this.accesCode /*+'&eye=hdh'; (exemple si on rajouter des param à passer)*/
               
                }
                e.preventDefault();
            },
        }
    });
}

var app;    

window.onload = init;
