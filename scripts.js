"use strict";


// console.log(abilities["DarkFlame"]);
// console.log(abilities["Whisper"].cost);

const row1 = document.querySelector(".row1");
const row2 = document.querySelector(".row2");
const row3 = document.querySelector(".row3");
const row4 = document.querySelector(".row4");
const row5 = document.querySelector(".row5");
const row6 = document.querySelector(".row6");

const num = document.getElementById("numberHolder");

let oldState,newState;
let total = 30;

const shadowPowers = ["DarkFlame","Bloodsmoke","Mesmerize","Wraith","ShadowKill","ShadowPull","Silhouette","WarpStrike"];



const triggers = document.getElementsByTagName('figure');
[...triggers].forEach( trigger => {
  trigger.addEventListener('click', ()=> { 
    setState(trigger);
  });
});



function setState(elem) {
  oldState = elem.classList.value;
  newState = nextState(elem.id,oldState);
  elem.classList = [newState];
  setImg(elem,newState);
  updateInterface(total);
}

function setImg(elem,state) {
  elem.classList = [state];
  elem.children[0].setAttribute("src",`imgs/${elem.id}-${state}.png`);
}


function nextState(skill,stateNow) {
  switch(stateNow) {
    case "locked":
      newState = "unlocked";
      return newState;
    case "unlocked":
      shadowPowers.includes(skill) ? total -= 2 : total -= 1;
      newState = "selected";
      return newState;
    case "selected":
      total -= 1;
      newState = "upgraded";
      return newState;
    case "upgraded":
      shadowPowers.includes(skill) ? total += 3 : total += 2;
      newState = "unlocked";
      return newState;
    default:
      return stateNow;
  }
}



function updateInterface(total){
  num.innerHTML = total;
}









// // FIRST LOAD
// const params = location.search;
// if(params) { loadBookmark(params); }

// function loadBookmark(params) {
//   const keyValueStrings = (params.slice(1)).split('&');
//   const settings = {};
//   keyValueStrings.forEach(x => {
//     const pair = x.split('=');
//     let name = pair[0].replace('+',' ');
//     let value = pair[1].replace('%23','#');
//     settings[name] = value;
//     localStorage.setItem(name,value);
//   });
//   loadFromStorage();
// }







// let skillpoints = localStorage.getItem("aragami2-total");
// skillpoints ? null : skillpoints = 30;


// const resetButton = document.getElementById('resetButton');
// resetButton.addEventListener('click', ()=> { 
//   localStorage.clear();
//   location.search = "";
//   // console.log(location.url.toString());
//   location.reload();
// });


// const triggers = document.getElementsByTagName('figure');
// [...triggers].forEach( trig => {
//   trig.addEventListener('click', ()=> { 
//     const skill = trig.lastElementChild.firstElementChild.innerHTML;
//     localStorage.setItem(`aragami2-total`, parseInt(skillpoints));
//     // FIRST CLICK (UNLOCKED)
//     if(trig.classList.length == 0){
//       // change image
//       trig.classList.add("first");
//       const old = trig.children[0].attributes.src.nodeValue;
//       const neww = old.replace("-locked","-selected");
//       trig.children[0].setAttribute("src",neww);
//       // add points to storage
//       localStorage.setItem(`aragami2-${skill}`, costs[skill][0]);
//       // add points to totals
//       skillpoints = parseInt(skillpoints) - costs[skill][0];
//       localStorage.setItem(`aragami2-total`, parseInt(skillpoints));
//       num.innerHTML = localStorage.getItem("aragami2-total");
//     }
//     // SECOND CLICK (UPGRADED)
//     else if(trig.classList.contains("first")){
//       // change image
//       trig.classList.replace("first","second");
//       const old = trig.children[0].attributes.src.nodeValue;
//       const neww = old.replace("-selected","-upgraded");
//       trig.children[0].setAttribute("src",neww);
//       // add points to storage
//       localStorage.setItem(`aragami2-up-${skill}`, costs[skill][1]);
//       // add points to totals
//       skillpoints = parseInt(skillpoints) - costs[skill][1];
//       localStorage.setItem(`aragami2-total`, parseInt(skillpoints));
//       num.innerHTML = localStorage.getItem("aragami2-total");
//     } 
//     // RESET CLICK
//     else if(trig.classList.contains("second")){
//       // change image
//       trig.classList.remove("second");
//       const old = trig.children[0].attributes.src.nodeValue;
//       let neww = "";
//       if(old.endsWith("-selected")) {
//         neww = old.replace("-selected","-locked");
//       } else {
//         neww = old.replace("-upgraded","-locked");
//       }
//       trig.children[0].setAttribute("src",neww);
//       // remove points from storage
//       localStorage.removeItem(`aragami2-${skill}`);
//       localStorage.removeItem(`aragami2-up-${skill}`);
//       // add points back to totals
//       skillpoints = parseInt(skillpoints) + costs[skill][0]+costs[skill][1];
//       localStorage.setItem(`aragami2-total`, parseInt(skillpoints));
//       num.innerHTML = "";
//       num.innerHTML = localStorage.getItem("aragami2-total");
//     }
//     disableRows(localStorage.getItem(`aragami2-total`),[row2,row3,row4,row5,row6]);
//   });
// });





