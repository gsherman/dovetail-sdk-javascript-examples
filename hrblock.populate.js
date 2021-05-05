//////////////////////////////////////////////////////////////////////
//  Populate a bunch of data into a Dovetail system
//////////////////////////////////////////////////////////////////////


function Echo(foo){WScript.Echo(foo);}
function EchoStatus(foo){WScript.Echo(foo);}

function CreateCase(first,last,phone,siteId,title,phoneNotes,queue){
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
  
  EchoStatus("Created Case: " + fccs.ret_id_num);
  return fccs.ret_id_num;
}

function LogNote(caseId, notes, loginName){
	var create_date = '';
	var phone_end_date = '';
	var gen_time_bombs = true;
	var actionType = '';
	var internalNotes = '';
	var new_status = '';
	var commit_title = '';
	var commit_notes = '';
	var commit_due_date = '';
	var commit_warning = 0;
	var commit_to = false;
	
  var result = fccs.log_case_note(
  	caseId, actionType, notes, internalNotes, create_date, loginName, new_status, 
  	commit_title, commit_notes, commit_due_date, commit_warning, commit_to, 
    true, "",0,"",0,"","","","","","")                            
 
  EchoStatus("Loged Notes to Case: " + caseId);
  return fccs.ret_objid;
}

function LogCommitment(caseId, commit_title, commit_due_date, notes, loginName){
	var create_date = '';
	var phone_end_date = '';
	var gen_time_bombs = true;
	var actionType = '';
	var internalNotes = '';
	var new_status = '';
	var commit_notes = '';
	var commit_warning = 0;
	var commit_to = false;

  var result = fccs.log_case_commit(caseId, commit_title,actionType, create_date,commit_due_date,
  	commit_warning,commit_to,"","","",notes, loginName,  
    true, true,"",0,"",0,"","","","","","")                            
 
  EchoStatus("Loged Commitment to Case: " + caseId);
  return fccs.ret_objid;
}


function CreateAddress(address1, address2, city, state, zip, country, timeZone){
	var result = fcinter.create_address(address1, address2, city, state, true, zip, country, timeZone, "",0,"",0,"","","","","","");                           
	EchoStatus("Created Address: " + address1);
	return fcinter.ret_objid;
}


function CreateSite(siteName, addressObjid, customProps){
  var SiteObjid = 0;
  var SiteId = '';
  var SiteName = siteName;
  var SiteStatus = 'ACTIVE';
  var SiteType = 'CUST';
  var SitePhone = '';
  var SiteFax = '';
  var SiteSpecConsid = '';
  var SiteNotes = '';
  var BusOrgObjid = 0;
  var BusOrgId = '';
  var Region = '';
  var District = '';
  var IndustryType = '';
  var PrimaryUse = '';
  var PrimAddrObjid = addressObjid;
  var ShipAddrObjid = addressObjid;
  var BillAddrObjid = addressObjid;
  var OrigPrimAddrObjid = 0;
  var OrigShipAddrObjid = 0;
  var OrigBillAddrObjid = 0;
  var ParentSiteId = '';
  var SupportOfficeSiteId = '';
  var PrimarySupportEmpObjid = 0;
  var SecondarySupportEmpObjid = 0;	


	SiteId =  customProps.SiteId;
	ParentSiteId =  customProps.ParentSiteId;
	SiteType =  customProps.SiteType;
	
	var site = FCSession.CreateGeneric('site');
	site.AppendFilter('name','=',siteName);
	site.Query();
	if (site.Count() > 0){
		EchoStatus("Site Already Exists: " + siteName);
		return site("site_id") + '';
	}

	if (new String(SiteId).length > 0){
		var site2 = FCSession.CreateGeneric('site');
		site2.AppendFilter('site_id','=',SiteId);
		site2.Query();
		if (site2.Count() > 0){
			EchoStatus("Site Id Already Exists: " + SiteId);
			return site2("Site_id") + '';
		}
	}
		
	var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
	var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
	var val_list = WScript.CreateObject('FCFLCompat.FCLIST');

  fld_list.AppendItem("phone");
  val_list.AppendItem(customProps.phone);
  type_list.AppendItem("String");

  fld_list.AppendItem("x_division_code");
  val_list.AppendItem(customProps.x_division_code);
  type_list.AppendItem("String");

  fld_list.AppendItem("x_mgr_first_name");
  val_list.AppendItem(customProps.x_division_code);
  type_list.AppendItem("String");

  fld_list.AppendItem("x_mgr_last_name");
  val_list.AppendItem(customProps.x_mgr_last_name);
  type_list.AppendItem("String");

  fld_list.AppendItem("x_supt_mgr_first_name");
  val_list.AppendItem(customProps.x_supt_mgr_first_name);
  type_list.AppendItem("String");

  fld_list.AppendItem("x_supt_mgr_last_name");
  val_list.AppendItem(customProps.x_supt_mgr_last_name);
  type_list.AppendItem("String");
  
    fld_list.AppendItem("x_dir_first_name");
  val_list.AppendItem(customProps.x_dir_first_name);
  type_list.AppendItem("String");

  fld_list.AppendItem("x_dir_last_name");
  val_list.AppendItem(customProps.x_dir_last_name);
  type_list.AppendItem("String");
  
      
  fld_list.AppendItem("phone");
  val_list.AppendItem(customProps.phone);
  type_list.AppendItem("String");
    
  fld_list.AppendItem("dev");
  val_list.AppendItem("100");
  type_list.AppendItem("Integer");
  		  
	var result = fcinter.create_update_site_list(
                SiteObjid,SiteId,SiteName,SiteType,BusOrgId,SiteStatus,
                Region,District,IndustryType,PrimaryUse,
                PrimAddrObjid,ShipAddrObjid,BillAddrObjid,ParentSiteId,
                SupportOfficeSiteId,PrimarySupportEmpObjid,SecondarySupportEmpObjid,
                fld_list,type_list,val_list);
	EchoStatus("Created Site: " + siteName);
	return fcinter.ret_id_num;
}

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
		EchoStatus("Contact Already Exists: " + first + " " + last + " @ " + phone);
		return contact.id;
	}
	
	var result = fcinter.create_contact(first, last, phone, siteId, role, fax, email, mail_stop, title,hours, salutation, "",0,"",0,"","","","","","");                                   
	EchoStatus("Created Contact: " + first + " " + last + " @" + phone);
	return fcinter.ret_objid;                                    
}
                     
