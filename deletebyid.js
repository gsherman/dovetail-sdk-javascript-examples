function rw(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
rw('Platform = fcSDK');

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var objid = 268435459;

var modem = FCSession.CreateGeneric('modem');
modem.AddForUpdate(objid);
modem.Delete();
modem.UpdateAll();

modem.CloseGeneric();
modem = null;
   



