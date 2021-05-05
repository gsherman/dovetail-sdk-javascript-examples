
function ReopenSolution(id_number, x_status){
	var solution = FCSession.CreateGeneric("probdesc");
	solution.AppendFilter("id_number","=",id_number);
	var condition = FCSession.CreateGeneric("condition");
	condition.TraverseFromParent(solution, "probdesc2condition");
	solution.Query();
	
	userId = FCSession.Item("user.id");
	wipbinId = FCSession.Item("wipbin.id");

	condition("condition") = 2;
	condition("title") = "Open"
	condition("wipbin_time") = -999;
	solution("modify_stmp") = -999;
	solution("x_status") = x_status;	
	solution.RelateByID(wipbinId, "probdesc_wip2wipbin");	
	solution.RelateByID(userId, "probdesc_owner2user");	

  var actEntry = FCSession.CreateGeneric("act_entry")
  actEntry.AddNew();
  actEntry("act_code") = 92021;
  actEntry("entry_time") = -999;
  actEntry("addnl_info") =  "Status = " + x_status;
	actEntry.RelateByID(FCSession.Item("user.id"), "act_entry2user");	
  actEntry.RelateRecords(solution, "act_entry2probdesc");	  
	actEntry.RelateByID(FCApp.GetGbstElmRankObjid("Activity Name", 92021), "entry_name2gbst_elm");

	solution.Bulk.UpdateAll();
	return 0;
}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

var result = ReopenSolution("41", "Approved");
WScript.Echo("result = " + result);

FCSession.Logout();
