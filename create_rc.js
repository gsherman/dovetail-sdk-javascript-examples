var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var rc = FCSession.CreateGeneric('rc_config');
rc.AddNew();
rc("name") = "custom";
rc("base_flag") = 0;
rc.Update();

