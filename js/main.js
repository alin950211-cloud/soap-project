const tasks = [...document.querySelectorAll("[data-habit]")];
const progress = document.querySelector("#habit-progress");
const message = document.querySelector("#habit-status");
const reset = document.querySelector("#reset-habits");
const storageKey = "soap-daily-habits";

if (tasks.length && progress && message && reset) {
    // 讀取之前的勾選狀態
    try {
        const saved = JSON.parse(
            localStorage.getItem(storageKey) || "[]"
        );

        if (Array.isArray(saved)) {
            tasks.forEach((task, index) => {
                task.checked = saved[index] === true;
            });
        }
    } catch {
        // 無法讀取時，仍能正常使用
    }

    function update() {
        const count = tasks.filter(task => task.checked).length;

        progress.value = count;
        message.textContent = count === tasks.length
            ? "任務完成！今天的好習慣，明天繼續！"
            : `今日完成 ${count} / ${tasks.length} 項生活行動`;

        try {
            localStorage.setItem(
                storageKey,
                JSON.stringify(tasks.map(task => task.checked))
            );
        } catch {
            // 瀏覽器不允許儲存時，不影響勾選功能
        }
    }

    tasks.forEach(task => task.addEventListener("change", update));

    reset.addEventListener("click", () => {
        tasks.forEach(task => {
            task.checked = false;
        });
        update();
    });

    update();
}