function CreateQueue(queueName){
	var is_personal= false;
	var description=queueName;
	var allowBug = 1;
	var allowCase=1;
	var allowContract=1;
	var allowDialogue=1;
	var allowDemandDetail=1;
	var allowJob=1;
	var allowOpportunity=1;
	var allowSolution=1;
	var allowSubcase=1;
	var allowTask=1;
	var superervisorLoginName="";
	var newQueueTitle="";
	
	var queue = FCSession.CreateGeneric('queue');
	queue.AppendFilter('title','=',queueName);
	queue.Query();
	if (queue.Count() > 0){
		EchoStatus("Queue Already Exists: " + queueName);
		return queue.id;
	}
	
  var result = fcinter.create_update_queue(queueName, is_personal, description, allowBug, allowCase, allowContract, allowDialogue, allowDemandDetail, allowJob,allowOpportunity, allowSolution, allowSubcase, allowTask, superervisorLoginName, newQueueTitle)
	EchoStatus("Created Queue: " + queueName);
	return fcinter.ret_objid;
}

function AddUserToQueue(queueName,loginName){
 fcinter.add_user_to_queue(queueName, loginName, false)
 EchoStatus("Added User " + loginName + " to queue " + queueName);
}

function CreateEmployee(first,last,phone,siteId,email,loginName,strPassword){
	
	var employee = FCSession.CreateGeneric('empl_user');
	employee.AppendFilter('login_name','=',loginName);
	employee.Query();
	if (employee.Count() > 0){
		EchoStatus("Employee Already Exists: " + loginName);
		return employee('user_id');
	}
	
	var strPager="";
	var strOnlinePrivClass="CSR";
	var strOfflinePrivClass="Offline User";
	var strId = "";
	var bIsActive = true;
	var bAllowProxy = true;
	var strStartDate= "";
	var strSupervisor = "";
	var strWorkGroup = "";
	var strWkgrpStartDate = "";
	var strRate = "";
	var bIsSupervisor = false;
	var bIsFE = false;
	var strNormalBizHigh = "";
	var strNormalBizMedium = "";
	var strNormalBizLow = "";
	var strAfterBizHigh = "";
	var strAfterBizMedium = "";
	var strAfterBizLow = "";
	var strWipbin = "";
	var strRC = "";
	var strDefTableSpace = "";
var strTempTableSpace = "";
	
	var result = fcinter.create_employee_list( first,last,loginName,strPassword, 
	siteId,email,phone,strPager,strOnlinePrivClass, 
	strOfflinePrivClass,strId,bIsActive,bAllowProxy,strStartDate, 
	strSupervisor,strWorkGroup,strWkgrpStartDate,strRate, bIsSupervisor,bIsFE, 
	strNormalBizHigh,strNormalBizMedium,strNormalBizLow, 
	strAfterBizHigh,strAfterBizMedium,strAfterBizLow, 
	strWipbin,strRC,strDefTableSpace,strTempTableSpace, 
	fld_list,type_list,val_list); 
	EchoStatus("Created Employee: " + loginName); 
	return fcinter.ret_objid;
		               
}

