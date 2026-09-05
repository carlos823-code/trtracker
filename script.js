// 讀取所有資料
let allData = JSON.parse(
    localStorage.getItem("kidTracker")
) || {};

// 今天日期
let currentDate =
    new Date().toISOString().split("T")[0];

// 設定日期選擇器
document.getElementById("selectedDate").value =
    currentDate;

// 如果今天沒有資料就建立
if (!allData[currentDate]) {
    allData[currentDate] = {
        game: 0,
        hammer: 0,
        box: 0,
        paper: 0
    };
}

let data = allData[currentDate];

// 加減次數
function change(type, value) {

    data[type] += value;

    if (data[type] < 0) {
        data[type] = 0;
    }

    saveData();
    updateUI();
}

// 儲存
function saveData() {

    allData[currentDate] = data;

    localStorage.setItem(
        "kidTracker",
        JSON.stringify(allData)
    );
}

// 計算分數
function calculateScore(record) {

    return (
        Math.floor(record.game) +
        Math.floor(record.hammer / 4) +
        Math.floor(record.box / 4) +
        Math.floor(record.paper / 10)
    );
}

// 更新畫面
function updateUI() {

    let gameScore =
        Math.floor(data.game);

    let hammerScore =
        Math.floor(data.hammer / 4);

    let boxScore =
        Math.floor(data.box / 4);

    let paperScore =
        Math.floor(data.paper / 10);

    let total =
        gameScore +
        hammerScore +
        boxScore +
        paperScore;

    // 任務數量
    document.getElementById("gameCount").textContent =
        data.game;

    document.getElementById("hammerCount").textContent =
        data.hammer;

    document.getElementById("boxCount").textContent =
        data.box;

    document.getElementById("paperCount").textContent =
        data.paper;

    // 任務分數
    document.getElementById("gameScore").textContent =
        gameScore + "分";

    document.getElementById("hammerScore").textContent =
        hammerScore + "分";

    document.getElementById("boxScore").textContent =
        boxScore + "分";

    document.getElementById("paperScore").textContent =
        paperScore + "分";

    // 今日分數
    document.getElementById("todayScore").textContent =
        total + " 分";

    // 計算累積總分
    let totalPoints = 0;
    let goalDays = 0;

    for (let date in allData) {

        let score =
            calculateScore(allData[date]);

        totalPoints += score;

        if (score >= 20) {
            goalDays++;
        }
    }

    // 累積總分
    document.getElementById("totalScore").textContent =
        totalPoints + " 分";

    // 每日目標
    document.getElementById("dailyGoal").textContent =
        total + " / 20";

    // 達標天數
    document.getElementById("goalDays").textContent =
        goalDays + " 天";

    // 500分目標
    document.getElementById("goal500").textContent =
        totalPoints + " / 500";

    // 歷史紀錄
    let tbody =
        document.querySelector(
            "#historyTable tbody"
        );

    tbody.innerHTML = "";

    let dates =
        Object.keys(allData).sort().reverse();

    dates.forEach(date => {

        let score =
            calculateScore(allData[date]);

        tbody.innerHTML += `
            <tr>
                <td>${date}</td>
                <td>${score} 分</td>
            </tr>
        `;
    });

    saveData();
}

// 日期切換
document
    .getElementById("selectedDate")
    .addEventListener(
        "change",
        function (e) {

            currentDate = e.target.value;

            if (!allData[currentDate]) {

                allData[currentDate] = {

                    game: 0,
                    hammer: 0,
                    box: 0,
                    paper: 0

                };
            }

            data =
                allData[currentDate];

            updateUI();
        }
    );

// 啟動
updateUI();