function Echo(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
Echo('Platform: fcSDK');

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

Echo("default FCSession.CurrentCulture: " + FCSession.CurrentCulture);

Echo("setting FCSession.CurrentCulture to en-ie")

FCSession.CurrentCulture = "en-ie";
Echo("FCSession.CurrentCulture: " + FCSession.CurrentCulture);
  