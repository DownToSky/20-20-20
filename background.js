//Number of minutes between each reminder
var per = 20;
myAudio = new Audio("notif.mp3");
//Alarm set for notification
chrome.alarms.create("the20", {
  periodInMinutes: per
});


//Event listener for button click on notification
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
  if (btnIdx === 0) {
    chrome.notifications.clear(notifId);
  } else if (btnIdx === 1) {
    chrome.alarms.create("20 second countdown",{
      notifID: notifId,
      when: Date.now() + 20*1000
    });
  }
});

//Event listener for clicking browseraction
//Note: works only if there is no popup for browseraction
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.alarms.get("the20", function(alarm) {
    //enabling or disabling the alarm(removing or adding it)
    if (typeof alarm != 'undefined') {
      chrome.alarms.clear("the20");
      chrome.browserAction.setTitle({
        title: "Enable the alarm"
      });
      chrome.browserAction.setIcon({
        path: "icons8-delete-50.png"
      });
    } else {
      chrome.alarms.create("the20", {
        periodInMinutes: per
      });
      chrome.browserAction.setTitle({
        title: "Disable the alarm"
      });
      chrome.browserAction.setIcon({
        path: "icons8-time-50.png"
      });
    }
  });
});



//Returns the current local time in string format HH:MM:SS am|pm
function currTime() {
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
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === "the20")
  {
    //Deletes the20 created by this extensions previously
    chrome.notifications.getAll(function(notifs) {
      for (var notification in notifs) {
        chrome.notifications.clear(notification);
      }
    });

    //Create notification
    var NotificationOptions = {
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
        }
      ],
    };
    chrome.notifications.create(NotificationOptions);
  }
  else {
    if (alarm.name === "20 second countdown")
    {
      myAudio.play();
      chrome.notifications.clear(alarm.notifID);
    }
  }
});
