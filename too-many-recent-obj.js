var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

var numberOfIterations  = 2200;
var loopCounter = numberOfIterations;
var objid = 268435457; //starting objif od case table
var id = 1; //starting id number of cases

while (loopCounter--){
	var g = FCSession.CreateGeneric("recent_obj");
	g.AddNew();
	g("recent_obj2user") = 268435470; //hank
	g("last_accessed") = "1/1/2015";
	g("obj_type") = "case";
	g("obj_id")= id++;
	g("obj_objid")= objid++;
	g.Update();

	WScript.Echo (objid);
}

WScript.Echo ("inserted: " + numberOfIterations);
FCSession.Logout();
