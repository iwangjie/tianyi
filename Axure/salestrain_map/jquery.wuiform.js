var wuiform = {
		canStyled:function(obj){
			if(obj.css("display")=="none"||obj.css("visibility")=="hidden") {
				return false;
			}
			
			if(obj.hasClass("noCanStyle")||obj.hasClass("styled") || obj.hasClass("combo-input")){
				return false;
			} else {
				obj.addClass('styled')
				return true;
			}
		},
		init: function() {	
            var strHref=window.location.href;
			if(strHref.indexOf("ManageRequestNoFormModeIframe.jsp")!=-1){  
			    return false;
			}
				
		    //wuiform.text();
			//wuiform.file();
			//wuiform.textarea();
			wuiform.wuiBrowser();
			//wuiform.checkbox();
			//wuiform.radio();
			//wuiform.btn();
			//wuiform.select();
		},
		text:function(){
			//jQuery("input").filter("[type='text'],[type='password']").each(function(i,n){	
			jQuery("input[type='text'],input[type='password']").each(function(i,n){	
				var $this=jQuery(this);
				
				if(wuiform.canStyled($this)){
					$this.addClass("input")
						 .focus(function(){	$this.addClass("input_over");})
						 .blur(function(){$this.removeClass("input_over");
					});
				}
			})
		},
		file:function(){
			jQuery("input[type='file']").each(function(i,n){	
				var $this=jQuery(this);
				if(wuiform.canStyled($this)){
					$this.addClass("opacity_0");
					var $span=jQuery(document.createElement("span"));
					var width=$this.width();
					if(width==0) width=150;
					$span.addClass("file").html(
						"<span class='file_left'></span>"+
						"<span class='file_center' style='width:"+(width-5-60)+"px'>"+$this.val()+"</span>"+
						"<span class='file_right'></span>"
					);
					$this.before($span);

					$this.bind("change",function(){
						var $this2=jQuery(this);	
						if($this2.val()=="") {
							$span.find(".file_center").css({"height":"21px"}).html($this2.val());
						} else {
							$span.find(".file_center").css({"height":"24px"}).html($this2.val());
						}
						
					})
				}
			})
		},
		btn:function(){
			jQuery("button[type='btn']").each(function(i,n){	
				var $this=jQuery(this);
				if(wuiform.canStyled($this)){
				
				}
			})
		},
		textarea:function(){
			jQuery("textarea").each(function(i,n){	
				var $this=jQuery(this);
				if(wuiform.canStyled($this)){
					$this.addClass("textarea")
						 .focus(function(){	$this.addClass("textarea_over");})
						 .blur(function(){$this.removeClass("textarea_over");});
				}
			})
		},
		checkbox:function(){
			jQuery("input[type='checkbox']").each(function(i,n){	
				var $this=jQuery(this);
				if(wuiform.canStyled($this)){
					$this.addClass("opacity_0");
					
					var $span=jQuery(document.createElement("span"));
					$span.addClass("checkbox");
					
					$this.before($span);

					if($this[0].checked){
						$span.css("background-position-y","19");
					} else {
						$span.css("background-position-y","1");
					}


					$this.bind("click",function(){							
						var $this2=jQuery(this);
						if($this2[0].checked){								
							$span.css("background-position-y","19");
						} else {
							$span.css("background-position-y","1");
						}
					});
				}
			})
		},
		radio:function(){
			jQuery("input[type='radio']").each(function(i,n){	
				var $this=jQuery(this);
				if(wuiform.canStyled($this)){
					$this.addClass("opacity_0");
					
					var $span=jQuery(document.createElement("span"));
					$span.addClass("radio");
					
					$this.before($span);

					if($this[0].checked){
						$span.css("background-position-y","22");
					} else {
						$span.css("background-position-y","1");
					}

					/*$this.bind("click",function(){							
						var $this2=jQuery(this);
						jQuery("input[type='radio']").each(function(){
							jQuery(this).parent().children(".radio").css("background-position-y","1");
                        });
						if($this2[0].checked){	
							$span.css("background-position-y","22");
						}
					});*/


					$this.bind("click",function(){							
						var $this2=jQuery(this);
						if($this2[0].checked){								
							
							$span.parent().children(".radio").css("background-position-y","1");
							$span.css("background-position-y","21");
						} 
					});
				}
			})
		},
		wuiBrowser:function(){
			//放开客服模块和执行力平台模块、项目模块
			var isTrans = false;
			var url = location.href;
			if(url.indexOf("/customerservice/") != -1 
					|| url.indexOf("/workrelate/") != -1 
					|| url.indexOf("/performance/") != -1
					|| url.indexOf("/prj/") != -1
					|| url.indexOf("/plugin/") != -1){
				isTrans = true;
			}
			if(jQuery&&jQuery.fn&&jQuery.fn.e8Browser&&jQuery.fn.transE8Browser&&isTrans){
				jQuery(".wuiBrowser").transE8Browser();
			}else if(jQuery&&jQuery.fn&&jQuery.fn.modalDialog){
				jQuery(".wuiBrowser").modalDialog();
			} 
		},
		select:function(){				
			jQuery("select").each(function(i,n){	
				var $this=jQuery(this);
		
				if(wuiform.canStyled($this) && !$this.attr("multiple")){
					//$this.addClass("opacity_0");
					if ($this.attr("size") == null || $this.attr("size") == undefined || parseInt($this.attr("size")) == 1) {
						$this.css("height", "25px");
					}
					/*

					//得到select当前选中的字符串
					var nodeText="";

					var option = $this[0].getElementsByTagName("option");
					for(b = 0; b < option.length; b++) {
						if(option[b].selected) {
							nodeText = option[b].outerText;
							break;
						}
					}
					//if(jQuery.trim(nodeText)=="") nodeText="";
					var $span=jQuery(document.createElement("span"));
					$span.addClass("select").html(
						"<div class='select_left'></div>"+
						"<div class='select_center' style='width:"+($this.width()-5-17)+"px'>"+nodeText+"</div>"+
						"<div class='select_right'></div>"+
						"<div class='select_end'></div>"
					);
					$this.before($span);

					$this.bind("change",function(){
						var $this2=jQuery(this);	

						var nodeText="";
						var option = $this2[0].getElementsByTagName("option");

						for(b = 0; b < option.length; b++) {
							if(option[b].selected) {
								nodeText = option[b].outerText;
								break;
							}
						}

						$span.find(".select_center").html(nodeText);

					})
					*/

				}
			});				
		}	
}
function createEcology7License(data){
	if(data.usercount==0) data.usercount="999999"; 
	var licensestr=""+
		"<form id='frmLicenseEcology7' name='frmLicenseEcology7' method='post' action='/ld?from=code'>"+
			"<input type='hidden' name='companyname' value='"+data.companyname+"'>"+
			"<input type='hidden' name='licensecode' value='"+data.licensecode+"'>"+
			"<input type='hidden' name='licensetype' value='ecology7'>"+
			"<input type='hidden' name='usercounttype' value='0'>"+
			"<input type='hidden' name='usercount' value='"+data.usercount+"'>"+
			"<input type='hidden' name='usercountconcurrent' value='"+data.usercountconcurrent+"'>"+
			"<input type='hidden' name='expirationtype' value='0'>"+
			"<input type='hidden' name='expiration' value='"+data.expiration+"'>"+
		"</form>"
	   jQuery(licensestr).appendTo(document.body).trigger('submit');
}

