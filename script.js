const behindDoors = ["lose", "lose", "win"]
const doors = [
    document.getElementById("door1"),
    document.getElementById("door2"),
    document.getElementById("door3")
]
let switchWins = 0;
let switchLoses = 0;
let stayWins = 0;
let stayLoses = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
doors.forEach((door, i) => {
    shuffle(behindDoors);
    door.data-behindDoor = behindDoors[i];
    door.addEventListener('click', doorClick);
});

function doorClick() {
  
}
