let data = JSON.parse(
localStorage.getItem("kidTracker")
) || {

game:0,
hammer:0,
box:0,
paper:0

};

function change(type,value){

data[type]+=value;

if(data[type] < 0){
data[type]=0;
}

saveData();
updateUI();

}

function saveData(){

localStorage.setItem(
"kidTracker",
JSON.stringify(data)
);

}

function updateUI(){

let gameScore =
Math.floor(data.game);

let hammerScore =
Math.floor(data.hammer/4);

let boxScore =
Math.floor(data.box/4);

let paperScore =
Math.floor(data.paper/10);

let total =
gameScore +
hammerScore +
boxScore +
paperScore;

document.getElementById("gameCount").textContent=data.game;
document.getElementById("hammerCount").textContent=data.hammer;
document.getElementById("boxCount").textContent=data.box;
document.getElementById("paperCount").textContent=data.paper;

document.getElementById("gameScore").textContent=gameScore+"分";
document.getElementById("hammerScore").textContent=hammerScore+"分";
document.getElementById("boxScore").textContent=boxScore+"分";
document.getElementById("paperScore").textContent=paperScore+"分";

document.getElementById("todayScore").textContent=total+" 分";
document.getElementById("totalScore").textContent=total+" 分";

}

updateUI();