function echo(s){
	WScript.Echo(s)
}

var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');

FCApp.Initialize();
var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

var lastName = 'L1CC892D3B011234,abcdef';
var lastName = 'L1CC892D3B011234';
var lastName = '123abcdefghijklmnopqrstu';

var g = FCSession.CreateGeneric('contact'); 
//g.AppendFilter('last_name','=',lastName);
g.AppendFilter('last_name','is in',lastName);

//doesn't seem to matter if its a searchable field or not.
//tried with this to test that theory:
//g.AppendFilter('state','in',lastName);

g.AppendFilter('objid','>',1);
g.AppendFilter('objid','is in','139,1234567890,587555555');

g.Query();
echo(g.Count());
