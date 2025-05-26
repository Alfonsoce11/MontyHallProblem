const behindDoors = ["lose", "lose", "win"]
const doors = [
    document.getElementById("door1"),
    document.getElementById("door2"),
    document.getElementById("door3")
]
const doorContainer = document.querySelectorAll('.door-container');
let switchWins = 0;
let switchLoses = 0;
let stayWins = 0;
let stayLoses = 0;

function set() {

doors.forEach((door) => {
  door.style.animation = "";
  door.children[1].innerText = "";
});

doorContainer.forEach(container => {
  container.onclick = null;
})

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(behindDoors);
doors.forEach((door, i) => {
    door.dataset.behindDoor = behindDoors[i];
    if (door.dataset.behindDoor == "lose") {
      door.nextElementSibling.src = "goat.png";
    } else if (door.dataset.behindDoor == "win") {
      door.nextElementSibling.src = "money.png";
    }
});

doors.forEach((door) => {
  door.onclick = () => doorClick(door);
})

}



set();

function doorClick(door) {
  door.children[1].innerText = "Click here to stay";
  let otherDoors = doors.filter(item => item !== door);
  if (door.dataset.behindDoor == "lose") {
    let otherLoseDoor = otherDoors.find(item => item.dataset.behindDoor === 'lose');
    let otherWinDoor = otherDoors.find(item => item.dataset.behindDoor === 'win');
    otherLoseDoor.style.animation = "open-door 0.5s forwards";
    otherWinDoor.children[1].innerText = "Click here to switch"
    otherLoseDoor.onclick = null;
    door.onclick = () => {
      doors.forEach(unopenedDoor => unopenedDoor.style.animation = "open-door 0.5s forwards");
      if (door.dataset.behindDoor === 'lose') {
        stayLoses++;
      } else if (door.dataset.behindDoor === 'win') {
        stayWins++;
      }
      document.getElementById("stay-wins").innerText = `${stayWins}`;
      document.getElementById("stay-wins-percentage").innerText = `${(stayWins/(stayWins+stayLoses)) * 100}`;
      document.getElementById("stay-loses").innerText = `${stayLoses}`;
      document.getElementById("stay-loses-percentage").innerText = `${(stayLoses/(stayWins+stayLoses)) * 100}`;
      door.onclick = null;
    }
    otherWinDoor.onclick = () => {
      doors.forEach(unopenedDoor => unopenedDoor.style.animation = "open-door 0.5s forwards");
      switchWins++;
      document.getElementById("switch-wins").innerText = `${switchWins}`;
      document.getElementById("switch-wins-percentage").innerText = `${(switchWins/(switchWins+switchLoses)) * 100}`;
      document.getElementById("switch-loses").innerText = `${switchLoses}`;
      document.getElementById("switch-loses-percentage").innerText = `${(switchLoses/(switchWins+switchLoses)) * 100}`;
      otherWinDoor.onclick = null;
    }
  } else if (door.dataset.behindDoor == "win") {
    let randomLoseDoor = otherDoors[Math.round(Math.random())];
    randomLoseDoor.style.animation = "open-door 0.5s forwards";
    notChosenLoseDoor = otherDoors.find((item => item !== randomLoseDoor))
    notChosenLoseDoor.children[1].innerText = "Click here to switch";
    randomLoseDoor.onclick = null;
    door.onclick = () => {
      doors.forEach(unopenedDoor => unopenedDoor.style.animation = "open-door 0.5s forwards");
      if (door.dataset.behindDoor === 'lose') {
        stayLoses++;
      } else if (door.dataset.behindDoor === 'win') {
        stayWins++;
      }
      document.getElementById("stay-wins").innerText = `${stayWins}`;
      document.getElementById("stay-wins-percentage").innerText = `${(stayWins/(stayWins+stayLoses)) * 100}`;
      document.getElementById("stay-loses").innerText = `${stayLoses}`;
      document.getElementById("stay-loses-percentage").innerText = `${(stayLoses/(stayWins+stayLoses)) * 100}`;
      door.onclick = null;
    }
    notChosenLoseDoor.onclick = () => {
      doors.forEach(unopenedDoor => unopenedDoor.style.animation = "open-door 0.5s forwards");
      switchLoses++;
      document.getElementById("switch-wins").innerText = `${switchWins}`;
      document.getElementById("switch-wins-percentage").innerText = `${(switchWins/(switchWins+switchLoses)) * 100}`;
      document.getElementById("switch-loses").innerText = `${switchLoses}`;
      document.getElementById("switch-loses-percentage").innerText = `${(switchLoses/(switchWins+switchLoses)) * 100}`;
      notChosenLoseDoor.onclick = null;
    }
  }
}

document.getElementById("doorReset").addEventListener('click', set)