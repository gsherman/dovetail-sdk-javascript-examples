function echo(foo){
	WScript.Echo(foo);
}
function AddViews(solutionObjid,contactObjid, when){
	var actEntry = FCSession.CreateGeneric("act_entry")
	actEntry.AddNew();
	actEntry("act_code") = 94111;
	//actEntry("entry_time") = -999;
	actEntry("entry_time") = when;
	actEntry("addnl_info") =  "Viewed in SelfService";
	actEntry.RelateByID(FCSession.Item("user.id"), "act_entry2user");	
	actEntry.RelateByID(contactObjid, "act_entry2contact");	  
	actEntry.RelateByID(solutionObjid, "act_entry2probdesc");	  
	actEntry.RelateByID(FCApp.GetGbstElmRankObjid("Activity Name", 94111), "entry_name2gbst_elm");
	actEntry.Update();
}

function AddRating(solutionObjid,contactObjid, when, rating,isHelpful){
	var actEntry = FCSession.CreateGeneric("act_entry")
	actEntry.AddNew();
	actEntry("act_code") = 94112;
	actEntry("entry_time") = when;
	actEntry("addnl_info") =  "Rated in SelfService";
	actEntry("dev") = rating;
	actEntry("removed") = isHelpful;
	actEntry.RelateByID(FCSession.Item("user.id"), "act_entry2user");	
	actEntry.RelateByID(contactObjid, "act_entry2contact");	  
	actEntry.RelateByID(solutionObjid, "act_entry2probdesc");	  
	actEntry.RelateByID(FCApp.GetGbstElmRankObjid("Activity Name", 94112), "entry_name2gbst_elm");
	actEntry.Update();
}

function getRandomDate(from, to) {
    if (!from) {
        from = new Date(1900, 0, 1).getTime();
    } else {
        from = from.getTime();
    }
    if (!to) {
        to = new Date(2100, 0, 1).getTime();
    } else {
        to = to.getTime();
    }
    return isoFormatDate(new Date(from + Math.random() * (to - from)));
}

