
chrome.alarms.create("the20",{periodInMinutes: 1})

chrome.alarms.onAlarm.addListener(function(){
		var  NotificationOptions = {
			type: "image",
			title: "Take a break!",
			iconUrl: "icon19.png",
			message: "Look 20 feet away for 20 seconds!",
			eventTime: Date.now() + n
		};
        chrome.notifications.create(NotificationOptions);
    });