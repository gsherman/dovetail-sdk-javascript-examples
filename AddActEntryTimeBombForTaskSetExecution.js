
function GetCaseObjid(caseId){

	var kase = FCSession.CreateGeneric('case');
	kase.AppendFilter('id_number','=',caseId)
	kase.Query();
	return kase.Id;
}
function AddActEntryAndTimeBomb(caseObjid, TaskSetName){

	var actEntry = FCSession.CreateGeneric("act_entry")
	actEntry.AddNew();
	actEntry("act_code") = 94001;
	actEntry("entry_time") = -999;
	actEntry("addnl_info") =  TaskSetName;
	actEntry.RelateByID(FCSession.Item("user.id"), "act_entry2user");	
	actEntry.RelateRecords(caseObjid, "act_entry2case");	  
	actEntry.RelateByID(FCApp.GetGbstElmRankObjid("Activity Name", 94001), "entry_name2gbst_elm");
	actEntry.Update();

	var timeBomb = FCSession.CreateGeneric('time_bomb');
	timeBomb.AddNew();
	timeBomb("escalate_time") = -999;
	timeBomb("end_time") = -999;
	if(FCApp.schema_rev >= 55){ //55 = clarify_10
		timeBomb("creation_time") = -999;
	}
	timeBomb("focus_type") = 0;
	timeBomb("flags") = 65863682; // (1005*65536) + 2 = 65863682
	timeBomb.RelateById(FCSession.Item("employee.id"),"cmit_creator2employee");
	timeBomb("focus_lowid")= caseObjid;
	timeBomb("time_period")= actEntry.Id;
	timeBomb.Update();

	return 0;
}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

var TaskSetName = "Commonwealth-Cashiering";
var caseId = "613";

var caseObjid = GetCaseObjid(caseId)
var result = AddActEntryAndTimeBomb(caseObjid,TaskSetName);
WScript.Echo("result = " + result);

FCSession.Logout();
