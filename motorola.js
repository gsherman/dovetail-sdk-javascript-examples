function rw(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
rw('Platform = fcSDK');

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

/*
boActEntry = FCSession.CreateGeneric("act_entry")
boActEntry.AddNew();
boActEntry("act_code") = 999;
boActEntry.Update();
*/

var boDmndDtl = FCSession.CreateGeneric("demand_dtl");
boDmndDtl.AppendFilter("Detail_number", "=", "43-1");
boDmndDtl.Query();

boDmndDtl.records.GetRows();

//boDmndDtl.Bulk.Query();
