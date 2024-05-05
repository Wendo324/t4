// backgroundScript.js

// Listen for messages from content scripts
browser.runtime.onMessage.addListener(function(message) {
    if (message.type === "pii_notification") {
        // Display a notification to the user
        browser.notifications.create({
            type: "basic",
            title: "Data Collection Alert",
            message: message.message,
            iconUrl: "icon.png"
        });
    }
});
