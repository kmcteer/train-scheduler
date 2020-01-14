// enter api (firebase) info here

var firebaseConfig = {
    apiKey: "AIzaSyCE8s3Pr90yrVE1yOSGE8hxLzUL2HpdWOY",
    authDomain: "train-scheduler-544cd.firebaseapp.com",
    databaseURL: "https://train-scheduler-544cd.firebaseio.com",
    projectId: "train-scheduler-544cd",
    storageBucket: "train-scheduler-544cd.appspot.com",
    messagingSenderId: "746905291381",
    appId: "1:746905291381:web:92b99262c0b20299eb863c",
    measurementId: "G-YHGMJWE4P3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

var trainData = firebase.database();

$("#addTrainBtn").on("click",function(){
    event.preventDefault()
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("x");
    var frequency = $("#frequencyInput").val().trim();


    console.log(trainName,destination, firstTrain, frequency);
    trainData.ref().push({
        trainName: trainName,
        destination:destination,
        firstTrain:firstTrain,
        frequency:frequency
    })
})

trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;
        
    var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);
// this put the data into the train schedule using jquery. reference train table (table body) which appens a new row for each new piece of data, then new data for each column.. name, destination, frequency, arrival time, and how many munites left till arrival time. 
    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td><td>");
})