function CreateSolution(title, description, workaround){
	var result = fcinter.create_soln(title, description, workaround, true, "", "", "", "", true,"",0,"",0,"","","","","","");
	EchoStatus("Created Solution: " + fcinter.ret_id_num); 
	return fcinter.ret_id_num;
}

function CreateTimeExpenseLog(caseId, duration, expenseQuantity, expenseRate, notes, loginName){
	var creation_time = '';
	var lastModified = '';
	var resolution = '';
	var performedBy = loginName;
	var expense_type = ''; 
	var billable = 1;
	var bill_to = '';
	var resolution = '';
	var timeType = '';
	var startTime = '';
	var workCenter = '';
		
	var result = fcfo.create_onsite_log("CASE",caseId, creation_time, lastModified, notes, resolution, loginName, performedBy);
	var onsiteLogObjid = fcfo.ret_objid;
	
	var result = fcfo.create_expense_log(onsiteLogObjid, caseId,creation_time,notes,performedBy, loginName, expense_type, expenseQuantity, expenseRate, billable,bill_to, resolution);  
	
	var result = fcfo.create_time_log(onsiteLogObjid, caseId,creation_time, notes, performedBy, loginName,timeType, startTime, duration, billable, bill_to, workCenter, resolution);
	EchoStatus("Created T & E Log for case: " + caseId); 
}


function UpdateEmployeeName(loginName, firstName, lastName){
	var user = FCSession.CreateGeneric('user');
	user.AppendFilter('login_name','=',loginName);
	var employee = FCSession.CreateGeneric('employee');
	employee.TraverseFromParent(user,"user2employee")
	employee.Query();
	
	employee('first_name') = firstName;
	employee('last_name') = lastName;
	employee.Update();	
}
function AddAttachment(caseId, attachmentTitle, filePath){
	var caseGeneric = FCSession.CreateGeneric('case');
	caseGeneric.AppendFilter('id_number','=',caseId);
	caseGeneric.Query();
	caseObjid = caseGeneric.Id;

	var result = FCSession.AddAttachment(attachmentTitle,filePath,"case",caseId1);

  var addnl_info = "Added Attachment " + attachmentTitle + " with path " + filePath;
  var ActEntryObj = FCSession.CreateGeneric('act_entry');
  var UserObjid = FCSession.Item("user.id");
  var RelName = 'act_entry2case';
  var gbst_elm_Objid = FCApp.GetGbstElmRankObjid("Activity Name", 8900)

  ActEntryObj.AddNew();
  ActEntryObj("act_code") = 8900;
  ActEntryObj("entry_time") = FCSession.GetCurrentDate();

  ActEntryObj("addnl_info") = addnl_info;
  ActEntryObj.RelateById(UserObjid, "act_entry2user");
  ActEntryObj.RelateById(caseObjid, RelName);
  ActEntryObj.RelateById(gbst_elm_Objid, "entry_name2gbst_elm");
  ActEntryObj.Update();
  ActEntryObj.CloseGeneric();
  ActEntryObj = null;
  
  EchoStatus("Created attachment for case: " + caseId); 
}  
	





///////////////////////////////////
//  Start of Main Processing
///////////////////////////////////                                   

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var fccs = WScript.CreateObject('FCCompatToolkit.CS');
var fcinter = WScript.CreateObject('FCCompatToolkit.INTER');
var fcfo = WScript.CreateObject('FCCompatToolkit.FO');
fccs.Initialize(FCApp,FCSession);
fcinter.Initialize(FCApp,FCSession);
fcfo.Initialize(FCApp,FCSession);

var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
var val_list = WScript.CreateObject('FCFLCompat.FCLIST');


///////////////////////////////////
//  Create Queues 
///////////////////////////////////

CreateQueue("Franchise Support")


///////////////////////////////////
//  Create Addresses 
///////////////////////////////////

var address1 = "674 Massachusetts Avenue";
var address2 = "";
var city="Cambridge";
var state = "MA";
var zip = "02139";
var country="USA";
var timeZone="eST";
var addressObjid1 = CreateAddress(address1, address2, city, state, zip, country, timeZone);

