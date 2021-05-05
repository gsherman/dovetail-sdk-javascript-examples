function echo(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

 var fcinter = WScript.CreateObject('FCCompatToolkit.INTER');
 fcinter.Initialize(FCApp,FCSession);   
 var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var val_list = WScript.CreateObject('FCFLCompat.FCLIST');


function CreatePart(part, domain, revision){
  var userName= '';
  var createDate = '';
  var notes = '';
  var description = 'This is the description for ' + part;
  var model_num = '';
  var warr_days = 30;
  var start_on_ship = false;
  var unit_measure = '';
  var family = '';
  var the_line = '';
  var repair_type = 'Repairable';
  var part_type = '';
  var weight = '';
  var dimension = '';
  var part_class = '';
  var int_fld1 = '';
  var int_val1 = 0;
  var int_fld2 = '';
  var int_val2 = 0;
  var str_fld1 = '';
  var str_val1 = '';
  var str_fld2 = '';
  var str_val2 = '';
  var date_fld1 = 'x_modify_stmp';
  var date_val1 = '-999';

  var ret_int = fcinter.create_update_part(part, domain, notes, description, model_num, warr_days, start_on_ship, unit_measure, family, the_line, repair_type, part_type, weight, dimension, part_class, int_fld1,int_val1,int_fld2,int_val2,str_fld1,str_val1,str_fld2,str_val2,date_fld1,date_val1);
  echo('created part with objid = ' + fcinter.ret_objid);

  var ret_int = fcinter.create_update_mod_level(part, domain, revision, '','','','','',false,'');
  echo('created revision with objid = ' + fcinter.ret_objid);  
}


var part = 'Serialized 1 - product domain'
var domain = 'Product'
var revision = '';

CreatePart(part,domain,revision);

