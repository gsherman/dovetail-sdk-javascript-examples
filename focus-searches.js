function echo(s){
	WScript.Echo(s)
}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');

FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFcApp();
//WScript.Echo("successfully logged in the application");

recAliasObjid = 268435459;

var recAliasContact = FCSession.CreateGeneric("contact");
recAliasContact.AppendFilter("objid", "=", recAliasObjid);
recAliasContact.BulkName = "mergeAlias";

/*
var recAliasContactRole = FCSession.CreateGeneric();
recAliasContactRole.TraverseFromParent(recAliasContact, "contact2contact_role");
*/

var recAliasActEntry = FCSession.CreateGeneric();
recAliasActEntry.TraverseFromParent(recAliasContact, "contact2act_entry");

recAliasContact.Bulk.Query();

/*
echo(recAliasContact.Count());
*/

/*
TODO:
does this only happen in COM, or also in .net ?
*/
