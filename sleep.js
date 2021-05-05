

  function Sleep(seconds){
            var oShell = WScript.CreateObject("Wscript.Shell");
            var cmd = "%COMSPEC% /c timeout " + seconds + " /nobreak"
            oShell.Run(cmd,0,1)
        }

Sleep(10)
