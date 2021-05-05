//todo:
//documentation
//include fc.env file
//logging config file

function echo(s){
	WScript.Echo(s)
}

function GetWipbins(userObjid){
	//returns an object keyed by wipbin.objid
	var wipbins = FCSession.CreateGeneric('wipbin'); 
	wipbins.BulkName = "GetWipbins" + userObjid;
	wipbins.AppendFilter('wipbin_owner2user', '=', userObjid);
	wipbins.Query();	

	var wipbinsObject={};
	wipbins.MoveFirst();
	while (!wipbins.EOF){
		var key = wipbins.Id - 0;
		var wipbinObjid = wipbins.Id - 0;
		var wipbinTitle = wipbins("title") + "";
		wipbinsObject[key] = {objid: wipbinObjid,title: wipbinTitle};
		wipbins.MoveNext();
	}
	wipbins.CloseGeneric();
	return wipbinsObject;
}

function GetTags(userObjid){
	//returns an object keyed by tag.title
	var tags = FCSession.CreateGeneric('tag'); 
	tags.BulkName = "GetTags" + userObjid;
	tags.AppendFilter('tag2user', '=', userObjid);
	tags.Query();	

	var tagsObject={};
	tags.MoveFirst();
	while (!tags.EOF){
		var key = tags("title") + "";
		var tagObjid = tags.Id - 0;
		var tagTitle=tags("title") + "";
		tagsObject[key] = {objid: tagObjid,title: tagTitle};
		tags.MoveNext();
	}
	tags.CloseGeneric();
	return tagsObject;
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

Date.dateDiff = function(datepart, fromdate, todate) {	
  datepart = datepart.toLowerCase();	
  var diff = todate - fromdate;	
  var divideBy = { w:604800000, 
                   d:86400000, 
                   h:3600000, 
                   n:60000, 
                   s:1000 };	
  
  return Math.floor( diff/divideBy[datepart]);
}

function CreateTag(tagName,userObjid,tagsObject){
	if (!tagsObject[tagName]){
		echo ("--creating tag:" + tagName);
		var tag = FCSession.CreateGeneric('tag'); 
		tag.BulkName = "CreateTag" + userObjid + tagName;	
		tag.AddNew();
		tag("title") = tagName + '';
		tag("tag2user") = userObjid - 0;
		tag.Update();
		var tagObjid = tag.Id - 0;
		tag.CloseGeneric();

		var key = tagName;
		tagsObject[key] = {objid: tagObjid,title: tagName};
		numTags++;
	}
}

function GetOpenCases(userObjid){
	var cases = FCSession.CreateGeneric('wipelm_case'); 
	cases.BulkName = "GetOpenCases" + userObjid;	
	cases.AppendFilter('owner', '=', userObjid);
	cases.Query();	
	return cases;
}

function GetOpenSubcases(userObjid){
	var subcases = FCSession.CreateGeneric('wipelm_subcase'); 
	subcases.BulkName = "GetOpenSubcases" + userObjid;
	subcases.AppendFilter('owner', '=', userObjid);
	subcases.Query();	
	return subcases;
}

function GetOpenSolutions(userObjid){
	var wipbins = FCSession.CreateGeneric("wipbin");
	wipbins.AppendFilter("wipbin_owner2user", "=", userObjid);
	wipbins.BulkName = "GetOpenSolutions" + userObjid;
	var solutions = FCSession.CreateGeneric("probdesc");
	solutions.TraverseFromParent(wipbins, "wipbin2probdesc");
	wipbins.Bulk.Query();	
	return solutions;
}

function AddTagToWorkflowObject(workflowObjectType,workflowObjectObjid,tagObjid){
  var relation = workflowObjectType + "2tag";
  var workflowObject = FCSession.CreateGeneric(workflowObjectType);
  workflowObject.BulkName = "AddTagToWorkflowObject" + workflowObjectType + workflowObjectObjid + tagObjid;
  workflowObject.AddForUpdate(workflowObjectObjid);
  workflowObject.RelateByID(tagObjid, relation);
  workflowObject.Update();  
}

function AddTagToCase(caseObjid,tagObjid){
  AddTagToWorkflowObject("case",caseObjid,tagObjid)
}

function AddTagToSubase(subcaseObjid,tagObjid){
  AddTagToWorkflowObject("subcase",subcaseObjid,tagObjid)
}

function AddTagToSolution(solutionObjid,tagObjid){
  AddTagToWorkflowObject("probdesc",solutionObjid,tagObjid)
}


//start of main processing
var startTime = new Date();
echo ('script started at ' + startTime)
echo();

var numCases= 0;
var numSubcases= 0;
var numSolutions= 0;
var numTags = 0;
var numWipbins = 0;

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var users = FCSession.CreateGeneric('user'); 
users.BulkName = "users";
users.AppendFilter('status', '=', 1);
users.AppendFilter('login_name', '!=', 'sa');
//users.AppendFilter('login_name', 'is in', 'loggapwhmgiuokfr,lgxffeggvljbfxwo');
users.MaxRecords = 10;
users.Query();

var userCount = users.Count() - 0;
echo("found " + userCount + " users");
var userRecordSet = users.Records;

while (!userRecordSet.EOF){
	userObjid = userRecordSet("objid") - 0;

	var wipbins = GetWipbins(userObjid);
	var tags = GetTags(userObjid);
	var userName = users("login_name") + '';

	echo('converting wipbins to tags for user ' + userName);

	var numWipbins = Object.size(wipbins);
	echo("--found " + numWipbins + " wipbins");
	echo("--found " + Object.size(tags) + " existing tags");

	//Create a tag for each wipbin that the user has
	var wipbinTitle;
	for (key in wipbins) {
    	wipbinTitle = wipbins[key].title;
    	CreateTag(wipbinTitle,userObjid,tags);
    }
	echo("--done creating new tags. now have " + Object.size(tags) + " tags");

	//add a tag to each case
	var cases = GetOpenCases(userObjid);
	echo('--found ' + cases.Count() + ' cases');
	while (!cases.EOF){
		numCases++;
		var wipbinObjid = cases("wip_objid")+ '';
		tagName = wipbins[wipbinObjid].title;
		tagObjid = tags[tagName].objid;
		var caseObjid = cases("elm_objid") - 0;
		echo('----adding tag ' + tagName + ' to case ' + caseObjid + '; tag Objid=' + tagObjid)
		AddTagToCase(caseObjid,tagObjid);
		cases.MoveNext();
	} //end of while loop for cases
	cases.Bulk.RemoveAllGenerics();

	//add a tag to each subcase
	var subcases = GetOpenSubcases(userObjid);
	echo('--found ' + subcases.Count() + ' subcases');
	while (!subcases.EOF){
		numSubcases++;
		var wipbinObjid = subcases("wip_objid")+ '';
		tagName = wipbins[wipbinObjid].title;
		tagObjid = tags[tagName].objid;
		var subcaseObjid = subcases("elm_objid") - 0;
		echo('----adding tag ' + tagName + ' to subcase ' + subcaseObjid + '; tag Objid=' + tagObjid)
		AddTagToSubase(subcaseObjid,tagObjid);
		subcases.MoveNext();
	} //end of while loop for subcases
	subcases.Bulk.RemoveAllGenerics();

	//add a tag to each solution
	var solutions = GetOpenSolutions(userObjid);
	echo('--found ' + solutions.TotalCount() + ' solutions');
	while (!solutions.EOF){
		numSolutions++;
		var wipbinObjid = solutions("probdesc_wip2wipbin")+ '';
		tagName = wipbins[wipbinObjid].title;
		tagObjid = tags[tagName].objid;
		var solutionObjid = solutions("objid") - 0;
		echo('----adding tag ' + tagName + ' to solution ' + solutionObjid + '; tag Objid=' + tagObjid)
		AddTagToSolution(solutionObjid,tagObjid);
		solutions.MoveNextAbsolute();
	} //end of while loop for solutions
	solutions.Bulk.RemoveAllGenerics();

	userRecordSet.MoveNext;
	FCSession.CloseAllGenerics();

} //end of while loop for users

echo();
echo("done with  converting wipbins to tags for " + userCount + " users");
var endTime = new Date();
var numMinutes = Date.dateDiff('n', startTime, endTime);
var numSeconds = Date.dateDiff('s', startTime, endTime);
echo ('script started at ' + startTime)
echo ('script ended at ' + endTime)
echo('script completed in: ' + numMinutes + ' minutes (' + numSeconds + ' seconds)');
echo('Cases Tagged:' + numCases)
echo('Subcases Tagged:' + numSubcases)
echo('Solutions Tagged:' + numSolutions)
echo('Tags Created:' + numTags)
