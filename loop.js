var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

var numberOfIterations  = 100000;
var firstname = "Ann";
var startingDate = new Date();
WScript.Echo("started at: " + startingDate);
WScript.Echo("number of iterations: " + numberOfIterations);

loopCounter = numberOfIterations;
while (loopCounter--){
//for (var loopCounter = 0; loopCounter < numberOfIterations; loopCounter++){
	var contact = FCSession.CreateGeneric("contact");
	contact.DataFields="first_name, salutation";
	contact.AppendFilter("first_name", "=", firstname);
	contact.BulkName = "contact";
	contact.Query();
	contact("salutation") = "Mrs.";
	contact.Update();
	contact.CloseGeneric();
}

var endingDate = new Date();
WScript.Echo("ended at: " + endingDate);
var seconds = Math.round((endingDate.getTime() - startingDate.getTime()) / 1000);
WScript.Echo("elapsed time (in seconds): " + seconds);

FCSession.Logout();
