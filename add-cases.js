
function Echo(foo){WScript.Echo(foo);}
function EchoStatus(foo){WScript.Echo(foo);}

function CreateCase(first,last,phone,siteId,title,phoneNotes,queue){
	var part_num = '';
	var mod_level = '';
	var domain = '';
	var serial_no = '';
	var sp_objid = 0;
	var contract_id = '';
	var case_type = 'Problem';
	var priority = 'Medium';
	var severity = 'High';
	var status = '';
	var phone_log = '';
	var create_date = '';
	var phone_end_date = '';
	var user_name = 'hank';
	var gen_time_bombs = true;

  var result = fccs.create_case(siteId, first, last, phone, part_num, mod_level, domain, serial_no, sp_objid,
                             contract_id, title, case_type, priority, severity, status, phoneNotes, queue, "", "", user_name,
                             true, "",0,"",0,"","","","","","")                            
  
  EchoStatus("Created Case: " + fccs.ret_id_num);
  return fccs.ret_id_num;
}


var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

var fccs = WScript.CreateObject('FCCompatToolkit.CS');
fccs.Initialize(FCApp,FCSession);

var numberOfIterations  = 100;
var firstname = "Ann";
var startingDate = new Date();
WScript.Echo("started at: " + startingDate);
WScript.Echo("number of iterations: " + numberOfIterations);

loopCounter = numberOfIterations;
var queue = "";
var phoneNotes = "lorem ipsum bacon";

while (loopCounter--){
	var caseId1 = CreateCase("Dummy","Contact","0000000000","108","test case from sdk script",phoneNotes,queue);
}

FCSession.Logout();