// loadFromStorage();
// function loadFromStorage() {
//   // loop through entries from storage
//   const skills = Object.keys(localStorage).sort(); // alphabetic sort
//   skills.forEach( key => {
//     const newKey = key.replace("aragami2-","").replace(" ","");
//     const item = document.getElementById(newKey);
//     // FIRST CLICK (UNLOCKED)
//     if(!newKey.startsWith("up-")){
//       if(newKey != "total") {
//         item.classList.add("first");
//         // replace images
//         const old = item.children[0].attributes.src.nodeValue;
//         const neww = old.replace("-locked","-selected");
//         item.children[0].setAttribute("src",neww);
//       }
//     // SECOND CLICK (UPGRADED)
//     } else if(newKey.startsWith("up-")) {
//       const tmpKey = newKey.replace("up-","");
//       const tmpitem = document.getElementById(tmpKey);
//       tmpitem.classList.replace("first","second");
//       // replace images
//       const old = tmpitem.children[0].attributes.src.nodeValue;
//       const neww = old.replace("-selected","-upgraded");
//       tmpitem.children[0].setAttribute("src",neww);
//     }
//     // display total
//     if(newKey == "total") {
//       num.innerHTML = "";
//       num.innerHTML = localStorage.getItem(`aragami2-${newKey}`);
//     }
//   });
// }



// function replaceImgs(status, item) {
//   const old = item.children[0].attributes.src.nodeValue;
//   let neww = "";
//   if(status === "enable") {
//     neww = old.replace("-locked","-unlocked");
//   } else {
//     neww = old.replace("-unlocked","-locked");
//   }

//   // console.log(item.children[0].classList);
//   item.children[0].setAttribute("src",neww);
// }



