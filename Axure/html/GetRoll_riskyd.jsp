<%@ page language="java" contentType="text/html; charset=utf-8"%>
<%@ include file="/systeminfo/init_wev8.jsp"%>
<jsp:useBean id="rs" class="weaver.conn.RecordSet" scope="page" />
<%

%>
<html>
	<head>
		<style type="text/css">
			*{
				font-size: 12px;
			}
			.titleDiv {
			    height: 25px;
			    line-height: 20px;
			    background: #216AA4;
			    color: #fff;
			}
			.itemMain {
			    height: 250px;
			    overflow: hidden;			   
	    	 	background: #FFFFFF;		
			}
			.itemDiv {
			    color: #000;
			    line-height: 25px;	
				height: 25px;									
			    text-indent: 5px;
			    display: none;
			}
			table {
			    width: 100%;
			    border-collapse: collapse;
			    text-align: center;
			}
			.showlog {
				animation: showlog 3s ease-out 0s 1 alternate;
			}
	
			@keyframes showlog {
				from {
					background-color: #FFCE42;
				}
				to {
					background-color: transparent;
				}
			}
		</style>
	</head>
	<body>
		<div class="mainDiv">
			<div class="titleDiv">
				<table>
					<colgroup>
						<col width="20%"/>
						<col width="40%"/>
						<col width="20%"/>
						<col width=""/>
					</colgroup>
					<tr>
						<td>编号</td>
						<td>风险事件</td>
						<td>风险类型</td>
						<td>应对措施</td>
					</tr>
				</table>
			</div>
			<div class="itemMain">
				<%
				String sql = "SELECT a.fxbh,a.fxmc,b.mc,c.selectname from uf_riskcase a,dbo.uf_riskmodel b,workflow_SelectItem c  where a.fxlx = b.id and c.selectvalue = a.zt and c.fieldid = '9024' and a.zt in ('3','4','5','6') order by a.id desc";
				rs.executeSql(sql);
				while(rs.next()){
					%>
					<div class="itemDiv">
						<table>
							<colgroup>
								<col width="20%"/>
								<col width="40%"/>
								<col width="20%"/>
								<col width=""/>
							</colgroup>
							<tr>
								<td><%=Util.null2String(rs.getString("fxbh")) %></td>
								<td><%=Util.null2String(rs.getString("fxmc")) %></td>
								<td><%=Util.null2String(rs.getString("mc")) %></td>
								<td><%=Util.null2String(rs.getString("selectname")) %></td>
							</tr>
						</table>
					</div>
					<%
				}
				%>
			</div>
		</div>
		<script type="text/javascript">
			var inter;
			var num = 1;
			jQuery(function(){
				doInter();
			});
			
			function doInter(){
				inter = setInterval(function(){
					if(num >= 6){
						clearInterval(inter);
						setTimeout(function(){
							num = 1;
							doInter();
						},500);
					}else{
						var index = jQuery(".itemDiv").length-1;
						jQuery(".itemMain").prepend(jQuery(".itemDiv").eq(index-1).show().addClass("showlog"));
					}
					num++;
				}, 300);
			}
		</script>
	</body>
</html>