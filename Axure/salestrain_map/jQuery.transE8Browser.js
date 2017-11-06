/**
*jQuery transE8Browser plugin v1  
* author��dky 
* Date:2015/01/06
*/
(function(jQuery){
	jQuery.fn.transE8Browser=function(){
		if(!this) return;
		$this=jQuery(this);//��ǰ�ڵ�
		if($this.length>1){
			$this.each(function(){
				jQuery(this).transE8Browser();
			});
			return;
		}
		var thisid = $this.attr("id")?$this.attr("id"):"";
		if(thisid==""){
			if(jQuery&&jQuery.fn&&jQuery.fn.modalDialog){
				jQuery(this).modalDialog();
			} 
			return;
		}
		var _browserUrl = $this.attr("_url")?$this.attr("_url"):"";
		var _param = $this.attr("_param");
		if(_param&&_param!="") _browserUrl += "?"+_param+"=";
		var _completeUrl = "";
		//������������
		var _type = "";
		//������������
		var _linkUrl = "";
		if(_browserUrl.indexOf("ResourceBrowser")>-1){//������Դ
			_type = "1";
			_linkUrl = "/hrm/resource/HrmResource.jsp?id=";
		}else if(_browserUrl.indexOf("ProvinceBrowser")>-1){//ʡ��
			_type = "2222";
			_linkUrl = "#";
		}else if(_browserUrl.indexOf("CityBrowser")>-1){//����
			_type = "58";
			_linkUrl = "#";
		}else if(_browserUrl.indexOf("Subcompany")>-1){//�ֲ�
			_type = "164";
			_linkUrl = "/hrm/company/HrmSubCompanyDsp.jsp?id=";
		}else if(_browserUrl.indexOf("Department")>-1){//����
			_type = "4";
			_linkUrl = "/hrm/company/HrmDepartmentDsp.jsp&id=";
		}else if(_browserUrl.indexOf("Request")>-1){//����
			_type = "16";
			_linkUrl = "/workflow/request/ViewRequest.jsp?requestid=";
		}else if(_browserUrl.indexOf("CustomerBrowser")>-1){//�ͻ�
			_type = "7";
			_linkUrl = "/CRM/data/ViewCustomer.jsp?CustomerID=";
		}else if(_browserUrl.indexOf("ContactBrowser")>-1){//�ͻ���ϵ��
			_type = "67";
			_linkUrl = "/CRM/contacter/ContacterView.jsp?ContacterID=";
		}else if(_browserUrl.indexOf("Doc")>-1){//�ĵ�
			_type = "9";
			_linkUrl = "/docs/docs/DocDsp.jsp?id=";
		}
		
		var _zDialog = true; 
		var _isAutoComplete = true;
		if(_type!=""){
			_completeUrl = "/data.jsp?type="+_type;
		}else{
			_zDialog = false;
			_isAutoComplete = false;
			/*if(jQuery&&jQuery.fn&&jQuery.fn.modalDialog){
				jQuery(this).modalDialog();
				jQuery(".browser").removeClass("browser Browser").addClass("e8_browflow");
				jQuery("#"+thisid+"Span").css({"float":"left","line-height": "24px","margin": "0 5px"});
			} 
			return;*/
		}
		
		$this.before("<div id='"+thisid+"div' class='browserdiv'></div>");
		var broserValue = $this.attr("_displayText");
		if(broserValue){
			//��html��ǩ��ʼ�����滻><��ǩ�м�Ŀո񣬲������滻�ո�Ϊ��
			if(broserValue.indexOf("<") != -1){
				broserValue = broserValue.replace(/>((\s){1,2})</g,">,<");
			}else if(broserValue.indexOf(" ") != -1){
				broserValue = broserValue.replace(/\s/g,",");
			}
			
		}else{
			broserValue = "";
		}
		
		//֮ǰ������_required��ʾ�Ƿ���룬�漰ҳ��϶��ݲ��޸��ˣ�������isMustInput������ʾ
		//0ֻ����1�༭��2�������û��isMustInput������ʹ��֮ǰ�Ĺ���
		var isMustPara = $this.attr("isMustInput");
		if(!isMustPara){
			isMustPara = $this.attr("_required")
			isMustPara = isMustPara == "yes"?"2":"1";
		}
		
		jQuery("#"+thisid+"div").e8Browser({
		   name:thisid,
		   viewType:"0",
		   browserValue:$this.val(),
		   isMustInput:isMustPara,
		   browserSpanValue:(broserValue),
		   hasInput:true,
		   linkUrl:_linkUrl,
		   isSingle:(_browserUrl.indexOf("Muti")>-1||_browserUrl.indexOf("Multi")>-1)?false:true,
		   completeUrl:_completeUrl,
		   browserUrl:_browserUrl,
		   width:"",
		   hasAdd:false,
		   needHidden:true,
		   defaultRow:2,
		   zDialog:_zDialog,
		   isAutoComplete:_isAutoComplete,
		   tempTitle:$this.attr("tempTitle"),
		   _callback:($this.attr("_callBack")?$this.attr("_callBack"):""),
		   afterDelCallback:($this.attr("afterDelCallback")?$this.attr("afterDelCallback"):null)
		});
		$this.remove();
	};
})(jQuery);