var address1 = "151 Tremont Street";
var address2 = "";
var city="Boston";
var state = "MA";
var zip = "02111";
var country="USA";
var timeZone="EST";
var addressObjid2 = CreateAddress(address1, address2, city, state, zip, country, timeZone);

var address1 = "336 Westford Street";
var address2 = "";
var city="Lowell";
var state = "MA";
var zip = "01851";
var country="USA";
var timeZone="EST";
var addressObjid3 = CreateAddress(address1, address2, city, state, zip, country, timeZone);

var address1 = "1 Computer Way";
var address2 = "";
var city="Round Rock";
var state = "TX";
var zip = "78799";
var country="USA";
var timeZone="CST";
var addressObjid4 = CreateAddress(address1, address2, city, state, zip, country, timeZone);

///////////////////////////////////
//  Create Sites 
///////////////////////////////////

var customProps= {};
customProps.phone = "";
customProps.SiteId = "";
customProps.SiteType = "INTR";
customProps.ParentSiteId = "";
customProps.x_division_code = "01";
customProps.x_mgr_first_name = "";
customProps.x_mgr_last_name = "";
customProps.x_supt_mgr_first_name = "";
customProps.x_supt_mgr_last_name = "";
customProps.x_dir_first_name = "";
customProps.x_dir_last_name = "";

//territories
var Territory1_SiteId = CreateSite("East Coast Territory", addressObjid1, customProps);

//regions
//note: purposely mixing these two fields:
customProps.x_mgr_first_name = "FRD First Name";
customProps.x_dir_last_name = "FRD Last Name";
customProps.ParentSiteId = Territory1_SiteId;
var Region1_SiteId = CreateSite("New England Region", addressObjid1, customProps);

//districts
customProps.x_dir_last_name = "";
customProps.x_mgr_first_name = "Franchise Coordinator First Name";
customProps.x_mgr_first_name = "Franchise Coordinator First Name";
customProps.ParentSiteId = Region1_SiteId;
var District1_SiteId = CreateSite("Eastern Massachusetts", addressObjid1, customProps);


//franchises
customProps.x_mgr_first_name = "Franchisee First Name";
customProps.x_mgr_last_name = "Franchisee Last Name";
customProps.x_supt_mgr_first_name = "FSM First Name";
customProps.x_supt_mgr_last_name = "FSM First Name";
customProps.ParentSiteId = District1_SiteId;

customProps.SiteId = "0012345";
var siteId = CreateSite("Cambridge, MA", addressObjid1, customProps);
customProps.SiteId = "0012346";
var siteId2 = CreateSite("Boston, MA", addressObjid2, customProps);
customProps.SiteId = "0012347";
var siteId3 = CreateSite("Lowell, MA", addressObjid3, customProps);

//franchise without a related contact
customProps.SiteId = "0012348";
var siteId4 = CreateSite("Belmont, MA", addressObjid3, customProps);


///////////////////////////////////
//  Create Contacts 
///////////////////////////////////
 
var contactRole="";
var contactObjid1 = CreateContact("Cambridge 0012345","MA","617-510-5466",siteId,"",contactRole);
var contactObjid2 = CreateContact("Boston 0012346","MA","617-899-0077",siteId2,"",contactRole);
var contactObjid3 = CreateContact("Lowell 0012347","MA","617-894-9777",siteId3,"",contactRole);


///////////////////////////////////
//  Create Employees 
///////////////////////////////////
/*
var first="Annie"; 
var last="Agent"; 
var phone="888-610-5466"; 
var loginName="annie";
var strPassword=loginName;
var email=loginName + "@company.com"; 
CreateEmployee(first,last,phone,siteId,email,loginName,strPassword);

var first="Hank"; 
var last="HelpDeskAgent"; 
var phone="888-610-5466"; 
var loginName="hank";
var strPassword=loginName;
var email=loginName + "@company.com"; 
CreateEmployee(first,last,phone,siteId,email,loginName,strPassword);

var first="Steve"; 
var last="Smithwick"; 
var phone="888-610-5466"; 
var loginName="steve";
var strPassword=loginName;
var email=loginName + "@company.com"; 
CreateEmployee(first,last,phone,siteId,email,loginName,strPassword);
*/

///////////////////////////////////
//  Add User to Queues
///////////////////////////////////

/*
AddUserToQueue("Hardware","sa");
AddUserToQueue("Hardware","steve");
AddUserToQueue("Hardware","hank");
AddUserToQueue("Hardware","annie");

AddUserToQueue("Software","sa");
AddUserToQueue("Software","steve");
AddUserToQueue("Software","hank");
AddUserToQueue("Software","annie");
*/



