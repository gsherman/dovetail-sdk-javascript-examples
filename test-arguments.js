// Show all of the arguments.
WScript.Echo(WScript.Arguments.length + " arguments")

for (var i = 0; i <= WScript.Arguments.length - 1; i++) {
    WScript.Echo(" " + WScript.Arguments.Item(i));

}

// Show the unnamed arguments.
WScript.Echo(WScript.Arguments.Unnamed.length + " unnamed arguments")

for (var i = 0; i <= WScript.Arguments.Unnamed.length - 1; i++) {
    WScript.Echo(" " + WScript.Arguments.Unnamed.Item(i));
}

// Show the named arguments.
WScript.Echo (WScript.Arguments.Named.length + " named arguments")
WScript.Echo (" ab: " + WScript.Arguments.Named.Item("ab"));


var NamedArguments = WScript.Arguments.Named;

var ab = NamedArguments.Item("ab")
WScript.Echo("ab=" + ab);

var cd = NamedArguments.Item("cd")
WScript.Echo("cd=" + cd);
if(ab){WScript.Echo('ab found')}
if(cd){WScript.Echo('cd found')}
