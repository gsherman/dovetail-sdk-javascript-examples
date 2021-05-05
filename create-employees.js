function rw(foo){WScript.Echo(foo);}
function echo(foo){WScript.Echo(foo);}

function GetRandomPersonData() {
    var xmlhttp = WScript.CreateObject("MSXML2.ServerXMLHTTP");
    var url = "https://randomuser.me/api/";
    xmlhttp.open("GET", url, false);
    xmlhttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    xmlhttp.send();
    response = xmlhttp.responseText;
	echo("Response:\n" + response + "\n");
	var data = eval("(" + response + ")");
	return data.results[0];
}


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
	echo("Created Employee: " + first + ' ' + last + ' (' + loginName + ')' ); 
	return fcinter.ret_objid;
		               
}

function AddUserToQueue(queueName,loginName){
 fcinter.add_user_to_queue(queueName, loginName, false)
 echo("Added User " + loginName + " to queue " + queueName);
}

//
// MAIN
//
var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var fcinter = WScript.CreateObject('FCCompatToolkit.INTER');
var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
var val_list = WScript.CreateObject('FCFLCompat.FCLIST');
fcinter.Initialize(FCApp,FCSession);

// constants:
var siteId = 'INT2';
var queueName = 'Advisor360';
var numberOfIterations  = 2000;

while (numberOfIterations--){
	//get random person data
	var person = GetRandomPersonData();
	var first = person.name.first;
	var last = person.name.last;
	var phone = person.phone;
	var username = person.login.username;
	var email = person.email;
	var password = username;

	// create employee & add to the queue
	var objid = CreateEmployee(first,last,phone,siteId,email,username,password,false);
	AddUserToQueue(queueName,username);
}

FCSession.Logout();
