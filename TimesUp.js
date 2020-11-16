function init(){
    app= new Vue({
        el : "#app",
        data: {
            accesCode:'',
            
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
            ValidateCode: function(){
                console.log(this.accesCode)
                window.location='./Tour1.html?code='+this.accesCode /*+'&eye=hdh'; (exemple si on rajouter des param à passer)*/
                const GetCode = URLSearchParams.get('code')

               /* if (this.accesCode== 'toto1') {
                    window.location ='./Tour1.html'
                }
                else if (this.accesCode == 'toto2') {
                    window.location='./Tour2.html'
                }
                else if (this.accesCode == 'toto3') {
                    window.location='./Tour3.html'
                }
                else {return window.alert("code introuvable")
                } */
            },
        }
    });
}

var app;    

window.onload = init;