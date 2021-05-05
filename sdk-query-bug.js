function echo(s){WScript.Echo(s);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFcApp();

recAliasObjid = 268435459;

var recModem = FCSession.CreateGeneric("modem");
recModem.AppendFilter("objid", ">", 0);
recModem.BulkName = "mergeAlias";

var recAliasContact = FCSession.CreateGeneric("contact");
recAliasContact.AppendFilter("objid", "=", recAliasObjid);
recAliasContact.BulkName = "mergeAlias";

var recAliasActEntry = FCSession.CreateGeneric();
recAliasActEntry.TraverseFromParent(recAliasContact, "contact2act_entry");

//This produces 1 query for table_contact and 1 for table_act_entry. GOOD. 
//recAliasContact.Query();

//This produces 2 queries for table_contact and 2 for table_act_entry. BAD. 
//Only 1 query for table_modem. GOOD. 
//Note: If I don't do the traversal to act_entry, then contact is only queried once
recAliasContact.Bulk.Query();

echo("name=" + recAliasContact.Bulk.bulkName);
echo("name=" + recAliasContact.Bulk.Name);
echo("id=" + recAliasContact.Bulk.BulkID);
echo("x=" + recAliasContact.Bulk.GenericCount);

for(var objEnum2 = new Enumerator(recAliasContact.Bulk); 
	!objEnum2.atEnd(); objEnum2.moveNext()) {
	gen = objEnum2.item();                              
	echo('DB Object Type=' + gen.dbobjectname);
}

/*
doesn't matter whether I set the bulk name or not.
this: recAliasContact.BulkName = "mergeAlias";

It can happen in .net, depending on how you write the query
see: c:\repo\powershell\test.ps1

*/

//simplify. not needed to repro problem
/*
var recAliasContactRole = FCSession.CreateGeneric();
recAliasContactRole.TraverseFromParent(recAliasContact, "contact2contact_role");
*/