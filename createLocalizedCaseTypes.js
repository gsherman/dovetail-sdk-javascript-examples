function rw(foo){WScript.Echo(foo);}

function LocalizeSeverityList(locale,arrayStrings){

  var severityList = FCApp.GetGbstList('Problem Severity Level');
  
  var genFcLocElm = FCSession.CreateGeneric('fc_loc_elm');
  var indexer = 0;
  
  while (!severityList.EOF){
    rw('severity=' + severityList('title') + ' :: ' + severityList('objid'));  
    genFcLocElm.AddNew();
    genFcLocElm('locale') = locale;;
    genFcLocElm('title') = arrayStrings[indexer];
    genFcLocElm('fc_loc_elm2gbst_elm') = severityList('objid');  
  
    indexer++;
    severityList.MoveNext();
  }
  
  genFcLocElm.UpdateAll();
}

   

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
rw('Platform = fcSDK');

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();


var FR = new Array();;
FR[0]='indiquer svp'
FR[1]='aucunes précipitations';
FR[2]='basses';
FR[3]='milieu';
FR[4]='haut';
FR[5]='pressant';

var ES = new Array();;
ES[0]='	especificar por favor'
ES[1]='ningunas acometidas';
ES[2]='bajo';
ES[3]='medio';
ES[4]='alto';
ES[5]='urgente';


var DE = new Array();;
DE[0]='bitte spezifizieren'
DE[1]='keine Anstürme';
DE[2]='niedrig';
DE[3]='mittel';
DE[4]='hoch';
DE[5]='dringend';

LocalizeSeverityList('FR_FR',FR);
LocalizeSeverityList('ES_ES',ES);
LocalizeSeverityList('DE_DE',DE);


