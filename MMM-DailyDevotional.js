Module.register("MMM-DailyDevotional", {
    defaults: {
        apiUrl: "https://api.browse.ai/v2/robots/b70be40d-dad7-4713-81fa-bbd3cd6d9689/monitors/DailyDevotional",
        apiKey: "f354afee-6e46-4651-a93d-064aa50785d4:b2d0528f-def0-4fde-8b6e-d4804e1e00bc",
        updateInterval: 24 * 60 * 60 * 5000, // Default: fetch data every 24 hours
    },

    start: function () {
        Log.info("Starting module: " + this.name);
        this.devotional = "Loading daily devotional...";
        this.getData();
        setInterval(() => {
            this.getData();
        }, this.config.updateInterval);
    },

    getData: function () {
        this.sendSocketNotification("FETCH_DEVOTIONAL", {
            apiUrl: this.config.apiUrl,
            apiKey: this.config.apiKey,
        });
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "DEVOTIONAL_RESULT") {
            this.devotional = payload.text || "No devotional data available.";
            this.updateDom();
        }
    },

    getDom: function () {
        const wrapper = document.createElement("div");
        wrapper.className = "bright medium light";
        wrapper.innerHTML = this.devotional;
        return wrapper;
    },
});
