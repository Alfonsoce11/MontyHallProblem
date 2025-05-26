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
shuffle(behindDoors);
doors.forEach((door, i) => {
    door.dataset.behindDoor = behindDoors[i];
    door.addEventListener('click', () => {
      doorClick(door);
    });
    if (door.dataset.behindDoor == "lose") {
      door.children[2].src = "goat.png";
    } else if (door.dataset.behindDoor == "win") {
      door.children[2].src = "money.png";
    }
});

function doorClick(door) {
  door.children[1].innerText = "Click here to stay";
  if (door.dataset.behindDoor == "lose") {
    let otherDoors = doors.filter(item => item !== door);
    let otherLoseDoor = otherDoors.find(item => item.dataset.behindDoor === 'lose');
    let otherWinDoor = otherDoors.find(item => item.dataset.behindDoor === 'win');
    otherLoseDoor.style.animation = "open-door 0.5s forwards";
    otherLoseDoor.children[2].style.animation = "counter-rotation 0.5s forwards";
    otherWinDoor.children[1].innerText = "Click here to switch"
  }
}
