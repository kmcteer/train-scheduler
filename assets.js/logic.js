// enter api (firebase) info here



var trainData = firebase.database();

$("#addTrainBtn").on("click",function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var tfirstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("x");
    var frequency = $("#frequencyInput").val().trim();


    console.log(firstTrain);
    return false;

})

trainData.ref().on("child_added",function(snapshot){
    var name = snapshot.val().name;
    var destination = smapshot.val().destination;
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


