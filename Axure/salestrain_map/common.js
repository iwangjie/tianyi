function openOperateWindow(url){
  var redirectUrl = url ;
  var width = screen.width ;
  var height = screen.height ;
  var top = height/2 - 320;
  var left = width/2 - 525;
  var width = 1050 ;
  var height = 600 ;
  var szFeatures = "" ;
  szFeatures +="top="+top+"," ; 
  szFeatures +="left="+left+"," ;
  szFeatures +="width="+width+"," ;
  szFeatures +="height="+height+"," ;
  //szFeatures +="directories=no," ;
  szFeatures +="status=yes,toolbar=no,location=no," ;
  //szFeatures +="menubar=no," ;
  szFeatures +="scrollbars=yes," ;
  szFeatures +="resizable=yes" ; 
  window.open(redirectUrl,"",szFeatures) ;
}