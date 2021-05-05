function echo(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var fccs = WScript.CreateObject('FCCompatToolkit.CS');
var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
var val_list = WScript.CreateObject('FCFLCompat.FCLIST');

fccs.Initialize(FCApp,FCSession);

var site_id = '';
var first = '';
var last = '';
var phone = '';
var part_num = '';
var mod_level = '';
var domain = '';
var serial_no = '';
var sp_objid = 0;
var contract_id = '';
var title = '';
var case_type = '';
var priority = '';
var severity = '';
var status = '';
var phone_log = '';
var queue = '';
var create_date = '';
var phone_end_date = '';
var user_name = '';
var gen_time_bombs = true;
var contact_objid = 268435457;
var site_objid = 268435462;
var ml_objid = 0;
var contract_objid = 0;
var addr_objid = 0;
var case_id = '1463'
var is_general = true;
var note_str = '';
var commit_dt = '';
var prior_warn = 0;

    var ret_int = fccs.create_subcase(
                  case_id,title,is_general,
                  priority,severity,status,note_str,
                  queue,create_date,commit_dt,prior_warn,user_name,gen_time_bombs,
                  '',0,'',0,'','','','','','');
                  

echo(ret_int);
echo(fccs.ret_objid);
echo(fccs.ret_id_num);
