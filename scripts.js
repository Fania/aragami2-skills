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


let skillpoints = localStorage.getItem("aragami2-total");
skillpoints ? null : skillpoints = 30;

const num = document.getElementById("numberHolder");
const triggers = document.getElementsByTagName('figure');
[...triggers].forEach( trig => {
  trig.addEventListener('click', ()=> { 
    const skill = trig.lastElementChild.firstElementChild.innerHTML;
    localStorage.setItem(`aragami2-total`, parseInt(skillpoints));

    // FIRST CLICK (UNLOCKED)
    if(trig.classList.length == 0){
      trig.classList.add("first");
      localStorage.setItem(`aragami2-${skill}`, max[skill][0]);
      // add points to totals
      skillpoints = parseInt(skillpoints) - max[skill][0];
      localStorage.setItem(`aragami2-total`, parseInt(skillpoints));
      num.innerHTML = localStorage.getItem("aragami2-total");
    }
    // SECOND CLICK (UPGRADED)
    else if(trig.classList.contains("first")){
      trig.classList.replace("first","second");
      localStorage.setItem(`aragami2-up-${skill}`, max[skill][1]);
      // add points to totals
      skillpoints = parseInt(skillpoints) - max[skill][1];
      localStorage.setItem(`aragami2-total`, parseInt(skillpoints));
      num.innerHTML = localStorage.getItem("aragami2-total");
    } 
    // RESET CLICK
    else if(trig.classList.contains("second")){
      trig.classList.remove("second");
      localStorage.removeItem(`aragami2-${skill}`);
      localStorage.removeItem(`aragami2-up-${skill}`);
      // add points back to totals
      skillpoints = parseInt(skillpoints) + max[skill][0]+max[skill][1];
      localStorage.setItem(`aragami2-total`, parseInt(skillpoints));
      num.innerHTML = "";
      num.innerHTML = localStorage.getItem("aragami2-total");
    }

  });
});





loadFromStorage();
function loadFromStorage() {

  // loop through entries from storage
  const skills = Object.keys(localStorage).sort(); // alphabetic sort
  skills.forEach( key => {
    const newKey = key.replace("aragami2-","").replace(" ","");
    // FIRST CLICK (UNLOCKED)
    if(!newKey.startsWith("up-")){
      if(newKey != "total") {
        document.getElementById(newKey).classList.add("first");
      }
    // SECOND CLICK (UPGRADED)
    } else if(newKey.startsWith("up-")) {
      const tmpKey = newKey.replace("up-","");
      document.getElementById(tmpKey).classList.replace("first","second");
    }

    // display total
    if(newKey == "total") {
      num.innerHTML = "";
      num.innerHTML = localStorage.getItem(`aragami2-${newKey}`);
    }

  });

}

