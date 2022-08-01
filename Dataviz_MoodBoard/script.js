
// API proverbes 
async function myAPI(){
    let myFetch = await fetch("https://programming-quotes-api.herokuapp.com/quotes")
    let result = await myFetch.json()
     return result 
 }

const myResult = myAPI();




function myQuote(idCitation,idAuteur,nbApi){

    myResult.then(function(result){
        document.getElementById(idCitation).innerHTML=result[nbApi]["en"];
   })
    myResult.then(function(result){
       document.getElementById(idAuteur).innerHTML=result[nbApi]["author"];
   })

}
//Lundi
myQuote('citation1','auteur1',123)
//Mardi
myQuote('citation2','auteur2',13)
//Mercredi
myQuote('citation3','auteur3',33)
//Jeudi
myQuote('citation4','auteur4',242)
//Vendredi
myQuote('citation5','auteur5',92)





// API proverbes 


// animeJS - animation jours de la semaine
// constentes à portées globales
const title = document.querySelector("h1");
const days = [...document.querySelectorAll("h1 span")];

//déclenchement de l'animation avec la souris qui rentre/sort de l'animation
title.addEventListener("mouseenter", handDays);
title.addEventListener("mouseleave", handDays);

let isAnimatingIn = false; // 1ère animation
let calledOut = false; // si on a quitté notre h1
let animeOpened = false; // si on reste dans notre h1

function handDays(){
    if (animeOpened){
        animOut();
        animeOpened = false;
        return;
    }
    if(isAnimatingIn){
        calledOut = true;
        return;
    } // rappel la fonction pour éviter le spam : de relanver l'animation dès que la souris passe sur le texte
    isAnimatingIn = true; // en train d'être animé
        // promesse qu'on va résoudre avec resolve. Une fois résolue, on pourra effectuer d'autres fonctions callback
    const animePromise = new Promise((resolve) => {
        animIn()
        setTimeout(() => {
            resolve()},
            750) // au bout de 750ms, je veux résoudre ma promesse
    })
    animePromise.then(() => {
        isAnimatingIn = false;

        if(calledOut){
            animOut()
            calledOut = false;
        } else if(!calledOut){
            animeOpened = true;
        }
    })
}

// fonction animeIn : définit la manière dont l'animation va se déplacer à l'écran
function animIn(){
    // pour utiliser animeJS on utilise la méthode anime à laquelle on applique
    anime({
        targets : "h1 span",
        translateX : function(){return anime.random(0,1000)},
        translateY : function(){return anime.random(0,1000)},
        translateZ : function(){return anime.random(2000,750)},
        rotate : function(){return anime.random(-250,250)},
        easing : "easeOutCirc", // easin =manière dont se fait l'amition, easeOutCirc=manière dont l'animation se déroule, plus lent à la fin
        duration : 750 // duree de l'animation
    })
}

// funtion animOut : Définit la manière dont les lettres vont reprendre leurs places
function animOut(){
    anime({
        targets:"h1 span",
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotate: 0,
        easing: "easeInQuad", // easin =manière dont se fait l'amition, easeInQuad=manière dont l'animation se termine
        duration: 750 // duree de l'animation
    })

}

setTimeout(() => {
    animIn();
}, 750);
setTimeout(() => {
    animOut();
}, 1500);

// AnimeJS


