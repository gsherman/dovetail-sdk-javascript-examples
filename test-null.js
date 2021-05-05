
var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var n = WScript.CreateObject('System.DBNull');


	var generic = FCSession.CreateGeneric('task'); 
	generic.AddNew();
	generic('task_id') = 996;
	generic("update_stamp") = null;
	//generic.Update();
	generic.CloseGeneric();
	generic = null;
