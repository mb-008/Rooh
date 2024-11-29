console.log("Welcome to Rooh");

// Initialize Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  { songName: "Alag Aasmaan", filePath: "songs/1.mp3", coverPath: "1.jpg" },
  { songName: "Chaand Baaliyan", filePath: "songs/2.mp3", coverPath: "2.jpg" },
  { songName: "Kabira", filePath: "songs/3.mp3", coverPath: "3.jpg" },
  { songName: "Kho Gaye Hum Kaha", filePath: "songs/4.mp3", coverPath: "4.jpg" },
  { songName: "Lovely", filePath: "songs/5.mp3", coverPath: "5.jpg" },
  { songName: "Maybe My Soulmate Died", filePath: "songs/6.mp3", coverPath: "6.jpg" },
  { songName: "Mitti Di Khushboo", filePath: "songs/7.mp3", coverPath: "7.jpg" },
  { songName: "Pani Da Rang", filePath: "songs/8.mp3", coverPath: "8.jpg" },
  { songName: "Riha", filePath: "songs/9.mp3", coverPath: "9.jpg" },
  { songName: "Runaway", filePath: "songs/10.mp3", coverPath: "10.jpg" },
  { songName: "Saadi Galli Aaja", filePath: "songs/11.mp3", coverPath: "11.jpg" },
];

// Update Song Items
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle Play/Pause Click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

// Update Progress Bar
audioElement.addEventListener("timeupdate", () => {
  if (audioElement.duration) {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
  }
});

// Seek Bar Change
myProgressBar.addEventListener("change", () => {
  if (audioElement.duration) {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
  }
});

// Handle Next and Previous
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});

document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

// Play Specific Song
const playSong = (index) => {
  audioElement.src = songs[index].filePath;
  masterSongName.innerText = songs[index].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
};

// Individual Play Buttons
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
  element.addEventListener("click", () => {
    playSong(i);
  });
});