// disableRows(localStorage.getItem(`aragami2-total`),[row2,row3,row4,row5,row6]);
// function disableRows(currentTotal,rows) {
//   if( currentTotal == 30) {
//     rows.forEach(r => r.classList.add("disable"));
//     currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
//     // console.log("equal 30", currentTotal);
//   } 
//   // minimum 29
//   if( currentTotal < 30 && currentTotal >= 28) {
//     rows.forEach(r => r.classList.add("disable"));
//     row2.classList.remove("disable");
//     [...row2.children].forEach(ch => replaceImgs("enable",ch));
//     currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
//     // console.log("less 30, greater 28", currentTotal);
//   }
//   // minimum 25
//   if( currentTotal < 26 && currentTotal >= 22) {
//     rows.forEach(r => r.classList.add("disable"));
//     row3.classList.remove("disable");
//     row2.classList.remove("disable");
//     [...row3.children].forEach(ch => replaceImgs("enable",ch));
//     [...row2.children].forEach(ch => replaceImgs("enable",ch));
//     currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
//     // console.log("less 28, greater 25", currentTotal);
//   }
//   // minimum 21
//   if( currentTotal < 21 && currentTotal >= 17) {
//     rows.forEach(r => r.classList.add("disable"));
//     row4.classList.remove("disable");
//     row3.classList.remove("disable");
//     row2.classList.remove("disable");
//     [...row4.children].forEach(ch => replaceImgs("enable",ch));
//     [...row3.children].forEach(ch => replaceImgs("enable",ch));
//     [...row2.children].forEach(ch => replaceImgs("enable",ch));
//     currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
//     // console.log("less 25, greater 21", currentTotal);
//   }
//   // minimum 17
//   if( currentTotal < 17 && currentTotal >= 13) {
//     rows.forEach(r => r.classList.add("disable"));
//     row5.classList.remove("disable");
//     row4.classList.remove("disable");
//     row3.classList.remove("disable");
//     row2.classList.remove("disable");
//     [...row5.children].forEach(ch => replaceImgs("enable",ch));
//     [...row4.children].forEach(ch => replaceImgs("enable",ch));
//     [...row3.children].forEach(ch => replaceImgs("enable",ch));
//     [...row2.children].forEach(ch => replaceImgs("enable",ch));
//     currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
//     // console.log("less 21, greater 17", currentTotal);
//   }
//   // minimum 16
//   // if( currentTotal < 17 && currentTotal >= 13) {
//   if( currentTotal < 17) {
//     rows.forEach(r => r.classList.add("disable"));
//     row6.classList.remove("disable");
//     row5.classList.remove("disable");
//     row4.classList.remove("disable");
//     row3.classList.remove("disable");
//     row2.classList.remove("disable");
//     [...row6.children].forEach(ch => replaceImgs("enable",ch));
//     [...row5.children].forEach(ch => replaceImgs("enable",ch));
//     [...row4.children].forEach(ch => replaceImgs("enable",ch));
//     [...row3.children].forEach(ch => replaceImgs("enable",ch));
//     [...row2.children].forEach(ch => replaceImgs("enable",ch));
//     currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
//     // console.log("less 17, greater 13", currentTotal);
//   }
//   // if( currentTotal == 0) {
//   //   rows.forEach(r => r.classList.add("disable"));
//   //   row1.classList.add("disable");
//   //   currentTotal = parseInt(localStorage.getItem(`aragami2-total`));
//   //   console.log("equals 0", currentTotal);
//   // }
// }



//   // const wh = document.querySelector("#Whisper");

//   // const ds = document.querySelector("#DefensiveStance");
//   // const df = document.querySelector("#DarkFlame");
//   // const dv = document.querySelector("#Divination");
//   // const bs = document.querySelector("#Bloodsmoke");
//   // const ch = document.querySelector("#Chameleon");

//   // const mz = document.querySelector("#Mesmerize");
//   // const mr = document.querySelector("#Mirage");
//   // const es = document.querySelector("#EnhancedSenses");
//   // const wr = document.querySelector("#Wraith");

//   // const mt = document.querySelector("#Momentum");
//   // const rp = document.querySelector("#RangedParry");
//   // const sk = document.querySelector("#ShadowKill");
//   // const vp = document.querySelector("#Vampirism");
//   // const jp = document.querySelector("#Jumper");

//   // const sp = document.querySelector("#ShadowPull");
//   // const hp = document.querySelector("#Hematophagy");
//   // const dd = document.querySelector("#DreamDevourer");
//   // const st = document.querySelector("#Silhouette");

//   // const gd = document.querySelector("#GhostlyDash");
//   // const ps = document.querySelector("#PureSoul");
//   // const ws = document.querySelector("#WarpStrike");
//   // const ti = document.querySelector("#ToolInfusion");
//   // const sv = document.querySelector("#ShadowVeil");





// // SHARE OPTION
// const shareButton = document.getElementById('shareButton');
// shareButton.addEventListener('click', ()=> { 

//   const skills = Object.keys(localStorage).sort(); // alphabetic sort
//   const params = new URLSearchParams();
//   skills.forEach( key => {
//     params.append(key,localStorage.getItem(key));
//   });
//   // console.log(params.toString());
//   // console.log(location.origin + location.pathname);
//   const bookmark = location.origin + location.pathname + '?' + params.toString();

//   if (navigator.share) {
//     navigator.share({
//       title: 'fania.github.io/aragami2-skills',
//       text: 'A2 Skills',
//       url: bookmark,
//     })
//     .then(() => console.log('Successful share'))
//     .catch((error) => console.log('Error sharing', error));
//   } else { console.log('no sharing possible'); }

//   location = bookmark;

// });




