var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

var numberOfIterations  = 2200;
var loopCounter = numberOfIterations;
var objids = "";
var start = 268455320;
var end = start + numberOfIterations;

while (loopCounter--){
	objids+=start+",";
	start++;
}
objids+=end;
//WScript.Echo (objids);

var recentObjsGeneric = FCSession.CreateGeneric("recent_obj");
recentObjsGeneric.AppendFilter("objid", "is in", objids);
recentObjsGeneric.Query();
recentObjsGeneric.DeleteAll();
recentObjsGeneric.UpdateAll();


FCSession.Logout();
