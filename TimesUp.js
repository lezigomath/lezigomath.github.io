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
                if (this.accesCode== "adminoptim"){
                    window.location='./Admin.html'
                }
                else {
                window.location='./Tour1.html?code='+this.accesCode /*+'&eye=hdh'; (exemple si on rajouter des param à passer)*/
                const GetCode = URLSearchParams.get('code')
                }
            },
        }
    });
}


var app;    

window.onload = init;

window.onload=function(){
    document.getElementById("myInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 13) {
        document.getElementById("myBtn").click();
    }
});
  }

