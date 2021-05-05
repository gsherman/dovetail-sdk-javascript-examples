var loginName = 'gary2';
var oldPassword = 'gary';
var newPassword = '123gary';
var newerPassword = '!bang#&gary|';

function rw(foo){WScript.Echo(foo);}
function echo(foo){WScript.Echo(foo);}

function CreateEmployee(first,last,phone,siteId,email,loginName,strPassword){
	
	var employee = FCSession.CreateGeneric('empl_user');
	employee.AppendFilter('login_name','=',loginName);
	employee.Query();
	if (employee.Count() > 0){
		echo("Employee Already Exists: " + loginName);
		return employee('user_id');
	}
	
	var strPager="";
	var strOnlinePrivClass="CSR";
	var strOfflinePrivClass="Offline User";
	var strId = "";
	var bIsActive = true;
	var bAllowProxy = true;
	var strStartDate= "";
	var strSupervisor = "";
	var strWorkGroup = "";
	var strWkgrpStartDate = "";
	var strRate = "";
	var bIsSupervisor = false;
	var bIsFE = false;
	var strNormalBizHigh = "";
	var strNormalBizMedium = "";
	var strNormalBizLow = "";
	var strAfterBizHigh = "";
	var strAfterBizMedium = "";
	var strAfterBizLow = "";
	var strWipbin = "";
	var strRC = "";
	var strDefTableSpace = "";
	var strTempTableSpace = "";
	
	var result = fcinter.create_employee_list( first,last,loginName,strPassword, 
	siteId,email,phone,strPager,strOnlinePrivClass, 
	strOfflinePrivClass,strId,bIsActive,bAllowProxy,strStartDate, 
	strSupervisor,strWorkGroup,strWkgrpStartDate,strRate, bIsSupervisor,bIsFE, 
	strNormalBizHigh,strNormalBizMedium,strNormalBizLow, 
	strAfterBizHigh,strAfterBizMedium,strAfterBizLow, 
	strWipbin,strRC,strDefTableSpace,strTempTableSpace, 
	fld_list,type_list,val_list); 
	echo("Created Employee: " + loginName); 
	return fcinter.ret_objid;
		               
}


var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var fcinter = WScript.CreateObject('FCCompatToolkit.INTER');
var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
var val_list = WScript.CreateObject('FCFLCompat.FCLIST');
fcinter.Initialize(FCApp,FCSession);


//Create a new user/employee
var first="Gary"; 
var last="Sherman"; 
var phone="512-610-5466"; 
var email=loginName + "@company.com"; 
var siteId = 'INT1';
var objid = CreateEmployee(first,last,phone,siteId,email,loginName,oldPassword);

//Change password - sa resets the user's password
FCSession.SetPassword(loginName,oldPassword,"user");

//Logout
FCSession.Logout();

//Login as this new user and Change password - user resets his own password

FCSession.Login(loginName, oldPassword,'user');
  rw('successfully logged in');
FCSession.ChangePassword(newPassword);
  rw('successfully changed password to new password');
FCSession.Logout();
  rw('successfully logged out');

FCSession.Login(loginName, newPassword,'user');
  rw('successfully logged in');
FCSession.ChangePassword(newerPassword);
  rw('successfully changed password to newer password');
FCSession.Logout();
  rw('successfully logged out');

FCSession.Login(loginName, newerPassword,'user');
  rw('successfully logged in');
FCSession.ChangePassword(oldPassword);
  rw('successfully changed password back to original password');
FCSession.Logout();
  rw('successfully logged out');



