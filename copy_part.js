function rw(foo){WScript.Echo(foo);}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');

if( FCApp.IsFcflNet ) {
   rw('Platform = fcSDK');
}else{
   rw('Platform = FCFL');
}					

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var boPartNum = FCSession.CreateGeneric('part_num');
boPartNum.AppendFilter('part_number','=','AAAA');
var boModLevel = FCSession.CreateGeneric('mod_level');
boModLevel.TraverseFromParent (boPartNum,'part_num2mod_level');
boModLevel.AppendSort('objid','asc');
boPartNum.Bulk.Query();

var boNewPartNum = FCSession.CreateGeneric('part_num');
boNewPartNum.AddNew();
boNewPartNum.BulkName="foo";

boNewPartNum('part_number') = 'AAAA_fcsdk_copy14';

boNewPartNum("domain") = boPartNum("domain");
boNewPartNum('part_num2domain') = boPartNum('part_num2domain');
boNewPartNum('part_num2part_class') = boPartNum('part_num2part_class');

boNewPartNum.BulkName = "foo";
boNewPartNum.Bulk.NoSorting = true;

//workaround:
//boNewPartNum.Update();

// create copies of any and all revisions and set all relations
var boNewModLevel = FCSession.CreateGeneric('mod_level');
boNewModLevel.DBObjectName = "mod_level";
while (boModLevel.EOF != true) {
		boNewModLevel.AddNew();
		boNewModLevel('mod_level') = boModLevel('mod_level');
		boNewModLevel('active') = boModLevel('active');
		boNewModLevel("config_type") = boModLevel("config_type");
		//boNewModLevel.Bulk = boNewPartNum.Bulk;
		boNewModLevel.BulkName = "foo";

		boNewModLevel.RelateRecords(boNewPartNum,"part_info2part_num");

    //workaround:
    //boNewModLevel.Update();

		// move to next record
		boModLevel.MoveNext();
}

// perform update
boNewPartNum.Bulk.UpdateAll();

 

