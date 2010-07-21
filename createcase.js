var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var fccs = WScript.CreateObject('FCCompatToolkit.CS');
var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
var val_list = WScript.CreateObject('FCFLCompat.FCLIST');

fccs.Initialize(FCApp,FCSession);

var first = "Mark"
var last = "Miller"
var phone = "512-918-9990"
var siteId = "4"
var queue="Support Cases"
var title="this is the case title of a case created by an api";
var phoneNotes = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";
var part_num = '';
var mod_level = '';
var domain = '';
var serial_no = '';
var sp_objid = 0;
var contract_id = '';
var case_type = '';
var priority = '';
var severity = '';
var status = '';
var phone_log = '';
var create_date = '';
var phone_end_date = '';
var user_name = '';
var gen_time_bombs = true;

var result = fccs.create_case(siteId, first, last, phone, part_num, mod_level, domain, serial_no, sp_objid,
                           contract_id, title, case_type, priority, severity, status, phoneNotes, queue, "", "", user_name,
                           true, "",0,"",0,"","","","","","")                            

WScript.Echo("Created Case: " + fccs.ret_id_num);
 