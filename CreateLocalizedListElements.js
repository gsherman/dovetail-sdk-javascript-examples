function echo(s){
	WScript.Echo(s)
}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();

AddGbstListLocale('Problem Severity Level', 'pl-PL');
AddGbstListLocale('Case Type', 'pl-PL');
AddGbstListLocale('Open', 'pl-PL');
AddGbstListLocale('Closed', 'pl-PL');
AddGbstListLocale('Response Priority Code', 'pl-PL');

AddHgbstListLocale('Notification Types', 'pl-PL');
AddHgbstListLocale('Subcase Types', 'pl-PL');
AddHgbstListLocale('Contact Expertise', 'pl-PL');
AddHgbstListLocale('Contact Status', 'pl-PL');
AddHgbstListLocale('Contact Type', 'pl-PL');
AddHgbstListLocale('Site Status', 'pl-PL');
AddHgbstListLocale('Site Type', 'pl-PL');
AddHgbstListLocale('User Status', 'pl-PL');
AddHgbstListLocale('Phone Types', 'pl-PL');
AddHgbstListLocale('Email Types', 'pl-PL');
AddHgbstListLocale('WORKGROUP', 'pl-PL');

function AddLocalizedListValues(list,locale,relation){
	var prefix = locale.substr(0,2);
	for (var i = 0; i < list.RecordCount;i++){
	  	var title = list('title') + "";
		var objid = list('objid') - 0;
		AddFcLocElm(title, locale, prefix, objid, relation);
	  	list.MoveNext();
	}
}

function AddFcLocElm(title, locale, prefix, objid, rel) {
	var boLocElm = FCSession.CreateGeneric('fc_loc_elm');
	boLocElm.AddNew();
	boLocElm("title") = prefix + ': ' + title;
	boLocElm("locale") = locale;
	boLocElm.RelateById(objid, rel);
	boLocElm.Update();
}

function AddGbstListLocale(listName, locale) {
	var list = FCApp.GetGbstList(listName);
	var relation = 'fc_loc_elm2gbst_elm';	
	AddLocalizedListValues(list,locale,relation);
}
 
function AddHgbstListLocale(listName, locale) {
	var list = FCApp.GetHgbstList(listName);
	var relation = 'fc_loc_elm2hgbst_elm';		
	AddLocalizedListValues(list,locale,relation);
}
