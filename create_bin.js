function echo(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

 var fcinter = WScript.CreateObject('FCCompatToolkit.INTER');
 fcinter.Initialize(FCApp,FCSession);   
 var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var val_list = WScript.CreateObject('FCFLCompat.FCLIST');


function CreateBin(binName, siteId){
  var parentBinObjid = -1;
  var description = '';
  var primarySupportEmpObjid = -1;
  var secondarySupportEmpObjid = -1;
  var userName= '';
  var createDate = '';

  var ret_int = fcinter.create_product_bin(binName, siteId, parentBinObjid, description, primarySupportEmpObjid, secondarySupportEmpObjid, userName, createDate);   
  echo('created bin with objid = ' + fcinter.ret_objid);
}


var siteId = 'INT1'
var numBins = 2;

for (var i=0;i< numBins;i++){
  var binName = 'This is a bin ' + i;
  CreateBin(binName, siteId);
}
