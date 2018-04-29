var per = 20;
chrome.alarms.create("the20",{periodInMinutes: per});

chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
        if (btnIdx === 0) {
            chrome.notifications.clear(notifId);
        }
});

chrome.browserAction.onClicked.addListener(function(tab){
	chrome.alarms.getAll(function(alarms){
		if(alarms.length > 0) {
			chrome.alarms.clear(alarms[0].name);
			chrome.browserAction.setTitle({title:"Enable the alarm"});
			chrome.browserAction.setIcon(
			{path:"icons8-delete-50.png"}
			);
		}else{
			chrome.alarms.create("the20",{periodInMinutes: per});
			chrome.browserAction.setTitle({title:"Disable the alarm"});
			chrome.browserAction.setIcon({path:"icons8-time-50.png"});
		}
	});
});



function currTime(){
	var d = new Date();
	var ampm = d.getHours() >= 12 ? 'pm' : 'am';
	var hour = d.getHours() % 12;
	if (hour === 0)
		hour = 12;
	var minute = d.getMinutes();
	var second = d.getSeconds();
	return hour + ":" + minute + ":" + second;
}

chrome.alarms.onAlarm.addListener(function(){
		chrome.notifications.getAll(function(notifs){
			for (var notification in notifs){
				chrome.notifications.clear(notification);
			}
		});
		
		
		var  NotificationOptions = {
			type: "basic",
			title: "Take a break!",
			iconUrl: "icons8-time-50.png",
			message: "Look 20 feet away for 20 seconds!",
			contextMessage: currTime(),
			eventTime: Date.now(),
			requireInteraction: true,
			buttons: [{
				title: "I did it!",
				iconUrl: "icons8-checked-64.png"
			}],
		};
		console.log(Date.now());
        chrome.notifications.create(NotificationOptions);
    });