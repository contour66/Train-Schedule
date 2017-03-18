


  // Initialize Firebase

    // Initialize Firebase
 var config = {
    apiKey: "AIzaSyD_7oNETZ09SKdgPlsy945S3Psq8_X_XnA",
    authDomain: "train-schedule-161423.firebaseapp.com",
    databaseURL: "https://train-schedule-161423.firebaseio.com",
    storageBucket: "train-schedule-161423.appspot.com",
    messagingSenderId: "496366132963"
  };

  firebase.initializeApp(config);

  // Get a reference to the database service
  var database = firebase.database();
  
  // var trainName = "";
  // var destination = "";
  // var frequency = 0;
 

	$("#run-search").on("click", function() {
    event.preventDefault();

		  var trainName = $("#train-name-input").val().trim();
  		var destination = $("#destination-input").val().trim();
  		var firstTrain = $("#first-train-input").val().trim();
  		var frequency = $("#frequency-input").val().trim();
      // var empRate = $("#rate-input").val().trim();
	console.log(trainName);



    var newTrain = {
      name: trainName,
      dest: destination,         
      first: firstTrain,
      freq: frequency,

    };
     
    database.ref().push(newTrain);

//     console.log(newTrain.name);
//     console.log(newTrain.dest);
//     console.log(newTrain.first);
//     console.log(newTrain.rate);
	

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");

      return false;
 	});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
   console.log(childSnapshot.val());
//   // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().dest;
  var firstTrain = childSnapshot.val().first;
  var frequency = childSnapshot.val().freq;
  
  var trainTimeConversion = ((moment(firstTrain, "hh:mm")/1000))/60;
  console.log("Converted train time: " + trainTimeConversion + " minutes");

  var currentTime = ((moment()/1000))/60;
  console.log("Current time: " + currentTime + " minutes");

  var timeDiff = currentTime - trainTimeConversion;
  console.log ("Difference in time: " + timeDiff + " minutes");

  var tRemainder = timeDiff % frequency;
  console.log("Time apart: " + tRemainder);

  var tMinutesTillTrain = Math.ceil(frequency - tRemainder);
  console.log("Minutes till train " + tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("Arrival Time: ") + moment (nextTrain).format("hh:mm");

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +  frequency + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});












//   // Employee Info
//   console.log(trainName);
//   console.log(destination);
//   console.log(frequency);
//   // console.log();
//   // // Prettify the employee start
//   // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
//   // // Calculate the months worked using hardcore math
//   // // To calculate the months worked
//   // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
//   // console.log(empMonths);
//   // // Calculate the total billed rate
//   // var empBilled = empMonths * empRate;
//   // console.log(empBilled);
//   // Add each train's data into the table
//   $("#trainDisplay > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
//   empStartPretty + "</td><td>" + firstTrain + "</td><td>" + frequency + "</td><td>" );
// });