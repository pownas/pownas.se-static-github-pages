var countdownInterval;
var countingDown = true;
var time_left = document.getElementById("countdown").innerText;
var redirectUrl = document.getElementById("redirectURL").innerText;
 
function timeDecrease() {
  if(countingDown) {
    time_left--;
    document.getElementById('countdown').innerHTML = time_left;
    if(time_left == 1) {
      renameSecondS(false);
    }
    if(time_left == 0) {
      renameSecondS();
      redirectPage();
    }
    console.log("Redirect to URL: " + redirectUrl + " in " + time_left + " seconds.");
  }
}

function redirectPage() {
  setTimeout(function() {
    window.location.replace(redirectUrl);
    clearInterval(countdownInterval);
  }, 250);
}

function renameSecondS(showSAtEnd = true) {
  var originalstring = document.getElementById('countdownS').innerHTML;
  var newstring = originalstring.replace('.','s.');
  if(showSAtEnd == false){
    newstring = originalstring.replace('s.','.');
  }
  document.getElementById('countdownS').innerHTML = newstring;
}

function cancelCountdown() {
  if(countingDown) {
    countingDown = false;
    document.getElementById('cancelButton').innerHTML = "Continue";
  } else {
    countingDown = true;
    document.getElementById('cancelButton').innerHTML = "Cancel";
  }
}

countdownInterval = setInterval('timeDecrease()', 1000);