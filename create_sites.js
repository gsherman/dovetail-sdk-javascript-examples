function rw(foo){WScript.Echo(foo);}


var FCApp = WScript.CreateObject('FCFLCompat.FCApplication');
rw('Platform = fcSDK');
FCApp.Initialize();

var FCSession=FCApp.CreateSession(); 
FCSession.LoginFromFCApp();

 var fcinter = WScript.CreateObject('FCCompatToolkit.INTER');
 fcinter.Initialize(FCApp,FCSession);   
 var fld_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var type_list = WScript.CreateObject('FCFLCompat.FCLIST');
 var val_list = WScript.CreateObject('FCFLCompat.FCLIST');


function CreateSite(SiteName){
   var SiteObjid = 0;
   var SiteId = "";
   //var SiteName="Test Site";
   var SiteType = "CUST";
   var BusOrgId = "";
   var SiteStatus = "ACTIVE";
   var Region = "";
   var District = "";
   var IndustryType = "";
   var PrimaryUse = "";
   var AddrObjid = 268435457;
   var ParentSiteId="";
   var SupportOfficeSiteId = "";
   var PrimarySupportEmpObjid = 0;
   var SecondarySupportEmpObjid = 0;

    var ret_int = fcinter.create_update_site_list(
                   SiteObjid,SiteId,SiteName,SiteType,BusOrgId,SiteStatus,
                   Region,District,IndustryType,PrimaryUse,
                   AddrObjid,AddrObjid,AddrObjid,ParentSiteId,
                   SupportOfficeSiteId,PrimarySupportEmpObjid,SecondarySupportEmpObjid,
                   fld_list,type_list,val_list);
   
   rw('created site with objid = ' + fcinter.ret_objid);
}

var numSites = 200;
for (var i=0;i< numSites;i++){
  CreateSite('Test Site ' + i);
}
