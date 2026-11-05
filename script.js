
let selectedCourse = null;
let selectedGroup = null;

const groupsByCourse = {
    1: ["13"],
    2: ["23"],
    3: ["33"]
};

const schedule = [
    { number: 1, name: "Математика", time: "08:30–10:00", cabinet: "214" },
    { number: 2, name: "История", time: "10:15–11:45", cabinet: "108" },
    { number: 3, name: "Информатика", time: "12:00–13:30", cabinet: "305" },
    { number: 4, name: "Физика", time: "13:45–15:15", cabinet: "212" }
];

function selectCourse(button, course) {
    selectedCourse = course;
    selectedGroup = null;

    document.querySelectorAll(".course").forEach(item => {
        item.classList.remove("selected");
    });

    button.classList.add("selected");
    document.getElementById("group-section").classList.remove("hidden");

    const groupList = document.getElementById("group-list");
    groupList.innerHTML = "";

    groupsByCourse[course].forEach(group => {
        const groupButton = document.createElement("button");
        groupButton.className = "group";
        groupButton.textContent = group;
        groupButton.onclick = () => selectGroup(groupButton, group);
        groupList.appendChild(groupButton);
    });
}

function selectGroup(button, group) {
    selectedGroup = group;

    document.querySelectorAll(".group").forEach(item => {
        item.classList.remove("selected");
    });

    button.classList.add("selected");
}

function finishSetup() {
    if (!selectedCourse || !selectedGroup) {
        alert("Выбери курс и группу!");
        return;
    }

    localStorage.setItem("school", "ДБК");
    localStorage.setItem("course", selectedCourse);
    localStorage.setItem("group", selectedGroup);

    showHome();
}

function showHome() {
    document.getElementById("setup-screen").classList.add("hidden");
    document.getElementById("subpage-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");

    const course = localStorage.getItem("course");
    const group = localStorage.getItem("group");

    document.getElementById("user-info").textContent =
        `ДБК · ${course} курс · Группа ${group}`;
}

function showPage(page) {
    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("subpage-screen").classList.remove("hidden");

    const content = document.getElementById("subpage-content");

    if (page === "schedule") {
        content.innerHTML = `
            <h2>📚 Расписание на сегодня</h2>
            <p class="day-title">Твои пары</p>
            ${schedule.map(pair => `
                <div class="pair-card">
                    <div class="pair-top">
                        <div>
                            <div class="pair-number">${pair.number} пара</div>
                            <div class="pair-name">${pair.name}</div>
                        </div>
                        <span class="cabinet">Каб. ${pair.cabinet}</span>
                    </div>
                    <div class="pair-time">${pair.time}</div>
                </div>
            `).join("")}
        `;
    }

    if (page === "changes") {
        content.innerHTML = `
            <h2>🔔 Изменения</h2>
            <div class="pair-card">
                <p>Здесь будут отображаться замены, переносы и изменения кабинетов.</p>
            </div>
        `;
    }

    if (page === "week") {
        content.innerHTML = `
            <h2>📅 Расписание на неделю</h2>
            <div class="pair-card">
                <p>Здесь появится полное расписание пар на всю неделю.</p>
            </div>
        `;
    }

    if (page === "profile") {
        content.innerHTML = `
            <h2>👤 Профиль</h2>
            <div class="pair-card">
                <p>Раздел профиля пока не разрабатываем.</p>
            </div>
        `;
    }

    if (page === "settings") {
        content.innerHTML = `
            <h2>⚙️ Настройки</h2>

            <div class="settings-card">
                <h3>🔔 Уведомления</h3>
                <p class="settings-description">
                    Выбери, о чём бот будет тебе сообщать.
                </p>

                <div class="setting-row">
                    <div class="setting-info">
                        <strong>Ежедневное расписание</strong>
                        <small>Присылать пары на сегодня</small>
                    </div>

                    <label class="toggle-switch">
                        <input
                            type="checkbox"
                            id="daily-toggle"
                            onchange="saveNotificationSettings()"
                        >
                        <span class="toggle-slider"></span>
                    </label>
                </div>

                <div class="setting-row">
                    <div class="setting-info">
                        <strong>Изменения расписания</strong>
                        <small>Сообщать о заменах и переносах</small>
                    </div>

                    <label class="toggle-switch">
                        <input
                            type="checkbox"
                            id="changes-toggle"
                            onchange="saveNotificationSettings()"
                        >
                        <span class="toggle-slider"></span>
                    </label>
                </div>
            </div>

            <div class="settings-card">
                <h3>🕒 Время отправки</h3>
                <p class="settings-description">
                    Во сколько присылать расписание?
                </p>

                <input
                    type="time"
                    id="notification-time"
                    class="time-input"
                    value="07:00"
                    onchange="saveNotificationSettings()"
                >
            </div>

            <p class="settings-note" id="settings-status">
                Настройки сохраняются на этом устройстве.
            </p>
        `;

        loadNotificationSettings();
    }
}

function loadNotificationSettings() {
    document.getElementById("daily-toggle").checked =
        localStorage.getItem("dailyNotifications") === "true";

    document.getElementById("changes-toggle").checked =
        localStorage.getItem("changeNotifications") === "true";

    document.getElementById("notification-time").value =
        localStorage.getItem("notificationTime") || "07:00";
}

function saveNotificationSettings() {
    const daily = document.getElementById("daily-toggle").checked;
    const changes = document.getElementById("changes-toggle").checked;
    const time = document.getElementById("notification-time").value;

    localStorage.setItem("dailyNotifications", daily);
    localStorage.setItem("changeNotifications", changes);
    localStorage.setItem("notificationTime", time);

    document.getElementById("settings-status").textContent =
        "✓ Настройки сохранены на этом устройстве.";
}

function goHome() {
    document.getElementById("subpage-screen").classList.add("hidden");
    document.getElementById("home-screen").classList.remove("hidden");
}

function openSetup() {
    selectedCourse = null;
    selectedGroup = null;

    document.getElementById("home-screen").classList.add("hidden");
    document.getElementById("subpage-screen").classList.add("hidden");
    document.getElementById("setup-screen").classList.remove("hidden");

    document.querySelectorAll(".course, .group").forEach(item => {
        item.classList.remove("selected");
    });

    document.getElementById("group-section").classList.add("hidden");
}

function startApp() {
    const course = localStorage.getItem("course");
    const group = localStorage.getItem("group");

    if (course && group) {
        showHome();
    }
}

startApp();
