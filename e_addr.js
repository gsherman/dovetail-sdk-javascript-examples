
var FIRST_NAME = 'Gary2'
var LAST_NAME = 'Sherman';
var PHONE = '512-610-5466';
var EMAIL = 'gsherman@gmail.com';
var EMAIL2 = 'gary@garysherman.com';

function AddAlternateEmail(contactObjid,email){
	var eAddr = FCSession.CreateGeneric('e_addr'); 
	eAddr.BulkName = "AddAlternateEmail";
	eAddr.AddNew();
	eAddr('e_num') = email;
	eAddr('e_type') = 1; //1 = email
	eAddr('useage') = 'Alternate Email';
	eAddr.RelateById(contactObjid,'eaddr2contact');
	eAddr.Update();
	eAddr.CloseGeneric();
	eAddr = null;
}

function AddPrimaryEmail(contactObjid,email){
	var eAddr = FCSession.CreateGeneric('e_addr'); 
	eAddr.BulkName = "AddAlternateEmail";
	eAddr.AddNew();
	eAddr('e_num') = email;
	eAddr('e_type') = 1; //1 = email
	eAddr('useage') = 'Primary';
	eAddr.RelateById(contactObjid,'eaddr2contact');
	eAddr.Update();
	eAddr.CloseGeneric();
	eAddr = null;
}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var contact = FCSession.CreateGeneric('contact'); 
contact.AppendFilter('first_name', '=', FIRST_NAME);
contact.AppendFilter('last_name', '=', LAST_NAME);
contact.AppendFilter('phone', '=', PHONE);
contact.Query();

if (contact.Count() < 1){
	WScript.Echo('Unable to find contact: ' + FIRST_NAME + ' ' + LAST_NAME + ' @' + PHONE);
	WScript.Quit();
}

//AddAlternateEmail(contact.Id,EMAIL);
//AddAlternateEmail(contact.Id,EMAIL2);

AddPrimaryEmail(contact.Id,'gsherman@dovetailsoftware.com');


