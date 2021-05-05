var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();
FCSession.Login("candace","candace","user");
WScript.Echo('logged in successfully');

var genericCaseView = FCSession.CreateGeneric("case_overview");
genericCaseView.AppendFilter("address","=","111 Main Street");
genericCaseView.Query();

//WScript.Echo("Found " + genericCaseView.Count() + " records from " + genericCaseView.DBObjectName);

if (FCSession.RESEnabled){ WScript.Echo('res is enabled');}
else{ WScript.Echo('res is not enabled');}
	
var res = FCSession.cur_res;

for (var i = 1; i< res.Count(); i++ ){
	WScript.Echo(res.Item(i));
}
	
FCSession.Logout();
WScript.Echo('done');