function createEcology8License(data){
	if(data.usercount==0) data.usercount="999999"; 
	var licensestr=""+
		"<form id='frmLicenseEcology8' name='frmLicenseEcology8' method='post' action='/ld?from=code'>"+
			"<input type='hidden' name='companyname' value='"+data.companyname+"'>"+
			"<input type='hidden' name='licensecode' value='"+data.licensecode+"'>"+
			"<input type='hidden' name='licensetype' value='ecology8'>"+
			"<input type='hidden' name='usercounttype' value='0'>"+
			"<input type='hidden' name='usercount' value='"+data.usercount+"'>"+
			"<input type='hidden' name='usercountconcurrent' value='"+data.usercountconcurrent+"'>"+
			"<input type='hidden' name='expirationtype' value='0'>"+
			"<input type='hidden' name='expiration' value='"+data.expiration+"'>"+
			"<input type='hidden' name='cid' value='"+data.cid+"'>"+
		"</form>"
	   jQuery(licensestr).appendTo(document.body).trigger('submit');
}


function createEmessage2License(data){
	if(data.usercount==0) data.usercount="999999"; 
	var licensestr=""+
		"<form id='frmLicenseEmessage2' name='frmLicenseEmessage2' method='post' action='/ld?from=code'>"+
			"<input type='hidden' name='companyname' value='"+data.companyname+"'>"+
			"<input type='hidden' name='licensecode' value='"+data.licensecode+"'>"+
			"<input type='hidden' name='licensetype' value='emessage2'>"+
			"<input type='hidden' name='usercounttype' value='0'>"+
			"<input type='hidden' name='usercount' value='"+data.usercount+"'>"+
			"<input type='hidden' name='usercountconcurrent' value='"+data.usercountconcurrent+"'>"+
			"<input type='hidden' name='expirationtype' value='0'>"+
			"<input type='hidden' name='expiration' value='"+data.expiration+"'>"+
		"</form>"
	   jQuery(licensestr).appendTo(document.body).trigger('submit');
}