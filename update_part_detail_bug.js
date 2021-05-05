function rw(foo){WScript.Echo(foo);}

//
//script to demonstrate a bug in the update_pr_detail_list function
//

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
rw('Platform = fcSDK');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

 var fccl = WScript.CreateObject('FCCompatToolkit.CL');
 var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var val_list = WScript.CreateObject('FCFLCompat.FCLIST');

  var dtl_num = '33-1';
  var domain_name = ''
  var quantity_num = 0
  var sp_objid = 0
  var dtl_type = ''
  var priority_str = ''
  var ship_via = ''
  var carrier_name = ''
  var warranty = ''
  var note_str = 'hi there';
  var status_str = ''
  var mod_level = '';
  var part_num = '';

  //This causes an error of class doesn't support automation:
	  var warranty ='';
  //This works:
  	//var warranty = 0;

  fccl.Initialize(FCApp,FCSession);
  var retval = fccl.update_pr_detail_list(dtl_num, part_num, domain_name,
                                                mod_level, '', quantity_num,
                                                sp_objid, dtl_type, priority_str,
                                                ship_via, carrier_name, warranty,
                                                note_str, status_str,
                                                fld_list, type_list, val_list);


