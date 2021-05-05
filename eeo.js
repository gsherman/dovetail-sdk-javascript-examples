var olFolderOutbox = 4;

var objSession = WScript.CreateObject("Redemption.RDOSession");
objSession.Logon();
objFolder = objSession.GetDefaultFolder(olFolderOutbox);
objMessage = objFolder.Items.Add("IPM.Note");
objRecipients = objMessage.Recipients;
can_connect = true;

objMessage.Subject = "testing from eeo.js"
objMessage.Body    = "this is the body"

objMessage.Recipients
//objRecipients.Add("gary@dovetailsoftware.com");
objRecipients.Add("craig@localhost.com");

var objAttachments = objMessage.Attachments;
var outlookAttachmentType = 1;  //The attachment is a copy of the original file and can be accessed even if the original file is removed.

//var file_name_path = "C:\\tmp\\files\\line.png";
var file_name_path = "http://localhost/images/dt_header_logo.gif";
var file_name_path = "http://v8.fcs.local/seekerproxy/resources/download?Token=fb3f87be-ca62-414c-8568-3821df7d6f27";

var attachment = objAttachments.Add(file_name_path, outlookAttachmentType);
attachment.DisplayName = "line.png";
attachment.FileName = "pretty-line.png";

objMessage.Send();
