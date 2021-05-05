function Echo(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
Echo('Platform: fcSDK');

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

//Echo("default FCSession.CurrentCulture: " + FCSession.CurrentCulture);
//Echo("setting FCSession.CurrentCulture to en-ie")

FCSession.CurrentCulture = "en-IE";
Echo("FCSession.CurrentCulture: " + FCSession.CurrentCulture);

var fccq = WScript.CreateObject('FCCompatToolkit.CQ');
var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
var val_list = WScript.CreateObject('FCFLCompat.FCLIST');

  var strCCList1       = "";
  var strCCList2       = "";
  var strCPU           = "";
  var strCRClass       = "";
  var strCRType        = "";
  var strDetail        = "details go here";
  var strDomain        = "";
  var strFixedVersion  = "";
  var strHistory       = "";
  var strIdNumber      = "";
  var strMemory        = "";
  var strModLevel      = "";
  var strOS            = "";
  var strPartNumber    = "box";
  var strPartNumDomain = "Product";
  var strPriority      = "";
  var strQueue         = "";
  var strSeverity      = "";
  var strStatus        = "";
  var strTestClass     = "";
  var strTestName      = "";
  var strTitle         = "title goes here";
  
fccq.Initialize(FCApp,FCSession);
var intReturnValue = fccq.create_cr_list(strPartNumber, strModLevel,
                                         strPartNumDomain, strTitle,
                                         strStatus, strDetail,
                                         strCRType, strPriority,
                                         strSeverity, strCPU,
                                         strOS, strMemory,
                                         strCRClass, strDomain,
                                         strTestClass, strFixedVersion,
                                         strTestName, "",
                                         "", "", true,
                                         fld_list, type_list, val_list);
var cr_id = fccq.ret_id_num;
Echo('Created CR ' + cr_id);
                                           