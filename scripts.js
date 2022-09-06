const costs = {
  "Whisper": [1,1],
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


const row1 = document.querySelector(".row1");
const row2 = document.querySelector(".row2");
const row3 = document.querySelector(".row3");
const row4 = document.querySelector(".row4");
const row5 = document.querySelector(".row5");
const row6 = document.querySelector(".row6");
const rows = [row2,row3,row4,row5,row6];

const num = document.getElementById("numberHolder");




// FIRST LOAD
// check for params in url
const params = location.search;
if(params) { loadBookmark(params); }

// set localstorage if empty
let skillpoints = localStorage.getItem("aragami2-total");
// skillpoints ? null : skillpoints = 30;
if(skillpoints == null) {
  skillpoints = 30;
  localStorage.setItem(`aragami2-total`, 30);
}

// make sure rows are disabled on first load.
disableRows(rows);

function loadBookmark(params) {
  const keyValueStrings = (params.slice(1)).split('&');
  const settings = {};
  keyValueStrings.forEach(x => {
    const pair = x.split('=');
    let name = pair[0].replace('+',' ');
    let value = pair[1].replace('%23','#');
    settings[name] = value;
    localStorage.setItem(name,value);
  });
  loadFromStorage();
}





const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', ()=> { 
  localStorage.clear();
  location.search = "";
  location.reload();
});



// MAIN TRIGGERS FOR EACH CLICK

// num-name-state.png
// locked - selected - unlocked - upgraded

const triggers = document.getElementsByTagName('figure');
[...triggers].forEach( trig => {
  trig.addEventListener('click', ()=> { 
    console.log(trig);

    const skill = trig.lastElementChild.firstElementChild.innerHTML;
    localStorage.setItem(`aragami2-total`, parseInt(skillpoints));

    // FIRST CLICK (UNLOCKED)
    if(trig.classList.length == 0){
      // change image
      trig.classList.add("first");
      const old = trig.children[0].attributes.src.nodeValue;
      const neww = old.replace("-locked","-selected");
      console.log(trig.children[0]);
      console.log(neww);
      trig.children[0].setAttribute("src",neww);
      // replaceImgs("select",neww);
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
      const neww = old.replace("-selected","-upgraded");
      trig.children[0].setAttribute("src",neww);
      // replaceImgs("upgrade",neww);
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
      if(old.endsWith("-selected")) {
        neww = old.replace("-selected","-locked");
        // replaceImgs("lock",neww);
      } else {
        neww = old.replace("-upgraded","-locked");
        // replaceImgs("lock",neww);
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

    // DISABLE ROWS if necessary on each click
    let currentTotal = localStorage.getItem(`aragami2-total`);
    // console.log(currentTotal, typeof currentTotal);
    if( currentTotal == 30) {
      disableRows(rows);
      currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
      console.log("equal 30", currentTotal);
    } 
    // minimum 29
    if( currentTotal < 30 && currentTotal >= 28) {
      enableRow(row2);
      currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
      console.log("less 30, greater 28", currentTotal);
    }
    // minimum 25
    if( currentTotal < 28 && currentTotal >= 25) {
      enableRows([row2,row3]);
      currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
      console.log("less 28, greater 25", currentTotal);
    }
    // minimum 21
    if( currentTotal < 25 && currentTotal >= 21) {
      enableRows([row2,row3,row4]);
      currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
      console.log("less 25, greater 21", currentTotal);
    }
    // minimum 17
    if( currentTotal < 21 && currentTotal >= 17) {
      enableRows([row2,row3,row4,row5]);
      currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
      console.log("less 21, greater 17", currentTotal);
    }
    // minimum 13
    // if( currentTotal < 17 && currentTotal >= 13) {
    if( currentTotal < 17) {
      enableRows([row2,row3,row4,row5]);
      currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
      console.log("less 17, greater 13", currentTotal);
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
    // FIRST CLICK (SELECTED)
    if(!newKey.startsWith("up-")){
      if(newKey != "total") {
        item.classList.add("first");
        // replace images
        const old = item.children[0].attributes.src.nodeValue;
        const neww = old.replace("-locked","-selected");
        item.children[0].setAttribute("src",neww);
      }
    // SECOND CLICK (UPGRADED)
    } else if(newKey.startsWith("up-")) {
      const tmpKey = newKey.replace("up-","");
      const tmpitem = document.getElementById(tmpKey);
      tmpitem.classList.replace("first","second");
      // replace images
      const old = tmpitem.children[0].attributes.src.nodeValue;
      const neww = old.replace("-selected","-upgraded");
      tmpitem.children[0].setAttribute("src",neww);
    }
    // display total
    if(newKey == "total") {
      num.innerHTML = "";
      num.innerHTML = localStorage.getItem(`aragami2-${newKey}`);
    }
  });
}



function replaceImgs(status, item) {
  const old = item.children[0].attributes.src.nodeValue;
  let neww = "";
  if(status === "unlock") {
    neww = old.replace("-locked","-unlocked");
  } 
  if(status === "select"){
    neww = old.replace("-unlocked","-selected");
  }
  if(status === "upgrade"){
    neww = old.replace("-selected","-upgraded");
  }
  if(status === "lock"){
    neww = old.replace("-upgraded","-locked");
  }
  // console.log(item.children[0].classList);
  item.children[0].setAttribute("src",neww);
}



function disableRow(row) {
  console.log("disabling", row);
  row.classList.add("disable");
}
function enableRow(row) {
  console.log("enabling", row);
  row.classList.remove("disable");
}
function disableRows(rows) {
  rows.forEach(r => disableRow(r));
}
function enableRows(rows) {
  rows.forEach(r => enableRow(r));
}



// SHARE OPTION
const shareButton = document.getElementById('shareButton');
shareButton.addEventListener('click', ()=> { 

  const skills = Object.keys(localStorage).sort(); // alphabetic sort
  const params = new URLSearchParams();
  skills.forEach( key => {
    params.append(key,localStorage.getItem(key));
  });
  // console.log(params.toString());
  // console.log(location.origin + location.pathname);
  const bookmark = location.origin + location.pathname + '?' + params.toString();

  if (navigator.share) {
    navigator.share({
      title: 'fania.github.io/aragami2-skills',
      text: 'A2 Skills',
      url: bookmark,
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error));
  } else { console.log('no sharing possible'); }

  location = bookmark;

});

