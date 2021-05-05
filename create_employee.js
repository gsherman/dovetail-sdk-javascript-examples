

function rw(foo){WScript.Echo(foo);}
function echo(foo){WScript.Echo(foo);}

function CreateEmployee(first,last,phone,siteId,email,loginName,strPassword,UseDatabaseLogins){
	
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

	fcinter.UseDatabaseLogins = UseDatabaseLogins;
	
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


//Create a new user/employee, with a database login
var loginName = 'dash-user';
var first="Dash"; 
var last="User"; 
var phone="512-610-5400"; 
var email=loginName + "@company.com"; 
var siteId = 'INT1';
var password = loginName;
var objid = CreateEmployee(first,last,phone,siteId,email,loginName,password,true);

//Create a new user/employee w/out a database login
/*
var loginName = 'wookie';
var first="Wookie"; 
var last="Sherman"; 
var phone="512-610-5466"; 
var email=loginName + "@company.com"; 
var siteId = 'INT1';
var password = loginName;
var objid = CreateEmployee(first,last,phone,siteId,email,loginName,password,false);
*/
