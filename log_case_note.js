var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();

//user login
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

//contact login:
//var FCSession=FCApp.CreateSession();
//FCSession.Login('mark','mark','contact');

var strIdNumber = '100';
var strActionType = '';
var strInternal = '';
var strCreationTime = '';
var strUserName = 'sa';
var strNewStatus = '';
var strCommitTitle = '';
var strCommitNotes = '';
var strCommitDueDate = '';
var CommitWarningSeconds = 0;
var bCommitTo = false;
var bGenTimeBombs = true;
var strNotes = 'these are notes';

var fccs = WScript.CreateObject('FCCompatToolkit.CS');
fccs.Initialize(FCApp,FCSession);
var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
var val_list = WScript.CreateObject('FCFLCompat.FCLIST');

var retval = fccs.log_case_note_list(
                 strIdNumber,strActionType,strNotes,
                 strInternal,strCreationTime,strUserName,
                 strNewStatus, strCommitTitle, strCommitNotes, 
                 strCommitDueDate, CommitWarningSeconds,  
                 bCommitTo, bGenTimeBombs, 
                 fld_list, type_list, val_list);

var notesObjid = fccs.ret_objid;

WScript.Echo("Successfully created notes log with objid of " + notesObjid);

WScript.Echo("Querying for notes log...");

var genericNotes = FCSession.CreateGeneric('notes_log');
genericNotes.AppendFilter("objid","=",notesObjid);
genericNotes.Query();

WScript.Echo("Number of Notes Logs found: " + genericNotes.Count());
while (!genericNotes.EOF){
	WScript.Echo("Notes log with objid of " + genericNotes.Id + " was created at " + genericNotes("creation_time"));
	genericNotes.MoveNext();
}
