var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');

var caseIdNumber = WScript.Arguments(0);

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var caseRecord = FCSession.CreateGeneric(); 
caseRecord.DBObjectName = 'case'; 
caseRecord.AppendFilter('id_number','=',caseIdNumber);
caseRecord.Query();
caseRecord('site_time') = -999; //-999 is a shorthand way of specifying DataTime.Now
caseRecord.Update();
