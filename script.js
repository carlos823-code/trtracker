// =====================
// 資料初始化
// =====================

let allData =
JSON.parse(
localStorage.getItem("kidTracker")
) || {};

let currentDate =
new Date()
.toISOString()
.split("T")[0];

const dateInput =
document.getElementById("selectedDate");

if(dateInput){
    dateInput.value = currentDate;
}

if(!allData[currentDate]){
    allData[currentDate] = {
        game:0,
        hammer:0,
        box:0,
        paper:0
    };
}

let data = allData[currentDate];


// =====================
// 工具函數
// =====================

function saveData(){

    allData[currentDate] = data;

    localStorage.setItem(
        "kidTracker",
        JSON.stringify(allData)
    );
}

function calculateScore(record){

    return (

        Math.floor(record.game) +

        Math.floor(record.hammer / 4) +

        Math.floor(record.box / 4) +

        Math.floor(record.paper / 10)

    );

}

// =====================
// 加減按鈕
// =====================

function change(type,value){

    data[type] += value;

    if(data[type] < 0){
        data[type] = 0;
    }

    saveData();

    updateUI();

}

// =====================
// 更新畫面
// =====================

function updateUI(){

    const gameScore =
    Math.floor(data.game);

    const hammerScore =
    Math.floor(data.hammer / 4);

    const boxScore =
    Math.floor(data.box / 4);

    const paperScore =
    Math.floor(data.paper / 10);

    const todayTotal =
    gameScore +
    hammerScore +
    boxScore +
    paperScore;

    // =========
    // 任務數量
    // =========

    if(document.getElementById("gameCount")){
        document.getElementById("gameCount").textContent =
        data.game;
    }

    if(document.getElementById("hammerCount")){
        document.getElementById("hammerCount").textContent =
        data.hammer;
    }

    if(document.getElementById("boxCount")){
        document.getElementById("boxCount").textContent =
        data.box;
    }

    if(document.getElementById("paperCount")){
        document.getElementById("paperCount").textContent =
        data.paper;
    }

    // =========
    // 分數
    // =========

    if(document.getElementById("gameScore")){
        document.getElementById("gameScore").textContent =
        gameScore + "分";
    }

    if(document.getElementById("hammerScore")){
        document.getElementById("hammerScore").textContent =
        hammerScore + "分";
    }

    if(document.getElementById("boxScore")){
        document.getElementById("boxScore").textContent =
        boxScore + "分";
    }

    if(document.getElementById("paperScore")){
        document.getElementById("paperScore").textContent =
        paperScore + "分";
    }

    // =========
    // 累積計算
    // =========

    let totalPoints = 0;
    let goalDays = 0;

    for(let date in allData){

        const score =
        calculateScore(allData[date]);

        totalPoints += score;

        if(score >= 20){
            goalDays++;
        }

    }

    // =========
    // 頂部統計
    // =========

    const todayScoreElm =
    document.getElementById("todayScore");

    if(todayScoreElm){
        todayScoreElm.textContent =
        todayTotal + " 分";
    }

    const totalScoreElm =
    document.getElementById("totalScore");

    if(totalScoreElm){
        totalScoreElm.textContent =
        totalPoints + " 分";
    }

    const goalDaysElm =
    document.getElementById("goalDays");

    if(goalDaysElm){
        goalDaysElm.textContent =
        goalDays + " 天";
    }

    // =========
    // 20分目標
    // =========

    const dailyGoalElm =
    document.getElementById("dailyGoal");

    if(dailyGoalElm){
        dailyGoalElm.textContent =
        todayTotal + " / 20";
    }

    // =========
    // 500分目標
    // =========

    const goal500Elm =
    document.getElementById("goal500");

    if(goal500Elm){
        goal500Elm.textContent =
        totalPoints + " / 500";
    }

    // =========
    // 進度條
    // =========

    const dailyBar =
    document.getElementById("dailyBar");

    if(dailyBar){

        const dailyPercent =
        Math.min(
            (todayTotal / 20) * 100,
            100
        );

        dailyBar.style.width =
        dailyPercent + "%";

    }

    const goalBar =
    document.getElementById("goal500Bar");

    if(goalBar){

        const totalPercent =
        Math.min(
            (totalPoints / 500) * 100,
            100
        );

        goalBar.style.width =
        totalPercent + "%";
    }

    // =========
    // 歷史紀錄
    // =========

    const tbody =
    document.querySelector(
    "#historyTable tbody"
    );

    if(tbody){

        tbody.innerHTML = "";

        const dates =
        Object.keys(allData)
        .sort()
        .reverse();

        dates.forEach(date=>{

            const score =
            calculateScore(
                allData[date]
            );

            tbody.innerHTML += `
            <tr>
                <td>${date}</td>
                <td>${score} 分</td>
            </tr>
            `;

        });

    }

    // =========
    // 獎勵區
    // =========

    setReward(
        "reward400",
        totalPoints,
        400,
        "分"
    );

    setReward(
        "reward450",
        totalPoints,
        450,
        "分"
    );

    setReward(
        "reward500",
        totalPoints,
        500,
        "分"
    );

    setReward(
        "day3Reward",
        goalDays,
        3,
        "天"
    );

    setReward(
        "day6Reward",
        goalDays,
        6,
        "天"
    );

    setReward(
        "day9Reward",
        goalDays,
        9,
        "天"
    );

    setReward(
        "day15Reward",
        goalDays,
        15,
        "天"
    );

    setReward(
        "day20Reward",
        goalDays,
        20,
        "天"
    );

}


// =====================
// 獎勵函數
// =====================

function setReward(
    id,
    current,
    target,
    unit
){

    const element =
    document.getElementById(id);

    if(!element) return;

    if(current >= target){

        element.innerHTML =
        "✅ 已完成";

        element.className =
        "completed";

    }else{

        element.innerHTML =
        `還差 ${
            target-current
        } ${unit}`;

        element.className =
        "pending";

    }

}

// =====================
// 日期切換
// =====================

if(dateInput){

dateInput.addEventListener(
"change",
function(e){

    currentDate =
    e.target.value;

    if(!allData[currentDate]){

        allData[currentDate] = {

            game:0,
            hammer:0,
            box:0,
            paper:0

        };

    }

    data =
    allData[currentDate];

    updateUI();

});

}

// =====================
// 重設按鈕
// =====================

const resetButton =
document.getElementById(
"resetBtn"
);

if(resetButton){

resetButton.addEventListener(
"click",
function(){

    data = {

        game:0,
        hammer:0,
        box:0,
        paper:0

    };

    saveData();

    updateUI();

});

}

// =====================
// 啟動
// =====================

updateUI();
