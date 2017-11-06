<%@ page import="weaver.general.Util" %>
<%@ page import="java.util.*" %>

<%@ page language="java" contentType="text/html; charset=UTF-8" %> <%@ include file="/systeminfo/init_wev8.jsp" %>
<%
String urlType = Util.null2String(request.getParameter("urlType"));
String subcompanyid1 = Util.null2String(request.getParameter("subcompanyid1"));
String isdata = Util.null2String(request.getParameter("isdata"));
String from = Util.null2String(request.getParameter("from"));
if(urlType.equals(""))urlType="0";

    String id=Util.null2String(request.getParameter("paraid"));
    String checktype=Util.null2String(request.getParameter("checktype"));  //radio or not
    String onlyendnode=Util.null2String(request.getParameter("onlyendnode")); //如果需要check是否仅仅只是没有孩子的节点
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "
http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<HTML>
<HEAD>

<LINK REL=stylesheet type=text/css HREF=/css/Weaver_wev8.css>
	
<link rel="stylesheet" href="/css/ecology8/request/leftNumMenu_wev8.css" type="text/css" />
<script type="text/javascript" src="/js/ecology8/request/leftNumMenu_wev8.js"></script>
</HEAD>
<body>
<%@ include file="/systeminfo/RightClickMenuConent_wev8.jsp" %>
<%@ include file="/systeminfo/RightClickMenu_wev8.jsp" %>
<%@ include file="/systeminfo/leftMenuCommon.jsp" %>
<script type="text/javascript">
rightMenu.style.visibility='hidden';
</script>

<table cellspacing="0" cellpadding="0" class="flowsTable" style="width:100%;height:100%;"  >
	<tr>
		<td class="leftTypeSearch" >
			<div>
				<span class="leftType" onclick="reload()">
				<span><img style="vertical-align:middle;" src="/images/ecology8/request/alltype_wev8.png" width="18" /></span>
				<span><%=SystemEnv.getHtmlLabelNames("16455",user.getLanguage())%></span>
				<span id="totalDoc"></span>
				</span>
				<span class="leftSearchSpan">
					<input type="text" class="leftSearchInput"/>
				</span>
			</div>
		</td>
		<td rowspan="2">
		</td>
	</tr>
	<tr>
		<td style="width:246px;" class="flowMenusTd">
			<div class="flowMenuDiv"  >
				<div style="overflow:hidden;height:1000px;position:relative;" id="overFlowDiv">
					<div class="ulDiv" ></div>
				</div>
			</div>
		</td>
	</tr>
</table>
<script type="text/javascript">
jQuery(document).ready(function(){
	initTree();
});

function reload(){
	
	e8InitTreeSearch({ifrms:'',formID:'',conditions:''});
	var optFrame=$("#contentframe",parent.document);
	var src="/album/AlbumList.jsp?1=1";
	optFrame.attr("src",src);
}

function initTree(){
	var numbertypes={};
	numbertypes={hoverColor:"#A6A6A6",color:"black",title:"<%=SystemEnv.getHtmlLabelNames("1331",user.getLanguage())%>"};
	var demoLeftMenus="/album/AlbumSubcompanyTreeData.jsp?from=<%=from %>&subcompanyid1=<%=subcompanyid1 %>";
	//console.log("demoLeftMenus:"+demoLeftMenus);
	$(".ulDiv").leftNumMenu(demoLeftMenus,{
		numberTypes:{
			data2count:numbertypes
		},
		showZero:false,
		selectFirst:true,
		clickFunction:function(attr,level,numberType,node){
			leftMenuClickFn(attr,level,numberType,node);
		},
		expand:{
			url:function(attr,level){
				},
			done:function(children,attr,level){
			}
		},
		
	});
}


function leftMenuClickFn(attr,level,numberType,node){
	if(attr.groupid){
		var optFrame=$("#contentframe",parent.document);
		var src=optFrame.attr("src");
		if(src.indexOf("paraid")>-1){
			src=src.substring(0, src.indexOf("paraid"))+"paraid="+attr.groupid;
		}else{
			src+="&paraid="+attr.groupid;
		}
		//console.log("albummanage src:"+src);
		optFrame.attr("src",src);
		
	}
}

</script>

</body>
</HTML>