function isoFormatDate(date) {
   return ("000" + date.getFullYear()).slice(-4) +
      "-" + ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" + ("0" + date.getDate()).slice(-2) +
      " " + ("0" + date.getHours()).slice(-2) +
      ":" + ("0" + date.getMinutes()).slice(-2) +
      ":" + ("0" + date.getSeconds()).slice(-2); // +
      "." + ("00" + date.getMilliseconds()).slice(-3); // +
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

//start of main processing

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

//find cases created this week in selfservice
//for each case
// get the contact, site, primary_use
// look for any relevant +/- 1 hour of case creation
//   login activities
//   searches
//   viewed solutions
//   solution comments

var selfserviceUserObjid = 268435561;
var startDate = "2/22/2016";
var numSearchedBeforeCreatingCase = 0;
var numSearchedBeforeCreatingCaseHR = 0;
var numHR = 0;

function AddToHistory(what, when, notes,notes2){
   boHistory.AddNew();
   boHistory("action_type") = what;
   boHistory("creation_time") = when;
   boHistory("notes") = notes;
   boHistory("internal") = notes2;
}

var cases = FCSession.CreateGeneric("case");
cases.AppendFilter("case_originator2user","=", selfserviceUserObjid);
cases.AppendFilter("creation_time",">=", startDate);
cases.AppendFilter("title", "not like", "Register for SelfService%")
var site = FCSession.CreateGeneric("site");
site.TraverseFromParent(cases, "case_reporter2site");
var contact = FCSession.CreateGeneric("contact");
contact.TraverseFromParent(cases, "case_reporter2contact");
cases.Query();

while (!cases.EOF){

	var boHistory = FCSession.CreateGeneric("phone_log");
	boHistory.BulkName = "history";

	var created = isoFormatDate(new Date(cases("creation_time")));
	var caseId = cases("id_number");
	var siteName = site("name");
	var contactName = contact("first_name") + " " + contact("last_name");
	var contactObjid = contact.Id - 0;
	var primaryUse = site("appl_type");
	if (primaryUse == "Dovetail CRM"){primaryUse = "HR";}
	echo()
	//echo("case " + caseId + " created at " + created + " by " + contactName + " at " + siteName + " (" + primaryUse + ")")
	//echo(cases("title"))

	var notes = "case " + caseId + " by " + contactName + " at " + siteName + " (" + primaryUse + ")";
	notes+="\r\n   " + cases("title");

	AddToHistory("case created", created, notes,primaryUse)

	var startTime = isoFormatDate(new Date(cases("creation_time")).addHours(-1));
	var endTime = isoFormatDate(new Date(cases("creation_time")).addHours(1));

	GetActivities(contactObjid, startTime, endTime);

   // Get a ref to the boHistory underlying recordset
   var rsHist = boHistory.records;
   //Sort the History Set by Date
   rsHist.Sort = "creation_time ASC";
   var space = " ";

 	var searchedBeforeCreatingCase = false;
 	var foundCaseCreateActivity = false;
	

   while(!rsHist.EOF) {
   	
   	if (rsHist("action_type") == "search for" && foundCaseCreateActivity == false)searchedBeforeCreatingCase = true;
	if (rsHist("action_type") == "case created") foundCaseCreateActivity = true;

    echo(isoFormatDate(new Date(rsHist("creation_time"))) + ": " + rsHist("action_type") + " - " + rsHist("notes"));
    rsHist.MoveNext();
   }

	if(primaryUse=="HR") numHR++;
   	if (searchedBeforeCreatingCase){
   		numSearchedBeforeCreatingCase++;
   		if(primaryUse=="HR") numSearchedBeforeCreatingCaseHR++;
   	}

   rsHist = null;
   boHistory.CloseGeneric();
   boHistory = null;

	cases.MoveNext();
}



var numCases = cases.Count();

echo()
echo("----------------------------")

echo ("# of cases: " + numCases);
var percent = Math.round((numSearchedBeforeCreatingCase / numCases) * 100);
echo("# numSearchedBeforeCreatingCase: " + numSearchedBeforeCreatingCase + " (" + percent + "% of total cases)" )

echo();
echo ("# of HR cases: " + numHR);
percent = Math.round((numSearchedBeforeCreatingCaseHR / numHR) * 100);
echo("# numSearchedBeforeCreatingCaseHR: " + numSearchedBeforeCreatingCaseHR + " (" + percent + "% of HR cases)" )

echo();
var numClarify = numCases - numHR;
var numSearchedBeforeCreatingCaseClarify = numSearchedBeforeCreatingCase - numSearchedBeforeCreatingCaseHR;
echo ("# of Clarify cases: " + numClarify);
percent = Math.round((numSearchedBeforeCreatingCaseClarify / numClarify) * 100);
echo("# numSearchedBeforeCreatingCaseClarify: " + numSearchedBeforeCreatingCaseClarify + " (" + percent + "% of Clarify cases)" )


FCSession.Logout();



function GetActivities(contactObjid, startTime, endTime){

	var activities = FCSession.CreateGeneric("act_entry");
	activities.AppendFilter("act_entry2contact","=", contactObjid);
	activities.AppendFilter("entry_time", ">=", startTime);
	activities.AppendFilter("entry_time", "<=", endTime);
	activities.AppendFilter("act_code", "is in", "94004");
	activities.AppendSort("entry_time", "asc");
	activities.BulkName = "GetActivities";

	var searches = FCSession.CreateGeneric("dt_search");
	searches.AppendFilter("dt_search2contact","=", contactObjid);
	searches.AppendFilter("search_time", ">=", startTime);
	searches.AppendFilter("search_time", "<=", endTime);
	searches.BulkName = "GetActivities";

	var views = FCSession.CreateGeneric("dt_web_log");
	views.AppendFilter("dt_web_log2contact","=", contactObjid);
	views.AppendFilter("modify_stmp", ">=", startTime);
	views.AppendFilter("modify_stmp", "<=", endTime);
	views.BulkName = "GetActivities";

	activities.Bulk.Query();
	var space = " ";
	var indent = "|---"
	while (!activities.EOF){
		var actTime= isoFormatDate(new Date(activities("entry_time")));
		var actCode = activities("act_code")
		var gbstElmObjid = activities("entry_name2gbst_elm");
		var activity = FCApp.GetGbstElmByID("Activity Name", gbstElmObjid);
		var additionalInfo = activities("addnl_info")
		//echo(indent + activity + space + actTime  + space + additionalInfo + space )

		AddToHistory(activity, actTime, additionalInfo)

		activities.MoveNext();
	}

	while (!searches.EOF){
		var actTime= isoFormatDate(new Date(searches("search_time")));
		var domain = searches("domain")
		var totalResults = searches("results") + searches("blog_results") + searches("docs_results");
		var domain = searches("domain")
		var terms = searches("search_terms")
		var activity = "search for";
		var notes = domain + " using terms: '" + terms + "' found " + totalResults + " results. ";
		//echo(indent + activity + space + domain + " using terms: '" + terms + "' found " + totalResults + " results. "  + actTime)
		AddToHistory(activity, actTime, notes)

		searches.MoveNext();

	}

	while (!views.EOF){
		var actTime= isoFormatDate(new Date(views("modify_stmp")));
		var path = views("path") + '';
		var activity = "view solution";
		//parse the solution from the path
		var solutionId = path.substr(path.lastIndexOf('/') + 1);

		//get the solution title
		var solutionTitle = GetSolutionTitle(solutionId);
		//echo(indent + activity + space + solutionId + space +  actTime)
		//echo(space + space + indent  + solutionTitle)
		
		var notes = solutionId
		notes+="\r\n   " + solutionTitle;
		AddToHistory(activity, actTime, notes)

		views.MoveNext();
	}

}

function GetSolutionTitle(id){
	var solution = FCSession.CreateGeneric("probdesc");
	solution.AppendFilter("id_number","=", id);
	solution.BulkName = "GetSolutionTitle";
	solution.Query();
	if (solution.Count() == 0) return "Solution id " + id + " Not found";
	var title = solution("title") + '';	
	solution.CloseGeneric();
	return title;
}