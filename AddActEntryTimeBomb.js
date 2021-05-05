
function GetSolutionObjid(solutionId){
	var solution = FCSession.CreateGeneric('probdesc');
	solution.AppendFilter('id_number','=',solutionId)
	solution.Query();
	return solution.Id;
}

function AddData(solutionObjid,contactObjid){
	var notes = FCSession.CreateGeneric("notes_log")
	notes.AddNew();
	notes("action_type") = "Comment";
	notes("creation_time") = -999;
	notes("description") = "This is awesome!";
	notes("x_rating") = 4;	
	notes.Update();

	var actEntry = FCSession.CreateGeneric("act_entry")
	actEntry.AddNew();
	actEntry("act_code") = 1700;
	actEntry("entry_time") = -999;

	//todo - limit to maxlength of addnl_info field
	actEntry("addnl_info") =  notes("description");
	
	actEntry.RelateByID(FCSession.Item("user.id"), "act_entry2user");		
	actEntry.RelateByID(notes.Id, "act_entry2notes_log");	  
	actEntry.RelateByID(contactObjid, "act_entry2contact");	  	
	actEntry.RelateByID(solutionObjid, "act_entry2probdesc");	  
	actEntry.RelateByID(FCApp.GetGbstElmRankObjid("Activity Name", 1700), "entry_name2gbst_elm");
	actEntry.Update();

	var timeBomb = FCSession.CreateGeneric('time_bomb');
	timeBomb.AddNew();
	timeBomb("escalate_time") = -999;
	timeBomb("end_time") = -999;
	if(FCApp.schema_rev >= 55){ //55 = clarify_10
		timeBomb("creation_time") = -999;
	}
	timeBomb("focus_type") = 1; //1=probdesc
	timeBomb("flags") = 1179650; // baseline log notes flag
	timeBomb.RelateById(FCSession.Item("employee.id"),"cmit_creator2employee");
	timeBomb("focus_lowid")= solutionObjid;
	timeBomb("time_period")= actEntry.Id;
	timeBomb.Update();

	return 0;
}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

var solutionId = "3";
var contactObjid = 268435458;
var solutionObjid = GetSolutionObjid(solutionId)
var result = AddData(solutionObjid,contactObjid);
WScript.Echo("result = " + result);

FCSession.Logout();
