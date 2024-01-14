//GAME VARIABLES
//stats
let xp = 0;
let health = 100;
let gold = 50;
//combat
let currentWeapon = 0;
let fighting;
//combat2
let monsterHealth;
let inventory = ["stick","dagger","sword"];
//buttons
const button1 = document.querySelector('#button1');
const button2 = document.querySelector('#button2');
const button3= document.querySelector('#button3');
//game id's
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//GAME FUNCTIONS
function goStore(){
    console.log("Going to store.");
}

function goCave(){
    console.log("Going to cave.");
}

function fightDragon(){
    console.log("Fighting dragon.");
  }