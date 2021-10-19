const base = {
  "whisper": [0,0],
  "defensiveStance": [0,0],
  "darkFlame": [0,0],
  "divination": [0,0],
  "bloodsmoke": [0,0],
  "chameleon": [0,0],
  "mesmerize": [0,0],
  "mirage": [0,0],
  "enhancedSenses": [0,0],
  "wraith": [0,0],
  "momentum": [0,0],
  "rangedParry": [0,0],
  "shadowKill": [0,0],
  "vampirism": [0,0],
  "jumper": [0,0],
  "shadowPull": [0,0],
  "hematophagy": [0,0],
  "dreamDevourer": [0,0],
  "silhouette": [0,0],
  "ghostlyDash": [0,0],
  "pureSoul": [0,0],
  "warpStrike": [0,0],
  "toolInfusion": [0,0],
  "shadowVeil": [0,0]
};

const max = {
  "Whisper": [0,1],
  "Defensive Stance": [1,1],
  "Dark Flame": [2,1],
  "Divination": [1,1],
  "Bloodsmoke": [2,1],
  "Chameleon": [1,1],
  "Mesmerize": [2,1],
  "Mirage": [1,1],
  "Enhanced Senses": [1,1],
  "Wraith": [2,1],
  "Momentum": [1,1],
  "Ranged Parry": [1,1],
  "Shadow Kill": [2,1],
  "Vampirism": [1,1],
  "Jumper": [1,1],
  "Shadow Pull": [2,1],
  "Hematophagy": [1,1],
  "Dream Devourer": [1,1],
  "Silhouette": [2,1],
  "Ghostly Dash": [1,1],
  "Pure Soul": [1,1],
  "Warp Strike": [2,1],
  "Tool Infusion": [1,1],
  "Shadow Veil": [1,1]
};

let skillpoints = 30;


const num = document.getElementById("numberHolder");
const triggers = document.getElementsByTagName('figure');
[...triggers].forEach( trig => {
  trig.addEventListener('click', ()=> { 
    const skill = trig.lastElementChild.firstElementChild.innerHTML;
    // console.dir(trig);
    console.log(`Clicking on ${skill}`);
    // console.log(max[skill]);
    // localStorage.setItem(`aragami2-${skill}`, max[skill]);
    localStorage.setItem(`aragami2-total`, skillpoints);

    // FIRST CLICK
    if(trig.classList.length == 0){
      trig.classList.add("first");
      localStorage.setItem(`aragami2-${skill}`, max[skill][0]);
      // add points to totals
      skillpoints = skillpoints - max[skill][0];
      // console.log(`first click ${skillpoints}`);
      localStorage.setItem(`aragami2-total`, skillpoints);
      num.innerHTML = localStorage.getItem("aragami2-total");
    }
    // SECOND CLICK 
    else if(trig.classList.contains("first")){
      trig.classList.replace("first","second");
      localStorage.setItem(`aragami2-up-${skill}`, max[skill][1]);
      // add points to totals
      skillpoints = skillpoints - max[skill][1];
      // console.log(`second click ${skillpoints}`);
      localStorage.setItem(`aragami2-total`, skillpoints);
      num.innerHTML = localStorage.getItem("aragami2-total");
    } 
    // RESET CLICK
    else if(trig.classList.contains("second")){
      trig.classList.remove("second");
      localStorage.removeItem(`aragami2-${skill}`);
      localStorage.removeItem(`aragami2-up-${skill}`);
      // add points back to totals
      skillpoints = skillpoints + max[skill][0]+max[skill][1];
      // console.log(`reset ${skillpoints}`);
      localStorage.setItem(`aragami2-total`, skillpoints);
      num.innerHTML = localStorage.getItem("aragami2-total");
    }

    
  });
});






function loadFromStorage() {

  Object.keys(localStorage).forEach( key => {
    console.log(`Retrieving localStorage key: ${key} with value ${localStorage.getItem(key)}`);
    
    // if(localStorage.getItem(key))
    document.getElementById("numberHolder");

    num.innerHTML = localStorage.getItem("aragami2-total");

  });


}







function updateTotal() {

  Object.keys(localStorage).forEach( key => {
    console.log(`Retrieving localStorage key: ${key} with value ${localStorage.getItem(key)}`);
    
    num.innerHTML = localStorage.getItem("aragami2-total");

  });

  // Object.values(localStorage).forEach( value => {
  //   console.log("value:", value);
  // });

}










/*
ghostlyDash: 1 + 1
pureSoul: 1 + 1
warpStrike: 2 + 1
toolInfusion: 1  + 1
shadowVeil: 1 + 1

shadowPull: 2 + 1
hematophagy: 1 + 1
dreamDevourer: 1 + 1 
silhouette: 2 + 1

momentum: 1 + 1
rangedParry: 1 + 1 
shadowKill: 2 + 1
vampirism: 1 + 1
jumper: 1 + 1

mesmerize: 2 + 1 
mirage: 1 + 1
enhancedSenses: 1 + 1 
wraith: 2 + 1

defensiveStance: 1 + 1 
darkFlame: 2 + 1
divination: 1 + 1
bloodsmoke: 2 + 1
chameloen: 1 + 1

whisper: 0 + 1
*/