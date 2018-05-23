//Number of minutes between each reminder
var per = 20;

//Create a new audio instance and set the path
var countdownAudio = new Audio();
countdownAudio.src = "countdown.mp3";
countdownAudio.preload = 'auto';

//Alarm set for notification
chrome.alarms.create("the20",{periodInMinutes: per});

//Event listener for button click on notification
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
        if (btnIdx === 0) {
            chrome.notifications.clear(notifId);
        }else if (btnIdx === 1) {
      countdownAudio.load();
			countdownAudio.play();

			chrome.notifications.clear(notifId);
		}
});

//Event listener for clicking browseraction
//Note: works only if there is no popup for browseraction
chrome.browserAction.onClicked.addListener(function(tab){
	chrome.alarms.get("the20",function(alarm){
    //enabling or disabling the alarm(removing or adding it)
		if(typeof alarm != 'undefined') {
			chrome.alarms.clear("the20");
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



//Returns the current local time in string format HH:MM:SS am|pm
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

//Event listender for notification alarm
chrome.alarms.onAlarm.addListener(function(){
    //Deletes any notification created by this extensions previously
		chrome.notifications.getAll(function(notifs){
			for (var notification in notifs){
				chrome.notifications.clear(notification);
			}
		});

    //Create notification
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
			},
			{
				title: "Countdown 20 seconds",
				iconUrl: "icons8-music-64.png"
			}],
		};
		console.log(Date.now());
        chrome.notifications.create(NotificationOptions);
    });

    // Saves options to chrome.storage
    function save_options() {
      var color = document.getElementById('color').value;
      var likesColor = document.getElementById('like').checked;
      chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
      }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
          status.textContent = '';
        }, 750);
      });
    }

    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    function restore_options() {
      // Use default value color = 'red' and likesColor = true.
      chrome.storage.sync.get({
        favoriteColor: 'red',
        likesColor: true
      }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
      });
    }
    document.addEventListener('DOMContentLoaded', restore_options);
    document.getElementById('save').addEventListener('click',
        save_options);
