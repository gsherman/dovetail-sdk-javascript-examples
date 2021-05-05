function pause(){
	var WshShell = WScript.CreateObject("WScript.Shell");
	WshShell.Popup("pause");	
}

function echo(s){
	WScript.Echo(s)
}

//pause();

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
FCApp.Initialize();
//echo ("FCApp.ConnectionString:" + FCApp.ConnectionString);

var FCSession = FCApp.CreateSession();	
FCSession.LoginFromFCApp();
echo("successfully logged in the application");


var sql_str = "select objid,title from table_case where id_number = 'C5'";
var sqlTest = FCSession.CreateSQLExec();
sqlTest.ExecuteReturnRows(sql_str);
var rsQuery = sqlTest.Records;
echo(rsQuery.Fields(1).Value);




WScript.quit();




var connectionString = FCApp.ConnectionString;
var conStr = connectionString.replace("MSDAORA","OraOLEDB.Oracle");

echo('conStr:' + conStr)

//var ac = FCSession.active_connection();


//var conStr="Provider=OraOLEDB.Oracle;Data Source=dst;User Id=sa;Password=sa;"
//var conStr="Provider=MSDAORA;Data Source=dst;User Id=sa;Password=sa;"


//Set up the flags for the stored proc
   var flags = 0 - 0;
  flags = flags + 3;               // 1 = cases, 2 = subcases
   flags = flags + 4; // 4 = solutions
  flags = flags + 8;               // 8 = bugs
   flags = flags + 16;            //16 = part requests
   //if (bfcContracts) flags = flags + 32;          //32 = contracts (quotes)
   flags = flags + 64;                //64 = tasks (action items)

   var qry = WScript.CreateObject("ADODB.Command");
   var in_parm = WScript.CreateObject("ADODB.Parameter");
   var in_parm2 = WScript.CreateObject("ADODB.Parameter");
   var out_parm = WScript.CreateObject("ADODB.Parameter");
   var out_parm2 = WScript.CreateObject("ADODB.Parameter");

var adParamInput = 0x0001;
var adParamOutput = 0x0002;
var adInteger = 3;
var adVarChar = 200;
var adCmdStoredProc = 0x0004;

   in_parm.Direction = adParamInput
   in_parm.Name = "user_objid"
   in_parm.Type = adInteger
   in_parm.Size = 4
   in_parm.value = FCSession.Item("user.id");

   in_parm2.Direction = adParamInput
   in_parm2.Name = "flags"
   in_parm2.Type = adInteger
   in_parm2.Size = 4
   in_parm2.value = flags;

   out_parm.Direction = adParamOutput
   out_parm.Name = "wip_str"
   out_parm.Type = adVarChar;
   out_parm.Size = 4096;

   out_parm2.Direction = adParamOutput
   out_parm2.Name = "queue_str"
   out_parm2.Type = adVarChar;
   out_parm2.Size = 4096;


   var connectionString = FCApp.ConnectionString;
   var conStr = connectionString.replace("MSDAORA","OraOLEDB.Oracle");
   var connection = WScript.CreateObject('ADODB.Connection');
   connection.CursorLocation = 3; //ADODB.CursorLocationEnum.adUseClient;
   connection.Mode = 3; //ADODB.ConnectModeEnum.adModeReadWrite;
   connection.ConnectionString = conStr;
   connection.Open(); //( conStr, null, null, 0 );
   qry.ActiveConnection = connection;


   qry.Parameters.Append(in_parm)
   qry.Parameters.Append(in_parm2)
   qry.Parameters.Append(out_parm)
   qry.Parameters.Append(out_parm2)
   qry.CommandType = adCmdStoredProc
   qry.CommandText = "fc_wip_q_counts";

   qry.Execute();

  var queue_str = qry.Parameters.item("queue_str") + "";
  var queue_str = qry.Parameters.item("wip_str") + "";

  echo (queue_str);

//qry.ActiveConnection = FCSession.active_connection();
//Provider=OraOLEDB.Oracle.1;Data Source=dst;User Id=sa;Password=sa;

//var connectionClass = WScript.CreateObject('ADODB.ConnectionClass');

//echo(FCSession.active_connection());  

//FCSession.Logout();
WScript.Quit();