///////////////////////////////////
//  Create Solutions 
///////////////////////////////////

/*
CreateSolution("this is the title", "this is the description", "this is the workaround");
CreateSolution("I can't connect to the VPN Server with my VPN Client", "Users are unable to connect to WinRoute using the VPN Client.", "For more information view the Microsoft Knowledge Base: 314067 ( http://support.microsoft.com/kb/314067/)");
*/

///////////////////////////////////
//  Create Cases 
///////////////////////////////////

/*
var queue="Software";
var caseId1 = CreateCase("Mark","Miller","877-510-5466",siteId,"need help with VPN connection","Unable to connect via VPN",queue);
var caseId2 = CreateCase("Janet","Berry","617-510-7654",siteId3,"external keyboard is not working","my laptop keybooard works, but my external one doesn't","Hardware");
var caseId3 = CreateCase("James","Miller","877-510-7654",siteId2,"blue screen of death upon login","When logging in, I get the BSOD.","Support");
*/

///////////////////////////////////
//  Case Workflow Operations
///////////////////////////////////

/*
var workFlowDate = "";
var wipbinName = "";
var loginName = "";
var assignToLoginName = "annie";
var queueName = "Support";

fccs.accept_case(caseId1,workFlowDate,wipbinName,loginName,true);
fccs.dispatch_case(caseId1,queueName,workFlowDate,loginName,true); 
fccs.yank_case(caseId1,wipbinName,workFlowDate,loginName,true);	 	 
fccs.assign_case(caseId1,assignToLoginName,wipbinName,workFlowDate,loginName,true);	 

fccs.accept_case(caseId2,workFlowDate,wipbinName,loginName,true);
fccs.dispatch_case(caseId2,queueName,workFlowDate,loginName,true); 
fccs.yank_case(caseId2,wipbinName,workFlowDate,loginName,true);	 	 
fccs.assign_case(caseId2,assignToLoginName,wipbinName,workFlowDate,loginName,true);	

fccs.accept_case(caseId3,workFlowDate,wipbinName,loginName,true);
fccs.dispatch_case(caseId3,queueName,workFlowDate,loginName,true); 
fccs.yank_case(caseId3,wipbinName,workFlowDate,loginName,true);	 	 
fccs.assign_case(caseId3,assignToLoginName,wipbinName,workFlowDate,loginName,true);	
*/

///////////////////////////////////
//  Log Notes
///////////////////////////////////

/*	
LogNote(caseId1, "Customer is on vacation for the rest of the week, so we'll resume working this case on Monday.", "annie");
LogNote(caseId1, "Customer is running Windows XP SP2.", "hank");

LogNote(caseId2, "I'm thinking there's a problem with the IIS registry settings.", "hank");
LogNote(caseId3, "This would be easy if we knew set-based algebra.", "annie");

LogNote(caseId3, "Wondering if there's an issue with the BIOS settings.", "steve");
LogNote(caseId3, "Hey Steve - the BIOS settings shouldn't matter here, although it may be a boot driver config issue.", "annie");
*/

///////////////////////////////////
//  Log Commitments
///////////////////////////////////

/*
var notes="Customer is on vacation for the rest of the week, so we'll resume working this case on Monday.";
LogCommitment(caseId1, "call back customer on Monday", "1/1/2020", notes, "annie");
LogCommitment(caseId1, "send customer latest driver update", "12/15/2020", "", "annie");
*/

///////////////////////////////////
//  Log Time and Expense
///////////////////////////////////

/*
var durationInSeconds = 3600; 
var expenseQuantity = 4;
var expenseRate = 100;
var notes="t&e notes go here";
var loginName = "annie";
CreateTimeExpenseLog(caseId1, durationInSeconds, expenseQuantity, expenseRate, notes, loginName);

var durationInSeconds = 7260; 
var expenseQuantity = 2.5;
var expenseRate = 250;
var notes="onsite repair of computer";
var loginName = "hank";
CreateTimeExpenseLog(caseId1, durationInSeconds, expenseQuantity, expenseRate, notes, loginName);
*/

///////////////////////////////////
//  Update Employee Name
///////////////////////////////////
UpdateEmployeeName("sa", "System", "Administrator");

///////////////////////////////////
//  Create Attachments
///////////////////////////////////

/*
var attachmentTitle="error screenshot";
var filePath = "\\\\server\\directory\\file.ext";
AddAttachment(caseId1,attachmentTitle,filePath);

var attachmentTitle="dump of BIOS settings";
var filePath = "\\\\server\\directory\\bios_settings.ext";
AddAttachment(caseId2,attachmentTitle,filePath);
*/


                                  