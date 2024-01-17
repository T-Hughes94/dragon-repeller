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
let inventory = ["stick"];
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
//weapons array
const weapons =[{
  name: "stick",
  power: 5
},
{
  name: "dagger",
  power: 30
},
{
  name: "claw hammer",
  power: 50
},
{
  name: "sword",
  power: 100
}];
//monters array
const monsters = [{name: "slime", level: 2, health: 15,},{name: "fanged beast", level: 8, health: 60},{name: "dragon", level: 20, health: 300}]
//locations array
const locations = [{
    name:"town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions":[goStore, goCave, fightDragon],
    "text": "You are in the town square. You see a sign that says \"Store\"."
},
{
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)","Go to town square" ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast","Go to town square" ],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?","REPLAY?","REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. ☠️"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
  },
  {
    name: "easter egg",
    "button text": ["2","8","Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];
//initialize buttons for functions
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;
//update location
function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text
};

//GAME FUNCTIONS
function goTown(){
   update(locations[0]);
};

function goStore(){
   update(locations[1]);
};

function goCave(){
    update(locations[2]);
};

function goFight(){
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsters[fighting].health;
};

function buyHealth(){
  if(gold >= 10){
  gold = gold -= 10;
  health = health += 10;
  goldText.innerText = gold;
  healthText.innerText = health;}
  else {
    text.innerText = "You do not have enough gold to buy health."
    }
  };
  
  function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
      if (gold >= 30) {
        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + newWeapon + ".";
        inventory.push(newWeapon);
        text.innerText += " In your inventory you have: " + inventory;
      } else {
        text.innerText = "You do not have enough gold to buy a weapon.";
      }
    }else{
      text.innerText = "You already have the most powerful weapon!";
      button2.innerText = "Sell weapon for 15 gold";
      button2.onclick = sellWeapon;
    }
  };

  function sellWeapon(){
    if (inventory.length > 1) {
      gold += 15;
      goldText.innerText = gold;
      let currentWeapon = inventory.shift();
      text.innerText = "You sold a " + currentWeapon + "." 
      text.innerText += " In your inventory you have: " + inventory + "."
    }else{
      text.innerText = "Don't sell your only weapon!"
    }
  };

  function fightSlime(){
    fighting = 0;
    goFight();
  };
  
  function fightBeast(){
    fighting = 1;
    goFight();
  };

  function fightDragon(){
    fighting = 2;
    goFight();
  };
  //actions
  function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks."
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + "."
    health -= getMonsterAttackValue(monsters[fighting].level);
    if(isMonsterHit()){
      monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    }else{
      text.innerText = " You miss.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
      lose()
    }else if(monsterHealth <= 0){
      fighting === 2 ? winGame() : defeatMonster();
    }
    if(Math.random() <= .1 && inventory.length !== 1){
      text.innerText += " Your " + inventory.pop() + " breaks."
      currentWeapon --
    }
  };

  function getMonsterAttackValue(level){
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
  };

  function isMonsterHit(){
    return Math.random() > .2 || health < 20;
  }

  function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
  };

  function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
  };
  
  function lose() {
    update(locations[5]);
  };

  function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goTown()
  };

  function winGame(){
    update(locations[6]);
  };

  function easterEgg(){
    update(locations[7]);
  };

  function pickTwo(){
    pick(2)
  };
  
  function pickEight(){
    pick(8)
  };
  
  function pick(guess){
    const numbers = []
    while(numbers.length < 10){
      numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n"
    for (let i = 0; i < 10; i++) {
      text.innerText += numbers[i] + "\n"
    }
    if(numbers.includes(guess)){
      text.innerText += "Right! You win 20 gold!";
      gold += 20;
      goldText.innerText = gold;
    }else{
      text.innerText += "Wrong! You lose 10 health!";
      health -= 10;
      healthText.innerText = health;
    }
    if(health <= 0){
      lose();
    }
  };


//Espanol
// VARIABLES DEL JUEGO
// Estadísticas
// let xp = 0;
// let health = 100;
// let gold = 50;

// // Combate
// let currentWeapon = 0;
// let fighting;

// // Combate 2
// let monsterHealth;
// let inventory = ["palo"];

// // Botones
// const button1 = document.querySelector('#button1');
// const button2 = document.querySelector('#button2');
// const button3 = document.querySelector('#button3');

// // IDs del juego
// const text = document.querySelector("#text");
// const xpText = document.querySelector("#xpText");
// const healthText = document.querySelector("#healthText");
// const goldText = document.querySelector("#goldText");
// const monsterStats = document.querySelector("#monsterStats");
// const monsterName = document.querySelector("#monsterName");
// const monsterHealthText = document.querySelector("#monsterHealth");

// // Arreglo de armas
// const weapons = [
//   {
//     name: "palo",
//     poder: 5
//   },
//   {
//     name: "daga",
//     poder: 30
//   },
//   {
//     name: "martillo de garra",
//     poder: 50
//   },
//   {
//     name: "espada",
//     poder: 100
//   }
// ];

// // Arreglo de monstruos
// const monsters = [
//   { name: "slime", nivel: 2, salud: 15 },
//   { name: "bestia colmada", nivel: 8, salud: 60 },
//   { name: "dragón", nivel: 20, salud: 300 }
// ];

// // Arreglo de ubicaciones
// const locations = [
//   {
//     name: "plaza del pueblo",
//     "button text": ["Ir a la tienda", "Ir a la cueva", "Luchar contra el dragón"],
//     "button functions": [goStore, goCave, fightDragon],
//     text: "Estás en la plaza del pueblo. Ves un letrero que dice \"Tienda\"."
//   },
//   {
//     name: "tienda",
//     "button text": ["Comprar 10 de salud (10 de oro)", "Comprar arma (30 de oro)", "Ir a la plaza del pueblo"],
//     "button functions": [buyHealth, buyWeapon, goTown],
//     text: "Entras en la tienda."
//   },
//   {
//     name: "cueva",
//     "button text": ["Luchar contra el slime", "Luchar contra la bestia colmada", "Ir a la plaza del pueblo"],
//     "button functions": [fightSlime, fightBeast, goTown],
//     text: "Entras en la cueva. Ves algunos monstruos."
//   },
//   {
//     name: "lucha",
//     "button text": ["Atacar", "Esquivar", "Huir"],
//     "button functions": [attack, dodge, goTown],
//     text: "Estás luchando contra un monstruo."
//   },
//   {
//     name: "matar monstruo",
//     "button text": ["Ir a la plaza del pueblo", "Ir a la plaza del pueblo", "Ir a la plaza del pueblo"],
//     "button functions": [goTown, goTown, easterEgg],
//     text: 'El monstruo grita "¡Arg!" al morir. Ganas puntos de experiencia y encuentras oro.'
//   },
//   {
//     name: "derrota",
//     "button text": ["¡REINICIAR?", "¡REINICIAR?", "¡REINICIAR?"],
//     "button functions": [restart, restart, restart],
//     text: "Mueres. ☠️"
//   },
//   {
//     name: "victoria",
//     "button text": ["¡REINICIAR?", "¡REINICIAR?", "¡REINICIAR?"],
//     "button functions": [restart, restart, restart],
//     text: "¡Derrotaste al dragón! ¡GANASTE EL JUEGO! 🎉"
//   },
//   {
//     name: "huevo de pascua",
//     "button text": ["2", "8", "Ir a la plaza del pueblo"],
//     "button functions": [pickTwo, pickEight, goTown],
//     text: "Encuentras un juego secreto. Elige un número arriba. Se elegirán diez números al azar entre 0 y 10. Si el número que eliges coincide con uno de los números al azar, ¡ganas!"
//   }
// ];

// // Inicializar botones para funciones
// button1.onclick = goStore;
// button2.onclick = goCave;
// button3.onclick = fightDragon;

// // Actualizar ubicación
// function update(location) {
//   monsterStats.style.display = "none";
//   button1.innerText = location["button text"][0];
//   button2.innerText = location["button text"][1];
//   button3.innerText = location["button text"][2];
//   button1.onclick = location["button functions"][0];
//   button2.onclick = location["button functions"][1];
//   button3.onclick = location["button functions"][2];
//   text.innerText = location.text
// };

// // FUNCIONES DEL JUEGO
// function goTown() {
//   update(locations[0]);
// };

// function goStore() {
//   update(locations[1]);
// };

// function goCave() {
//   update(locations[2]);
// };

// function goFight() {
//   update(locations[3]);
//   monsterHealth = monsters[fighting].salud;
//   monsterStats.style.display = "block";
//   monsterName.innerText = monsters[fighting].name;
//   monsterHealthText.innerText = monsters[fighting].salud;
// };

// function buyHealth() {
//   if (gold >= 10) {
//     gold = gold -= 10;
//     health = health += 10;
//     goldText.innerText = gold;
//     healthText.innerText = health;
//   } else {
//     text.innerText = "No tienes suficiente oro para comprar salud."
//   }
// };

// function buyWeapon() {
//   if (currentWeapon < weapons.length - 1) {
//     if (gold >= 30) {
//       gold -= 30;
//       currentWeapon++;
//       goldText.innerText = gold;
//       let newWeapon = weapons[currentWeapon].name;
//       text.innerText = "Ahora tienes un " + newWeapon + ".";
//       inventory.push(newWeapon);
//       text.innerText += " En tu inventario tienes: " + inventory;
//     } else {
//       text.innerText = "No tienes suficiente oro para comprar un arma.";
//     }
//   } else {
//     text.innerText = "¡Ya tienes el arma más poderosa!";
//     button2.innerText = "Vender arma por 15 de oro";
//     button2.onclick = sellWeapon;
//   }
// };

// function sellWeapon() {
//   if (inventory.length > 1) {
//     gold += 15;
//     goldText.innerText = gold;
//     let currentWeapon = inventory.shift();
//     text.innerText = "Vendiste un " + currentWeapon + "."
//     text.innerText += " En tu inventario tienes: " + inventory + "."
//   } else {
//     text.innerText = "¡No vendas tu única arma!"
//   }
// };

// function fightSlime() {
//   fighting = 0;
//   goFight();
// };

// function fightBeast() {
//   fighting = 1;
//   goFight();
// };

// function fightDragon() {
//   fighting = 2;
//   goFight();
// };

// // Acciones
// function attack() {
//   text.innerText = "El " + monsters[fighting].name + " ataca."
//   text.innerText += " Lo atacas con tu " + weapons[currentWeapon].name + "."
//   health -= getMonsterAttackValue(monsters[fighting].nivel);
//   if (isMonsterHit()) {
//     monsterHealth -= weapons[currentWeapon].poder + Math.floor(Math.random() * xp) + 1;
//   } else {
//     text.innerText = " Fallas el ataque.";
//   }
//   healthText.innerText = health;
//   monsterHealthText.innerText = monsterHealth;
//   if (health <= 0) {
//     lose()
//   } else if (monsterHealth <= 0) {
//     fighting === 2 ? winGame() : defeatMonster();
//   }
//   if (Math.random() <= .1 && inventory.length !== 1) {
//     text.innerText += " Tu " + inventory.pop() + " se rompe."
//     currentWeapon--
//   }
// };

// function getMonsterAttackValue(level) {
//   const hit = (level * 5) - (Math.floor(Math.random() * xp));
//   return hit > 0 ? hit : 0;
// };

// function isMonsterHit() {
//   return Math.random() > .2 || health < 20;
// }

// function dodge() {
//   text.innerText = "Esquivas el ataque del " + monsters[fighting].name + ".";
// };

// function defeatMonster() {
//   gold += Math.floor(monsters[fighting].nivel * 6.7);
//   xp += monsters[fighting].nivel;
//   goldText.innerText = gold;
//   xpText.innerText = xp;
//   update(locations[4]);
// };

// function lose() {
//   update(locations[5]);
// };

// function restart() {
//   xp = 0;
//   health = 100;
//   gold = 50;
//   currentWeapon = 0;
//   inventory = ["palo"];
//   xpText.innerText = xp;
//   healthText.innerText = health;
//   goldText.innerText = gold;
//   goTown()
// };

// function winGame() {
//   update(locations[6]);
// };

// function easterEgg() {
//   update(locations[7]);
// };

// function pickTwo() {
//   pick(2)
// };

// function pickEight() {
//   pick(8)
// };

// function pick(guess) {
//   const numbers = []
//   while (numbers.length < 10) {
//     numbers.push(Math.floor(Math.random() * 11));
//   }
//   text.innerText = "Elegiste " + guess + ". Aquí están los números aleatorios:\n"
//   for (let i = 0; i < 10; i++) {
//     text.innerText += numbers[i] + "\n"
//   }
//   if (numbers.includes(guess)) {
//     text.innerText += "¡Correcto! ¡Ganas 20 de oro!";
//     gold += 20;
//     goldText.innerText = gold;
//   } else {
//     text.innerText += "¡Incorrecto! ¡Pierdes 10 de salud!";
//     health -= 10;
//     healthText.innerText = health;
//   }
//   if (health <= 0) {
//     lose();
//   }
// };
