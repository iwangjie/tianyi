<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/systeminfo/init_wev8.jsp"%>
<jsp:useBean id="rs" class="weaver.conn.RecordSet" scope="page" />
<%
//类型
String type = Util.null2String(request.getParameter("type"),"0");
//个数
int count = 0;
//简介
String msg = "Registered users";
String sql = "SELECT COUNT(id) FROM uf_riskcase where fxlx = '1'";//默认第一个
String src = "";//点击打开的页面
if(type.equals("1")){//第二个
	sql = "SELECT COUNT(id) FROM uf_riskcase where fxlx = '1'";
	msg = "财务风险";
	src = "/formmode/search/CustomSearchBySimple.jsp?customid=99";
}else if(type.equals("2")){//第三个
	sql = "SELECT COUNT(id) FROM uf_riskcase where fxlx = '3'";
	msg = "人事风险";
	src = "/formmode/search/CustomSearchBySimple.jsp?customid=100";
}else if(type.equals("3")){//第四个
	sql = "SELECT COUNT(id) FROM uf_riskcase where fxlx = '7'";
	msg = "项目风险";
	src = "/formmode/search/CustomSearchBySimple.jsp?customid=101";
}else if(type.equals("4")){//第五个
	sql = "SELECT COUNT(id) FROM uf_riskcase where fxlx = '4'";
	msg = "法律风险";
	src = "/formmode/search/CustomSearchBySimple.jsp?customid=102";
}
rs.executeSql(sql);
if(rs.next()){
	count = rs.getInt(1);
}
%>
<html>
	<head>
		<style type="text/css">
			.bgDiv{
      			background: #e74c3c;
				width: 210px;
				height: 130px;
				-webkit-border-radius: 5px;
				-moz-border-radius: 5px;
				border-radius: 5px;
				color: #FFF;
				box-shadow: 0px 0px 0 0 #FFF, inset 1px 1px 3px 0 rgba(0,0,0, 0.2);
				padding-left: 20px;
				position: relative;
				cursor: pointer;
			}
			.count{
			    font-size: 36px;
				line-height: 90px;
				font-weight: bold;
				height: 75px;
			}
			.bgImageDiv{
				background: url('images/bg0.png') no-repeat;
				width: 110px;
				height: 100px;
				right: 5px;
				position: absolute;
				bottom: 0px;
			}
			.bgDiv1{
				background: #E64C3C;
			}
			.bgImageDiv1{
				background: url('images/bg1.png') no-repeat;
			}
			.bgDiv2{
				background: #27AE60;
			}
			.bgImageDiv2{
				background: url('images/bg2.png') no-repeat;
			}
			.bgDiv3{
				background: #3498DB;
			}
			.bgImageDiv3{
				background: url('images/bg3.png') no-repeat;
			}	
			.bgDiv4{
				background: #34495E;
			}
			.bgImageDiv4{
				background: url('images/bg4.png') no-repeat;
			}
		</style>
	</head>
	<body>
		<div class="bgDiv bgDiv<%=type%>" _src="<%=src%>">
			<div class="count"><%=count %></div>
			<div><%=msg %></div>
			<div class="bgImageDiv bgImageDiv<%=type%>"></div>
		</div>
		<script type="text/javascript">
			jQuery(function(){
				var num = 0;
				var inter = setInterval(function(){
					jQuery(".count").text(num++);
					if(num > <%=count%>){
						clearInterval(inter);
					}
				}, 1000);
				jQuery(".bgDiv").click(function(){
					var src = jQuery(this).attr("_src");
					if(src && src != ""){
						openFullWindowHaveBar(src);
					}
				});
			});
		</script>
	</body>
</html>