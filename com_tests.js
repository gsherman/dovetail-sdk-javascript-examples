//Arguments:
//cscript com_tests.js databaseServer databaseName databaseType

if (WScript.Arguments.Count() != 3 ){
  WScript.Echo('Invalid number of arguments');
  WScript.Echo('   Syntax:  cscript com_tests.js databaseServer databaseName databaseType');
  WScript.Echo('   Example: cscript com_tests.js localhost fcclient mssql');
  WScript.Quit(-1);
}

var databaseServer = WScript.Arguments(0);
var databaseName = WScript.Arguments(1);
var databaseType = WScript.Arguments(2);


var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.InitializeFull('sa','sa',databaseServer,databaseName,databaseType);

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

//fcGeneric Query Test 
var gen = FCSession.CreateGeneric('user');
gen.AppendFilter('login_name','=','sa');
gen.DataFields='login_name,last_login,dev';
gen.AppendSort('login_name','asc');
gen.Query();
WScript.Echo('fcGeneric query test Successful');

//test the count() method on an fcgeneric
WScript.Echo('Number of records found : ' + gen.Count() );


//fcGeneric access field test
try{
  var lastLogin = gen('last_login');
}catch(e){
  WScript.Echo('fcGeneric access field Test Failed');
  WScript.Echo('   accessing the last_login field on table_user failed with error: ' + e.description);
  WScript.Quit(-1);
}
WScript.Echo('Last login for sa user: ' + lastLogin);


//fcGeneric update field test
gen('dev') = 999;
if (gen('dev') != 999){
  WScript.Echo('fcGeneric Update field test Failed');
  WScript.Echo('   fcGeneric Update field test failed with error: ' + e.description);
  WScript.Quit(-1);
}

gen.CloseGeneric();
gen=null;


var fcinter = WScript.CreateObject('FCCompatToolkit.INTER');
var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
var val_list = WScript.CreateObject('FCFLCompat.FCLIST');

fcinter.Initialize(FCApp,FCSession);

var address="8900 Business Park Drive";
var address2="";
var city="Austin";
var state="TX"
var isShortState=true;
var zip="78759";
var country="USA";
var timeZone="CST";

//Toolkit test 
try{
  var addressResult = fcinter.create_address(address,address2,city,state,isShortState,zip,country,timeZone,"",0,"",0,"","","","","","");
  WScript.Echo('Toolkit Test Successful');
}catch(e){
  WScript.Echo('Toolkit Test Failed');
  WScript.Echo('   fcinter.create_address test failed with error: ' + e.description);
  WScript.Quit(-1);
}

//Toolkit test using fclists 

  fld_list.AppendItem("address_2");
  val_list.AppendItem("Ugly Building on the right");
  type_list.AppendItem("String");

  fld_list.AppendItem("dev");
  val_list.AppendItem("100");
  type_list.AppendItem("Integer");

try{
  var addressResult = fcinter.create_address_list(address,address2,city,state,isShortState,zip,country,timeZone,fld_list,type_list,val_list);
  WScript.Echo('Toolkit Test using fclists Successful');
}catch(e){
  WScript.Echo('Toolkit Test using fclists Failed');
  WScript.Echo('   fcinter.create_address_list test failed with error: ' + e.description);
  WScript.Quit(-1);
}

