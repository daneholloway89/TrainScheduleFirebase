// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve trains from the trainschedule database.
// 4. Create a way to calculate time until departure. Using difference between start and current time.
//    Then use moment.js formatting to set difference minutes.
// firebase
// These imports load individual services into the firebase namespace.
// 1. Initialize Firebase


var firebaseConfig = {
  apiKey: "AIzaSyBaPKLz4HQxpX2q1GDXGRpwWDPXwxpUkLI",
  authDomain: "trainschedule-c7ba1.firebaseapp.com",
  databaseURL: "https://trainschedule-c7ba1.firebaseio.com",
  projectId: "trainschedule-c7ba1",
  storageBucket: "trainschedule-c7ba1.appspot.com",
  messagingSenderId: "373423366308",
  appId: "1:373423366308:web:84fdcb1d6d9dc524"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainArrival = moment($("#arrival-input").val().trim(), "HH:mm").format("X");
  var trainRate = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    departure: trainArrival,
    rate: trainRate
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.departure);
  console.log(newTrain.rate);

  alert("Choo choo! New train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#depart-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainArrival = childSnapshot.val().departure;
  var trainRate = childSnapshot.val().rate;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainArrival);
  console.log(trainRate);

  // Prettify the train start
  var trainArrivalPretty = moment.unix(trainArrival).format("HH:mm");

  // Calculate the minutes away worked using hardcore math
  // To calculate the months worked
  var nextArrival = moment().diff(moment(trainArrival, "X"), "minutes");
  console.log(nextArrival);

  // Calculate the total billed rate
  var minutesAway = moment().diff(moment(nextArrival, "X"), "minutes");
  console.log(minutesAway);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainArrivalPretty),
    $("<td>").text(nextArrival),
    $("<td>").text(trainRate),
    // $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

