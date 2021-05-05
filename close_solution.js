
function CloseSolution(id_number, x_status){
	var solution = FCSession.CreateGeneric("probdesc");
	solution.AppendFilter("id_number","=",id_number);
	var condition = FCSession.CreateGeneric("condition");
	condition.TraverseFromParent(solution, "probdesc2condition");
	solution.Query();
	
	condition("condition") = 4;
	condition("title") = "Closed"
	solution("modify_stmp") = -999;
	solution("x_status") = x_status;
	solution.UnRelateRecordFromAll("probdesc_q2queue");	
	solution.UnRelateRecordFromAll("probdesc_wip2wipbin");	

  var actEntry = FCSession.CreateGeneric("act_entry")
  actEntry.AddNew();
  actEntry("act_code") = 92020;
  actEntry("entry_time") = -999;
  actEntry("addnl_info") =  "Status = " + x_status;
	actEntry.RelateByID(FCSession.Item("user.id"), "act_entry2user");	
  actEntry.RelateRecords(solution, "act_entry2probdesc");	  
	actEntry.RelateByID(FCApp.GetGbstElmRankObjid("Activity Name", 92020), "entry_name2gbst_elm");

	solution.Bulk.UpdateAll();
	return 0;
}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

var result = CloseSolution("41", "Retired");
WScript.Echo("result = " + result);

FCSession.Logout();
