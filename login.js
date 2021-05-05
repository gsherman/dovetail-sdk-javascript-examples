var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
//WScript.Echo('Platform = fcSDK');

FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFcApp();
//WScript.Echo("successfully logged in the application");

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

//WScript.Echo("successfully logged in the session");
WScript.Echo("server time zone:" + FCApp.ServerTimeZone);
WScript.Echo("current server time = " + FCSession.GetCurrentServerDate());
WScript.Echo('');
WScript.Echo("client time zone:" + FCSession.LocalTimeZone);
WScript.Echo("current client time = " + FCSession.GetCurrentDate());
WScript.Echo('');

var acd = FCSession.CreateGeneric('acd_call');
acd.AddNew();
acd('creation_time') = -999;
acd.Update();
var objid = acd.Id;
WScript.Echo('created acd with objid: ' + objid);

var sqlExec = FCSession.CreateSQLExec();
sqlExec.ExecuteReturnRows("select * from table_acd_call where objid = " + objid);
while (sqlExec.Records.EOF != true)
{
    WScript.Echo("creation_time of acd_call in database: " + sqlExec.Records("creation_time"));   
    sqlExec.Records.MoveNext();
}


/*
WScript.Echo(FCSession.LoginTime);
var TZList = FCApp.GetTimeZoneList();

while (! TZList.EOF) { 
  WScript.Echo(TZList("full_name"))
  TZList.MoveNext();
} 


*/

