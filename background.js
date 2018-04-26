
chrome.alarms.create("the20",{periodInMinutes: 20})

chrome.alarms.onAlarm.addListener(function(){
		var  NotificationOptions = {
			type: "basic",
			title: "Take a break!",
			iconUrl: "icon19.png",
			message: "Look 20 feet away for 20 seconds!",
			eventTime: Date.now()
		};
		console.log(Date.now());
        chrome.notifications.create(NotificationOptions);
    });