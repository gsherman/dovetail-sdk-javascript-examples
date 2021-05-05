function rw(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
rw('Platform = fcSDK');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

 var fccl = WScript.CreateObject('FCCompatToolkit.CL');
 fccl.Initialize(FCApp,FCSession);

 var fccl = WScript.CreateObject('FCCompatToolkit.CL');
 var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var val_list = WScript.CreateObject('FCFLCompat.FCLIST');

  fccl.Initialize(FCApp,FCSession);
  
var part_num = 'moto serialized part';
var mod_level = '';
var domain_name = 'Hardware Part';
var quantity_num = 1;
var serial_num = '11';
var from_loc = 'my expense gl acct';
//var to_loc = 'central stores';
var to_loc = 'intransit'
var from_bin = '';
var from_cont = '';
var from_good = true;
var to_bin = '';
var to_cont = '';
var to_good = true;
var user_name = '';
var trans_date = '';
var ref_id = '';
var note_str = '';
var gen_time_bombs = true;
var fifo_flag = 0;
var update_cost = '';
var update_source = '';
var trans_id = '';
var std_cost = '';

var ret_int = fccl.part_transfer( part_num, 
                   mod_level ,  domain_name , 
                   quantity_num,  serial_num , 
                   from_loc ,  from_bin , 
                   from_cont ,  from_good,
                   to_loc ,  to_bin , 
                   to_cont ,  to_good,
                   user_name ,  trans_date ,
                   ref_id ,  note_str , 
                   gen_time_bombs,  fifo_flag, 
                   update_cost ,  update_source , 
                  trans_id ,  std_cost );


  rw('ret_string= ' + fccl.ret_string);
  rw('ret_num= ' + fccl.ret_num);
  rw('ret_objid= ' + fccl.ret_objid);
  


