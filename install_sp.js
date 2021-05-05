function rw(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

 var fcinter = WScript.CreateObject('FCCompatToolkit.INTER');
 var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var val_list = WScript.CreateObject('FCFLCompat.FCLIST');

 fcinter.Initialize(FCApp,FCSession);

  var site_id = '65';
  var part_num = 'HDMI cable';
  var mod_level = '';
  var domain = 'Automotive Non Serialized Parts';
  var quantity = 1;
  var serial_num = '';
  var parent_bin_objid = 0;
  var parent_sp_objid = 0;
  var instance_name = '';
  var comment = 'install via install_sp';
  var part_status = '';
  var invoice_no = '';
  var user_name = '';
  var install_date = '';
  var ship_date = '';
  var add_activity = true;

for (var i = 0; i< 60; i++){

  var retval = fcinter.install_sp( site_id , part_num ,  mod_level , domain ,  quantity, serial_num ,  parent_bin_objid, 
    parent_sp_objid,  instance_name , comment ,  part_status , invoice_no ,  user_name , install_date ,  ship_date, add_activity,
    '', 0, '', 0, '', '', '', '', '', '');
}
