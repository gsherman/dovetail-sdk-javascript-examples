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

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

var contactObjid = 268435524;


//beware! hacked with many hard coded objids!

var solution = FCSession.CreateGeneric("probdesc");
//solution.AppendFilter("id_number", "=", "54");
solution.Query();

while (!solution.EOF){

	var numberViews = getRandomInt(8,20);
	var numberRatings = getRandomInt(1,20);

	for (var i = 1; i<numberViews;i++){
		when = getRandomDate(new Date('6/1/2014'),new Date())
		echo ('add view for solution ' + solution.getField("id_number") + ' for contact ' + contactObjid + ' on ' + when)
		AddViews(solution.Id,contactObjid, when);
	}

	var startingContactObjid = 268435514;
	var endingContactObjid = startingContactObjid + numberRatings;

	for (var i = startingContactObjid; i< endingContactObjid;i++){
		when = getRandomDate(new Date('6/1/2014'),new Date())
		var rating = getRandomInt(1,5)
		var isHelpful = getRandomInt(0,1)
		

		echo ('rate solution ' + solution.getField("id_number") + ' for contact ' + i + ' on ' + when + '. rating:' + rating + ' isHelpful:' + isHelpful)
		AddRating(solution.Id,i, when, rating,isHelpful)
	}

	solution.MoveNext();
}

FCSession.Logout();
