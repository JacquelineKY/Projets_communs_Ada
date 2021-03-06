  //Fonction événementielle

  // fonction prise dans la doc (avec Fred)  
  //La syntaxe get permet de lier une propriété d'un objet à une fonction qui sera appelée lorsqu'on accédera à la propriété.
  async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions); //L'opérateur await permet d'attendre la résolution d'une promesse (Promise). Il ne peut être utilisé qu'au sein d'une fonction asynchrone (définie avec l'instruction async function).
    return tab;
  }
  // si le popup est ouvert, alors execute le code
  if(document.querySelector(".popup")){

  //ici on cible le bouton et cercle pour agir dessus
  const button = document.querySelector(".button");
  const circle = document.querySelector(".circle");

    //régler le bouton sur faux, afin de l'activer
    let buttonOn = false;

    //on va ecouter un clic sur le bouton -> donc lorsque le boutton est cliqué -> alors execute ce code pour action-
    button.addEventListener("click", async ()=>{
        if(!buttonOn){
          buttonOn = true;
          circle.style.animation = "moveCircleRight 1s forwards";// forwards est pour bloqué le bouton, sinon il repart à gauche
          button.style.animation = "backgroundYellow 1s forwards";

        //partie de code prise dans la doc(avec Fred), car ds tuto v2:  https://developer.chrome.com/docs/extensions/reference/scripting/
        /*chrome.scripting.executeScript(
        {
          target: {tabId: tabId, allFrames: true},
          files: ['script.js']*/
          
          /*ici on va stocker la réponse */
          const tab = await getCurrentTab();
          console.log(tab)
          /*chrome:permet d'acceder à l'onglet actuellement ouvert/ executeScript:puis nous voulons executer le script sur cette page */ 
          chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ["appOn.js"]
            
            //test: code:"alert('h1')"
          })
        }

        

        else{
          buttonOn = false;
          circle.style.animation = "moveCircleLeft 1s forwards";
          button.style.animation = "backgroundBlue 1s forwards";


          const tab = await getCurrentTab();
          chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ["appOff.js"]
      
            //test: code:"alert('off')"
          })
        }
    })
}

