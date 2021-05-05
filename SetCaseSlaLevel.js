var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');

var caseObjid = WScript.Arguments(0);
var slaLevel = WScript.Arguments(1);

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var caseRecord = FCSession.CreateGeneric(); 
caseRecord.DBObjectName = 'case'; 
caseRecord.AddForUpdate(caseObjid);
caseRecord('x_sla_level') = slaLevel;
caseRecord.Update();

