const costs = {
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
      // change image
      trig.classList.add("first");
      const old = trig.children[0].attributes.src.nodeValue;
      const neww = old.replace("-locked","-unlocked");
      trig.children[0].setAttribute("src",neww);
      // add points to storage
      localStorage.setItem(`aragami2-${skill}`, costs[skill][0]);
      // add points to totals
      skillpoints = parseInt(skillpoints) - costs[skill][0];
      localStorage.setItem(`aragami2-total`, parseInt(skillpoints));
      num.innerHTML = localStorage.getItem("aragami2-total");
    }
    // SECOND CLICK (UPGRADED)
    else if(trig.classList.contains("first")){
      // change image
      trig.classList.replace("first","second");
      const old = trig.children[0].attributes.src.nodeValue;
      const neww = old.replace("-unlocked","-upgraded");
      trig.children[0].setAttribute("src",neww);
      // add points to storage
      localStorage.setItem(`aragami2-up-${skill}`, costs[skill][1]);
      // add points to totals
      skillpoints = parseInt(skillpoints) - costs[skill][1];
      localStorage.setItem(`aragami2-total`, parseInt(skillpoints));
      num.innerHTML = localStorage.getItem("aragami2-total");
    } 
    // RESET CLICK
    else if(trig.classList.contains("second")){
      // change image
      trig.classList.remove("second");
      const old = trig.children[0].attributes.src.nodeValue;
      let neww = "";
      if(old.endsWith("-unlocked")) {
        neww = old.replace("-unlocked","-locked");
      } else {
        neww = old.replace("-upgraded","-locked");
      }
      trig.children[0].setAttribute("src",neww);
      // remove points from storage
      localStorage.removeItem(`aragami2-${skill}`);
      localStorage.removeItem(`aragami2-up-${skill}`);
      // add points back to totals
      skillpoints = parseInt(skillpoints) + costs[skill][0]+costs[skill][1];
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
    const item = document.getElementById(newKey);
    // FIRST CLICK (UNLOCKED)
    if(!newKey.startsWith("up-")){
      if(newKey != "total") {
        item.classList.add("first");
        // replace images
        const old = item.children[0].attributes.src.nodeValue;
        const neww = old.replace("-locked","-unlocked");
        item.children[0].setAttribute("src",neww);
      }
    // SECOND CLICK (UPGRADED)
    } else if(newKey.startsWith("up-")) {
      const tmpKey = newKey.replace("up-","");
      const tmpitem = document.getElementById(tmpKey);
      tmpitem.classList.replace("first","second");
      // replace images
      const old = tmpitem.children[0].attributes.src.nodeValue;
      const neww = old.replace("-unlocked","-upgraded");
      tmpitem.children[0].setAttribute("src",neww);
    }

    // display total
    if(newKey == "total") {
      num.innerHTML = "";
      num.innerHTML = localStorage.getItem(`aragami2-${newKey}`);
    }

  });

}



disableRows();
function disableRows() {

  const row1 = document.querySelector(".row1");
  const row2 = document.querySelector(".row2");
  const row3 = document.querySelector(".row3");
  const row4 = document.querySelector(".row4");
  const row5 = document.querySelector(".row5");
  const row6 = document.querySelector(".row6");

  console.log(row2);

  




}

