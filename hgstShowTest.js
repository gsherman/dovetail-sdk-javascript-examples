var FCApp = new ActiveXObject("FCFLCompat.FCApplication");
//FCApp.WorkingDirectory = "C:\\apps\\DovetailAgent\\pages\\";
FCApp.Initialize();

var FCSession = FCApp.CreateSession();
FCSession.Login("sa", "sa", "user");
FCSession.ThrowErrors = false;

// find a baseline LIST and get the top level SHOW

var boHgbstListTarget = FCSession.CreateGeneric("hgbst_lst");
boHgbstListTarget.AppendFilter("title", "=", "CR_DESC");
boHgbstListTarget.BulkName = "foo";

var boHgbstShowTarget = FCSession.CreateGeneric("hgbst_show");
boHgbstShowTarget.TraverseFromParent(boHgbstListTarget, "hgbst_lst2hgbst_show");
boHgbstShowTarget.BulkName = "foo";

boHgbstListTarget.Query();

// do NOT IN query for all SHOWS except the one above, then traverse to child SHOWS and their ELMS

var boHgbstShow = FCSession.CreateGeneric("hgbst_show");
boHgbstShow.AppendFilter("objid", "not in", boHgbstShowTarget.Id);

var boHgbstParentShow = FCSession.CreateGeneric("hgbst_show");
boHgbstParentShow.TraverseFromParent(boHgbstShow, "chld_prnt2hgbst_show");

var boHgbstElmExc = FCSession.CreateGeneric("hgbst_elm");
boHgbstElmExc.TraverseFromParent(boHgbstParentShow, "hgbst_show2hgbst_elm");
boHgbstElmExc.DataFields = "objid";

// this query fails with boHgbstShow.Bulk.Query();
boHgbstShow.Bulk.Query();

// this query succeeds with boHgbstShow.Query();
//boHgbstShow.Query();

WScript.Echo("boHgbstShow Count is " + boHgbstShow.Count());

FCSession.CloseAllGenerics();