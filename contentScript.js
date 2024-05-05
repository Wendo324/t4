// contentScript.js

// Function to classify PII
function classifyPII(data) {
    const classifiedPII = [];
    const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
    const phoneRegex = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
    
    for (let key in data) {
        if (emailRegex.test(data[key])) {
            classifiedPII.push({ type: 'Email', value: data[key] });
        }
        if (phoneRegex.test(data[key])) {
            classifiedPII.push({ type: 'Phone Number', value: data[key] });
        }
        // Add more conditions for other types of PII
    }
    
    return classifiedPII;
}

// Function to send real-time notification
function sendNotification(classifiedPII) {
    if (classifiedPII.length > 0) {
        const notificationMessage = "Personal identification information detected:\n" +
                                    classifiedPII.map(info => `${info.type}: ${info.value}`).join('\n');
        browser.runtime.sendMessage({ type: "pii_notification", message: notificationMessage });
    }
}

// Add an event listener for form submission
document.addEventListener('submit', function(event) {
    const inputFields = event.target.querySelectorAll('input, textarea');
    if (inputFields.length > 0) {
        const formData = {};
        inputFields.forEach(field => {
            formData[field.name] = field.value;
        });
        const classifiedPII = classifyPII(formData);
        sendNotification(classifiedPII);
    }
});
