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

  var hdr_num = '103';
  var queue = '';
  var domain_name = 'Unique Serialized Product';
  var mod_level = '';
  var part_num='Lodgenet Cable Box';
  var serial='';
  var quantity_num = 4;
  var sp_objid = 0;
  var sp_rec_recordtype = '';
  var dtl_type = 'Order';
  var priority_str = '';
  var ship_via = '';
  var carrier_name = '';
  var warranty = '';
  var note_str = 'hi there';
  var status_str = ''
  var warranty = 0;
  var user_name = '';
  var create_date = '';
  var due_date = '';
  var contr_itm_objid = 0;
  var gen_time_bombs = true;

  fccl.Initialize(FCApp,FCSession);
  var retval = fccl.make_pr_detail_list(hdr_num, queue,part_num, domain_name,
                                                mod_level, serial, quantity_num,
                                                sp_objid, sp_rec_recordtype, dtl_type, priority_str,
                                                ship_via, carrier_name, user_name, warranty,
                                                note_str, status_str,create_date,due_date,gen_time_bombs, contr_itm_objid,
                                                fld_list, type_list, val_list);
  rw('Created pr detail: ' + fccl.ret_id_num);
  
var startingSerialNumber = 15;


var detailNum = fccl.ret_id_num;
var isFulfill = true;
var quantity = 1;

var fromLocation='central stores';
//var fromLocation='Expense GL Account 1';

var fromBin = '';
var fromContainer = '';
var fromGood = true;

var toLocation = 'a new inv location';
//var toLocation='Expense GL Account 2';

var toBin = '';
var toContainer = '';
var toGood = true;
var serialNumber = startingSerialNumber + '';
var newStatus = '';
var expectedDate = '';
var userName = '';
var fulfillDate = '';
var genTimeBombs = true;
 
//call fulfill no trans; this will process the first part, but *won't* create a new part request for the remainder
var ret = fccl.fulfill_no_trans(detailNum, isFulfill, quantity, fromLocation, fromBin, fromContainer, fromGood, 
          toLocation, toBin, toContainer, toGood, serialNumber, newStatus, expectedDate, userName, fulfillDate, genTimeBombs);
rw('Fulfilled ' + quantity + ' items.');

startingSerialNumber++;
var serialNumber = startingSerialNumber + '';

//call fulfill no trans; this will process the first part, but *won't* create a new part request for the remainder
var ret = fccl.fulfill_no_trans(detailNum, isFulfill, quantity, fromLocation, fromBin, fromContainer, fromGood, 
          toLocation, toBin, toContainer, toGood, serialNumber, newStatus, expectedDate, userName, fulfillDate, genTimeBombs);
rw('Fulfilled ' + quantity + ' items.');

startingSerialNumber++;
var serialNumber = startingSerialNumber + '';

//call fulfill; this will process the first part, but *will* create a new part request for the remainder
var ret = fccl.fulfill(detailNum, isFulfill, quantity, fromLocation, fromBin, fromContainer, fromGood, 
          toLocation, toBin, toContainer, toGood, serialNumber, newStatus, expectedDate, userName, fulfillDate, genTimeBombs);
rw('Fulfilled ' + quantity + ' items.');

rw('fccl.ret_id_num =' + fccl.ret_id_num);
rw('fccl.string =' + fccl.ret_string);


