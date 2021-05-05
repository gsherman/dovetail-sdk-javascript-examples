function Echo(s){WScript.Echo(s);}

function CreateContact(first,last,phone,siteId,email,role){
	var fax="";
	var mail_stop="";
	var title="";
	var hours="";
	var salutation="";
	
	var contact = FCSession.CreateGeneric('rol_contct');
	contact.AppendFilter('first_name','=',first);
	contact.AppendFilter('last_name','=',last);
	contact.AppendFilter('phone','=',phone);
	contact.Query();
	if (contact.Count() > 0){
		Echo("Contact Already Exists: " + first + " " + last + " @ " + phone);
		return contact.id;
	}
	
	var result = fcinter.create_contact(first, last, phone, siteId, role, fax, email, mail_stop, title,hours, salutation, "",0,"",0,"","","","","","");                                   
	Echo("Created Contact: " + first + " " + last + " @" + phone);
	return fcinter.ret_objid;                                    
}


///////////////////////////////////
//  Start of Main Processing
///////////////////////////////////                                   

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var fcinter = WScript.CreateObject('FCCompatToolkit.INTER');
fcinter.Initialize(FCApp,FCSession);

var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
var val_list = WScript.CreateObject('FCFLCompat.FCLIST');


var contactRole=""; //use default contact role
var siteId = "14"
var contactObjid = CreateContact("Mary","Miller","877-510-5466",siteId,"mmiller@example.com",contactRole);

