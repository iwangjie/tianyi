// ˵������ Javascript �������һ�� indexOf ����
[].indexOf || (Array.prototype.indexOf = function(v){
     for(var i = this.length; i-- && this[i] !== v;);
     return i;
	 }); 
// ȡ��check��������ĺ�ɫ��̾��
function checkboxCheck(elementname,spanid){
	if(elementname.checked){
		elementname.value="1";
		spanid.innerHTML='';
	}
	else{
		elementname.value="";
		spanid.innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
	}
}
// ȡ�������������ĺ�ɫ��̾��
function checkinput(elementname,spanid){
	var tmpvalue = $GetEle(elementname).value;
	// ����$GetEle�����Ҳ�������ʱ�������ͨ��id���Ҷ���
    if(tmpvalue==undefined)
        tmpvalue=document.getElementById(elementname).value;
	while(tmpvalue.indexOf(" ") >= 0){
		tmpvalue = tmpvalue.replace(" ", "");
	}
	if(tmpvalue != ""){
		while(tmpvalue.indexOf("\r\n") >= 0){
			tmpvalue = tmpvalue.replace("\r\n", "");
		}
		if(tmpvalue != ""){
			$GetEle(spanid).innerHTML = "";
		}else{
			$GetEle(spanid).innerHTML = "<IMG src='/images/BacoError.gif' align=absMiddle>";
			//$GetEle(elementname).value = "";
		}
	}else{
		$GetEle(spanid).innerHTML = "<IMG src='/images/BacoError.gif' align=absMiddle>";
		//$GetEle(elementname).value = "";
	}
}
// �ж�email��ʽ�Ƿ���ȷ
// modified by lupeng 2004.06.04.
function checkinput_email(elementname,spanid){
	emailStr = $GetEle(elementname).value;
	emailStr = emailStr.replace(" ","");
	if (emailStr == "" || !checkEmail(emailStr)) {
		$GetEle(spanid).innerHTML = "<IMG src='/images/BacoError.gif' align=absMiddle>";
		$GetEle(elementname).value = "";
	} else
		$GetEle(spanid).innerHTML = "";
}
// added by xwj 2004.06.04.
function checkinput_email_only(elementname,spanid,flag){
    if(flag){
      checkinput_email(elementname,spanid);
    }
    else{
     var emailStr = $GetEle(elementname).value;
     emailStr = emailStr.replace(" ","");
     if(!checkEmail(emailStr)){
        $GetEle(spanid).innerHTML = "";
        $GetEle(elementname).value = "";
     }
    }
}
/**
 * Reference: Sandeep V. Tamhankar (stamhankar@hotmail.com), Added by lupeng
 * 2004.06.04.
 */
function checkEmail(emailStr) {	
   if (emailStr.length == 0) {
	   return true;
   }
   var emailPat=/^(.+)@(.+)$/;
   var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
   var validChars="\[^\\s" + specialChars + "\]";
   var quotedUser="(\"[^\"]*\")";
   var ipDomainPat=/^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
   var atom=validChars + '+';
   var word="(" + atom + "|" + quotedUser + ")";
   var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
   var domainPat=new RegExp("^" + atom + "(\\." + atom + ")*$");
   var matchArray=emailStr.match(emailPat);
   if (matchArray == null) {
	   return false;
   }
   var user=matchArray[1];
   var domain=matchArray[2];
   if (user.match(userPat) == null) {
	   return false;
   }
   var IPArray = domain.match(ipDomainPat);
   if (IPArray != null) {
	   for (var i = 1; i <= 4; i++) {
		  if (IPArray[i] > 255) {
			 return false;
		  }
	   }
	   return true;
   }
   var domainArray=domain.match(domainPat);
   if (domainArray == null) {
	   return false;
   }
   var atomPat=new RegExp(atom,"g");
   var domArr=domain.match(atomPat);
   var len=domArr.length;
   if ((domArr[domArr.length-1].length < 0) ||
	   (domArr[domArr.length-1].length > 50)) {
	   return false;
   }
   if (len < 2) {
	   return false;
   }
   return true;
}

// ------------- added by xwj for td3131 ���ֽ��Сдת��д 20051115-----------*/
function numberChangeToChinese(num) {
	var prefh="";
	if(!isNaN(num)){
	    if(num<0){
	        prefh="��";
	        num=Math.abs(num);
	    }
	}
	if (isNaN(num) || num > Math.pow(10, 12)) return "";
	var cn = "��Ҽ��������½��ƾ�";
	var unit = new Array("ʰ��Ǫ", "�ֽ�");
	var unit1= new Array("������", "");
	var numArray = num.toString().split(".");
	var start = new Array(numArray[0].length-1, 2);

	function toChinese(num, index)
	{
	var num = num.replace(/\d/g, function ($1)
	{
	return cn.charAt($1)+unit[index].charAt(start--%4 ? start%4 : -1);
	});
	return num;
	}

	for (var i=0; i<numArray.length; i++)
	{
	var tmp = "";
	for (var j=0; j*4<numArray[i].length; j++)
	{
	var strIndex = numArray[i].length-(j+1)*4;
	var str = numArray[i].substring(strIndex, strIndex+4);
	var start = i ? 2 : str.length-1;
	var tmp1 = toChinese(str, i);
	tmp1 = tmp1.replace(/(��.)+/g, "��").replace(/��+$/, "");
	// tmp1 = tmp1.replace(/^Ҽʰ/, "ʰ")
	tmp = (tmp1+unit1[i].charAt(j-1)) + tmp;
	}
	numArray[i] = tmp ;
	}

	numArray[1] = numArray[1] ? numArray[1] : "";
	numArray[0] = numArray[0] ? numArray[0]+"Բ" : numArray[0], numArray[1] = numArray[1].replace(/^��+/, "");
	numArray[1] = numArray[1].match(/��/) ? numArray[1] : numArray[1]+"��";
	var money =  numArray[0]+numArray[1];
	money = money.replace(/(����)+/g, "��"); 
	if(money=="��"){
		money="��Բ��";
	}else{
	    money=prefh+money;
	}
	return money;
}
// ------------- added by xwj for td3131 ���ֽ���дתСд 20051115-----------*/
// ���ֽ���дתСд
function chineseChangeToNumber(num) {
	var prefh="";
	if(num.length>0){
	    if(num.indexOf("��")==0){
	        prefh="-";
	        num=num.substr(1);
	    }
	}

	var numArray = new Array()
	var unit = "������Բ$";
	for (var i=0; i<unit.length; i++)
	{
	var re = eval("/"+ (numArray[i-1] ? unit.charAt(i-1) : "") +"(.*)"+unit.charAt(i)+"/");
	if (num.match(re))
	{
	// numArray[i] = num.match(re)[1].replace(/^ʰ/, "Ҽʰ")
	numArray[i] = numArray[i].replace(/[��Ҽ��������½��ƾ�]/g, function ($1)
	{
	return "��Ҽ��������½��ƾ�".indexOf($1);
	});
	numArray[i] = numArray[i].replace(/[�ֽ�ʰ��Ǫ]/g, function ($1)
	{
	return "*"+Math.pow(10, "�ֽ� ʰ��Ǫ ".indexOf($1)-2)+"+";
	}).replace(/^\*|\+$/g, "").replace(/��/, "0");
	numArray[i] = "(" + numArray[i] + ")*"+Math.ceil(Math.pow(10, (2-i)*4));
	}
	else numArray[i] = 0;
	}
	return prefh+eval(numArray.join("+"));
}

function floatFormat(num)
{   if (num!=null)
{
    
    num  =  num+"";  
	ary = num.split(".");
	if(ary.length==1){
		if(num == "")
			num = "0";
		num = num + ".00";
	}else{
		if(ary[1].length<2)
			num = num + "0";
		else if(ary[1].length>2)
			num = ary[0] + "." + ary[1].substring(0,2);
	}
	} 
    return  num;  
}
// ����ǧ��λ��ʽ��2
function milfloatFormat(num) {       
	if (num!=null) {   
	    num  =  num+"";  
	    var  re=/(-?\d+)(\d{3})/  
	    while(re.test(num)){  
	        num=num.replace(re,"$1,$2")  
	    }  
	    return  num;  
	}
	else return "";
}

function checkinput1(elementname, spanid){
	var tmpvalue = elementname.value;

	while(tmpvalue.indexOf(" ") >= 0){
		tmpvalue = tmpvalue.replace(" ", "");
	}
	while(tmpvalue.indexOf("\r\n") >= 0){
		tmpvalue = tmpvalue.replace("\r\n", "");
	}
	if(tmpvalue!=""){
		spanid.innerHTML='';
	}else{
		spanid.innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
		elementname.value = "";
	}
}
// �ж�input�����Ƿ������������,����С����
function ItemNum_KeyPress(elementname)
{
	var evt = getEvent();
	evt = jQuery.event.fix(evt);
	if(elementname==undefined){
		elementname = evt.target.name;
	}
	
	var keyCode = evt.which ? evt.which : evt.keyCode;
 // added by xwj for td1844 on 2005-05-12 ����������С����
 tmpvalue = $GetEle(elementname).value;
 var count = 0;
 var count2 = 0;
 var len = -1;
 if(elementname){
 len = tmpvalue.length;
 }
 for(i = 0; i < len; i++){
    if(tmpvalue.charAt(i) == "."){
    count++;     
    }
 }
 for(i = 0; i < len; i++){// ���������븺��
    if(tmpvalue.charAt(i) == "-"){
    count2++;     
    }
 }
 
 if(!(((keyCode>=48) && (keyCode<=57)) || keyCode==46 || keyCode==45) || (keyCode==46 && count == 1) || (keyCode==45 && count2 == 1))
  {  
     //(e.which ? e.which : e.keyCode) = 0;
     if (evt.keyCode) {
     	evt.keyCode = 0;evt.returnValue=false;     
     } else {
     	evt.which = 0;evt.preventDefault();
     }
     
	 
	 
     
  }
}

// �ж�input�����Ƿ��������������,������С����
function ItemPlusCount_KeyPress()
{
	var evt = getEvent();
	var keyCode = evt.which ? evt.which : evt.keyCode;
 if(!(((keyCode>=48) && (keyCode<=57))))
  {
     if (evt.keyCode) {
     	evt.keyCode = 0;evt.returnValue=false;     
     } else {
     	evt.which = 0;evt.preventDefault();
     }
     
	 
	 
  }
}

// �ж�input�����Ƿ������������,������С����
function ItemCount_KeyPress()
{
	var evt = getEvent();
	var keyCode = evt.which ? evt.which : evt.keyCode;
 if(!(((keyCode>=48) && (keyCode<=57))|| keyCode==45))
  {
     if (evt.keyCode) {
     	evt.keyCode = 0;evt.returnValue=false;     
     } else {
     	evt.which = 0;evt.preventDefault();
     }
     
	 
	 
  }
}

// �ж�input�����Ƿ������������,����"-"
function ItemPhone_KeyPress()
{
	var evt = getEvent();
	var keyCode = evt.which ? evt.which : evt.keyCode;
 if(!(((keyCode>=48) && (keyCode<=57)) || keyCode==45))
  {
     
	if (evt.keyCode) {
     	evt.keyCode = 0;evt.returnValue=false;     
     } else {
     	evt.which = 0;evt.preventDefault();
     }
     
	 
	 
  }
}

// �ж�input�����Ƿ��������С��,����С����
/*
 * p�����ȣ� ָ��С������ߺ��ұ߿��Դ洢��ʮ�������ֵ������������ȱ����Ǵ� 1 ����󾫶�֮���ֵ����󾫶�Ϊ 38��
 * 
 * s��С��λ���� ָ��С�����ұ߿��Դ洢��ʮ�������ֵ���������С��λ�������Ǵ� 0 �� p ֮���ֵ��Ĭ��С��λ���� 0����� 0 <= s <=
 * p�����洢��С���ھ��ȶ��仯��
 */
function ItemDecimal_KeyPress(elementname,p,s)
{
	var evt = getEvent();
	var keyCode = evt.which ? evt.which : evt.keyCode;
	tmpvalue = $GetEle(elementname).value;

    var dotCount = 0;
	var integerCount=0;
	var afterDotCount=0;
	var hasDot=false;

    var len = -1;
    if(elementname){
		len = tmpvalue.length;
    }

    for(i = 0; i < len; i++){
		if(tmpvalue.charAt(i) == "."){ 
			dotCount++;
			hasDot=true;
		}else{
			if(hasDot==false){
				integerCount++;
			}else{
				afterDotCount++;
			}
		}		
    }

    if(!(((keyCode>=48) && (keyCode<=57)) || keyCode==46 || keyCode==45) || (keyCode==46 && dotCount == 1)){  
		if (evt.keyCode) {
	     	evt.keyCode = 0;evt.returnValue=false;     
	     } else {
	     	evt.which = 0;evt.preventDefault();
	     }
	     
		 
		 
    }
	if(integerCount>=p-s && hasDot==false && (keyCode>=48) && (keyCode<=57)){
		if (evt.keyCode) {
	     	evt.keyCode = 0;evt.returnValue=false;     
	     } else {
	     	evt.which = 0;evt.preventDefault();
	     }
	     
		 
		 
	}
	if(afterDotCount>=s&&integerCount>=p-s){
		 if (evt.keyCode) {
	     	evt.keyCode = 0;evt.returnValue=false;     
	     } else {
	     	evt.which = 0;evt.preventDefault();
	     }
	}
	/* ���� */
	var rtnflg = false;
	
	var cursorPosition = getCursortPosition($G(elementname));
	var vidValue = $G(elementname).value;
	var dotIndex = vidValue.indexOf(".");
	if (hasDot) {
		if (cursorPosition <= dotIndex) {
			if (integerCount >= (p - s)) {
				rtnflg = true;
			}
		} else {
			if(afterDotCount >= s) {
				rtnflg = true;
			}
		}
	}
	
	if (rtnflg) {
		if (evt.keyCode != undefined) {
			evt.keyCode = 0;
			evt.returnValue=false;     
		} else {
			evt.which = 0;
			evt.preventDefault();
		}
	}
}

/**
 * ��ȡ�������λ��
 */
function getCursortPosition(inputElement) {
	var CaretPos = 0; 
	if (document.selection) {
		inputElement.focus();
		var Sel = document.selection.createRange();
		Sel.moveStart('character', -inputElement.value.length);
		CaretPos = Sel.text.length;
	} else if (inputElement.selectionStart || inputElement.selectionStart == '0') { //ff
		CaretPos = inputElement.selectionStart;
	}
	return (CaretPos);
}


// �ж�input�����Ƿ������������,������С����
function checkcount(objectname)
{
	valuechar = $GetEle(objectname).value.split("") ;
	isnumber = false ;
	for(i=0 ; i<valuechar.length ; i++) {
		charnumber = parseInt(valuechar[i]);
		if( isNaN(charnumber) && (valuechar[i]!="-" || (valuechar[i]=="-" && i!=0))){
			isnumber = true ;
		}
		if (valuechar.length==1 && valuechar[i]=="-"){
		    isnumber = true ;
		}
	}
	if(isnumber){
		$GetEle(objectname).value = "" ;
	}
}

function checkcount1(objectname)
{
	valuechar = objectname.value.split("") ;
	isnumber = false ;
		for(i=0 ; i<valuechar.length ; i++) {
		charnumber = parseInt(valuechar[i]);
		if( isNaN(charnumber) && (valuechar[i]!="-" || (valuechar[i]=="-" && i!=0))){
			isnumber = true ;
		}
		if (valuechar.length==1 && valuechar[i]=="-"){
		    isnumber = true ;
		}
	}
	if(isnumber){
		objectname.value = "" ;
	}
}



// �ж�input�����Ƿ������������,����С����
function checknumber(objectname)
{
	valuechar = $GetEle(objectname).value.split("") ;
	isnumber = false ;
	var hasdian = false;
	for(i=0 ; i<valuechar.length ; i++) { 
		charnumber = parseInt(valuechar[i]) ; 
		if( isNaN(charnumber)&& valuechar[i]!="." && valuechar[i]!="-"){
			isnumber = true ;
		}
		if((valuechar[i]=="."&&i==0&&hasdian==false)||(valuechar[i]=="-"&&i>0)){
			isnumber = true ;
		}
		if(valuechar[i]=="."){
			hasdian = true;
		}
		if (valuechar.length==1 && valuechar[i]=="-"){
		    isnumber = true ;
		}
	}
	if(isnumber){
		$GetEle(objectname).value = "" ;
	}
}
function checknumber1(objectname)
{
	valuechar = objectname.value.split("") ;
	isnumber = false ;
	var hasdian = false;
	for(i=0 ; i<valuechar.length ; i++) {
		charnumber = parseInt(valuechar[i]) ; 
		if( isNaN(charnumber)&& valuechar[i]!="." && valuechar[i]!="-"){
			isnumber = true ;
		}
		if((valuechar[i]=="."&&i==0&&hasdian==false)||(valuechar[i]=="-"&&i>0)){
			isnumber = true ;
		}
		if(valuechar[i]=="."){
			hasdian = true;
		}
		if (valuechar.length==1 && valuechar[i]=="-"){
		    isnumber = true ;
		}
	}
	if(isnumber){
		objectname.value = "" ;
	}
}
// �ж�input�����Ƿ��������������
function checkPlusnumber1(objectname)
{
	valuechar = objectname.value.split("") ;
	isnumber = false ;
	for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)) isnumber = true ;}
	if(isnumber) objectname.value = "" ;
}

// �ж�input�����Ƿ������������,����"-"
function checkphone(objectname)
{
	valuechar = $GetEle(objectname).value.split("") ;
	isnumber = false ;
	for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)&& valuechar[i]!="-") isnumber = true ;}
	if(isnumber) $GetEle(objectname).value = "" ;
}
function checkphone1(objectname)
{
	valuechar = objectname.value.split("") ;
	isnumber = false ;
	for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)&& valuechar[i]!="-") isnumber = true ;}
	if(isnumber) objectname.value = "" ;
}

function ItemTime_KeyPress()
{
	var evt = getEvent();
	var keyCode = evt.which ? evt.which : evt.keyCode;
 if(!((keyCode>=48) && (keyCode<=58)))
  {
		if (evt.keyCode) {
	     	evt.keyCode = 0;
	     	evt.returnValue=false;     
	     } else {
	     	evt.which = 0;
	     	evt.preventDefault();
	     }
  }
}

function checktime(objectname)
{
	valuechar = $GetEle(objectname).value.split("") ;
	isnumber = false ;
	for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)&& valuechar[i]!=":") isnumber = true ;}
	if(isnumber) $GetEle(objectname).value = "" ;
}

function checktime1(objectname)
{
	valuechar = objectname.value.split("") ;
	isnumber = false ;
	for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)&& valuechar[i]!=":") isnumber = true ;}
	if(isnumber) objectname.value = "" ;
}


// �ж�input�����Ƿ��������Ӣ����ĸ�����֣���������ĸ��ͷ
function checkinput_char_num(objectname)
{
	valuechar = $GetEle(objectname).value.split("") ;
	if(valuechar.length==0){
	    return ;
	}
	notcharnum = false ;
	notchar = false ;
	notnum = false ;
	for(i=0 ; i<valuechar.length ; i++) {
		notchar = false ;
		notnum = false ;
		charnumber = parseInt(valuechar[i]) ; if(isNaN(charnumber)) notnum = true ;
		// if(valuechar[i].toLowerCase()<'a' || valuechar[i].toLowerCase()>'z')
		// notchar = true ;
		if((valuechar[i].toLowerCase()<'a' || valuechar[i].toLowerCase()>'z')&&valuechar[i]!='_') notchar = true ;
		if(notnum && notchar) notcharnum = true ;
	}
	if(valuechar[0].toLowerCase()<'a' || valuechar[0].toLowerCase()>'z') notcharnum = true ;
	if(notcharnum) $GetEle(objectname).value = "" ;
}

// ���input���������С���е����������Ƿ񳬹����Ƶ�λ��
function checkdecimal_length(elementname,maxlength)
{
	if(!isNaN(parseInt($GetEle(elementname).value)) && (maxlength > 0)){
		inputTemp = $GetEle(elementname).value ;
		if (inputTemp.indexOf(".") !=-1)
		{
			inputTemp = inputTemp.substring(0,inputTemp.indexOf("."));
		}
		if (inputTemp.length > maxlength)
		{
			alert($GetEle(elementname).value+"���������ֳ���"+maxlength+"λ��");
			$GetEle(elementname).value = "" ;
		}
	}
}

// ��ȡ�ַ��������ʡ�Ժ�
// added by hubo, 2005/12/06
function ellipsis(str,lens){
	str = str.replace(/<.*?>/ig,"");
	str = str.replace(/<img.*/ig,"");
	var len = 0;
	var i;
	for(i=0;i<str.length;i++){
		len += str.charCodeAt(i)<127 ? 1 : 2;
		if(len>=lens) return str.substr(0,i+1)+"...";
	}
	return str;
}

// ȥ���ַ���ͷβ�ո�
// added by hubo, 2005/09/01
function trim(s){
	if(s==null){return s;}
	var i;
	var beginIndex = 0;
	var endIndex = s.length - 1;
	for(i=0;i<s.length;i++){
		if(s.charAt(i)==' ' || s.charAt(i)=='��'){
			beginIndex++;
		}else{
			break;
		}
	}
	for(i=s.length-1;i>=0;i--){
		if(s.charAt(i)==' ' || s.charAt(i)=='��'){
			endIndex--;
		}else{
			break;
		}
	}
	if(endIndex<beginIndex){return "";}
	return s.substring(beginIndex, endIndex + 1);
}

// *****************************************
// added by hubo, 2005/08/31
function doSwitch(objTbls){
	var evt = getEvent();
	var spanSwitch = evt.srcElement||evt.target;
    if (spanSwitch.nodeName=="IMG") spanSwitch = $(spanSwitch).parent()[0];
	var tblList = (objTbls).split(",");
	for(i=0;i<tblList.length;i++){
		if(document.getElementById(tblList[i])==null) continue;
		with(document.getElementById(tblList[i])){
			if(tBodies[0].style.display=="none"){
				$(tBodies[0]).show();
				spanSwitch.innerHTML = "<img src='/images/up.jpg' style='cursor:pointer'> ";
			}else{
				tBodies[0].style.display = "none";
				spanSwitch.innerHTML = "<img src='/images/down.jpg' style='cursor:pointer'>";
			}
		}
	}

}
// by ben 2005-12-26

function doSwitchx(obj){
	var evt = getEvent();
	var spanSwitch = evt.srcElement||evt.target;;
    if (spanSwitch.nodeName=="IMG") spanSwitch = spanSwitch.parentElement;
	
			if($GetEle(obj).style.display=="none"){
				$GetEle(obj).style.display = "";
				spanSwitch.innerHTML = "<img src='/images/up.jpg' style='cursor:hand'> ";
			}else{
				$GetEle(obj).style.display = "none";
				spanSwitch.innerHTML = "<img src='/images/down.jpg' style='cursor:hand'>";
			}
		}
	
function doSwitchx(obj,show,hidden){
	var evt = getEvent();
	var spanSwitch = evt.srcElement||evt.target;
    if (spanSwitch.tagName=="IMG") spanSwitch = spanSwitch.parentElement;
	
			if($GetEle(obj).style.display=="none"){
				$GetEle(obj).style.display = "";
				spanSwitch.innerHTML = "<img src='/images/up.jpg' style='cursor:hand' title='"+hidden+"'> ";
			}else{
				$GetEle(obj).style.display = "none";
				spanSwitch.innerHTML = "<img src='/images/down.jpg' style='cursor:hand' title='"+show+"' >";
			}
		}
function checkint(objectname)
{
	valuechar = $GetEle(objectname).value.split("") ;
	isnumber = false ;
	for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; if( isNaN(charnumber)) isnumber = true ;}
	if(isnumber) $GetEle(objectname).value = "" ;
}	

function checkintc(objectname,temp)
{
	valuechar = $GetEle(objectname).value.split("") ;
	isnumber = false ;
	for(i=0 ; i<valuechar.length ; i++) { charnumber = parseInt(valuechar[i]) ; 
	if( isNaN(charnumber)) isnumber = true ;}
	if(isnumber) $GetEle(objectname).value = "" ;
	else 
	{
	if (parseInt($GetEle(objectname).value)>parseInt(temp))
	$GetEle(objectname).value=parseInt(temp);
	}
}		
function change2input(a,b)
{

if (parseFloat(a)>parseFloat(b))
{
return true;
}
else
{
return false;
}
}
// by ben 2006-1-17
function openFullWindow(url){
  var redirectUrl = url ;
  var width = screen.width ;
  var height = screen.height ;
  if (height == 768 ) height -= 75 ;
  if (height == 600 ) height -= 60 ;
  var szFeatures = "top=0," ; 
  szFeatures +="left=0," ;
  szFeatures +="width="+width+"," ;
  szFeatures +="height="+height+"," ; 
  szFeatures +="directories=no," ;
  szFeatures +="status=yes," ;
  szFeatures +="menubar=no," ;
  if (height <= 600 ) szFeatures +="scrollbars=yes," ;
  else szFeatures +="scrollbars=yes," ;
  szFeatures +="resizable=yes" ; 
  window.open(redirectUrl,"new",szFeatures) ;
}

function openNewFullWindow(url){
  var redirectUrl = url ;
  var width = screen.width ;
  var height = screen.height ;
  if (height == 768 ) height -= 75 ;
  if (height == 600 ) height -= 60 ;
  var szFeatures = "top=0," ;
  szFeatures +="left=0," ;
  szFeatures +="width="+width+"," ;
  szFeatures +="height="+height+"," ;
  szFeatures +="directories=no," ;
  szFeatures +="status=yes," ;
  szFeatures +="menubar=no," ;
  if (height <= 600 ) szFeatures +="scrollbars=yes," ;
  else szFeatures +="scrollbars=yes," ;
  szFeatures +="resizable=yes" ;
  window.open(redirectUrl,"",szFeatures) ;
}

function enablemenu()
{
	// for (a=0;a<window.frames["rightMenuIframe"].document.all.length;a++){
		// window.frames["rightMenuIframe"].document.all.item(a).disabled=true;
	// }
	window.frames["rightMenuIframe"].event.srcElement.disabled = true;

}
function enableAllmenu()
{
	// TD9015 �����һ��ť��������"BUTTON"���ҵ�
	for (a=0;a<window.frames["rightMenuIframe"].document.all.length;a++){
		if(window.frames["rightMenuIframe"].document.all.item(a).tagName == "BUTTON"){
			window.frames["rightMenuIframe"].document.all.item(a).disabled=true;
		}
	}
	// window.frames["rightMenuIframe"].event.srcElement.disabled = false;
	
	try{// ext�˵���ɫ
		parent.Ext.getCmp('tabPanelContent').getTopToolbar().disable();// ���ҵ�
	}catch(e){
	}
	try{
		// ͷ���˵���ɫ
		if (window.ActiveXObject) {
			for (b=0;b<parent.document.getElementById("toolbarmenu").all.length;b++){
				if(parent.document.getElementById("toolbarmenu").all.item(b).tagName == "TABLE"){
					parent.document.getElementById("toolbarmenu").all.item(b).disabled=true;
				}
			}
		} else {
			jQuery("#toolbarmenuCoverdiv", parent.document).show();
		}
		
	}
	catch(e)
	{
	}
}
function displayAllmenu()
{
	// TD9015 �����һ��ť��������"BUTTON"��Ū��
	for (a=0;a<window.frames["rightMenuIframe"].document.all.length;a++){
		if(window.frames["rightMenuIframe"].document.all.item(a).tagName == "BUTTON"){
			window.frames["rightMenuIframe"].document.all.item(a).disabled=false;
		}
	}
	try{// ext�˵�Ū��
		parent.Ext.getCmp('tabPanelContent').getTopToolbar().enable();// �ͷ����
	}catch(e){
	}
	try{
		// ��ʾͷ���˵�
		if (window.ActiveXObject) {
			for (b=0;b<parent.document.getElementById("toolbarmenu").all.length;b++){
				if(parent.document.getElementById("toolbarmenu").all.item(b).tagName == "TABLE"){
					parent.document.getElementById("toolbarmenu").all.item(b).disabled=false;
				}
			}
		} else {
			jQuery("#toolbarmenuCoverdiv", parent.document).hide();
		}
	}
	catch(e)
	{
	}
}

function enableAllmenuParent(){
	try{//ext�˵���ɫ
		Ext.getCmp('tabPanelContent').getTopToolbar().disable();//���ҵ�
	}catch(e){
	}
	try{
		//ͷ���˵���ɫ
		if (window.ActiveXObject) {
			for (b=0;b<document.getElementById("toolbarmenu").all.length;b++){
				if(document.getElementById("toolbarmenu").all.item(b).tagName == "TABLE"){
					document.getElementById("toolbarmenu").all.item(b).disabled=true;
				}
			}
		} else {
			jQuery("#toolbarmenuCoverdiv", parent.document).show();
		}
	}catch(e){
	}
}
// *****************************************

function showMsgBox(o, msg, t, l){
	with(o){
		innerHTML = msg;
		style.display = "inline";
		style.position = "absolute"
		style.posTop = t||(document.body.offsetHeight/2+document.body.scrollTop-50);
		style.posLeft = l||(document.body.offsetWidth/2-50);
	}
}


/*
 * Function: ȡ�ַ����ֽڳ��� Document by by 2007-3-9
 */
function realLength(str) {
	var j=0;
	for (var i=0;i<=str.length-1;i++) {
		j=j+1;
		if ((str.charCodeAt(i))>127) {
			j=j+1;
		}
	}
	return j;
}

// ������Ϊ3���ֽڴ���
function realLengthOnly(str)
{
	var j=0;
	for (var i=0;i<=str.length-1;i++)
	{
		j=j+1;
		if ((str.charCodeAt(i))>127)
		{
			j=j+2;
		}
	}
	return j;
}

// ֻ��鳤��
function checkLengthOnly(elementname,len,fieldname,msg,msg1,msg2)
{
	len = len*1;
	try{
		var str = FCKEditorExt.getHtml(elementname);
		if(len!=0 && realLengthOnly(str)>len){
			alert("��"+fieldname+"��"+msg1+len+","+"("+msg2+")\n\n��"+fieldname+"��"+msg+":"+realLengthOnly(str));
			return false;
		}
	}catch(e){
		var str = $GetEle(elementname).value;
		if(len!=0 && realLengthOnly(str)>len){
			alert("��"+fieldname+"��"+msg1+len+","+"("+msg2+")\n\n��"+fieldname+"��"+msg+":"+realLengthOnly(str));
			return false;
		}
	}
	return true;
}
function checkLength(elementname,len,fieldname,msg,msg1) {
	len = len*1;
	var str = $GetEle(elementname).value;
	// ����$GetEle�����Ҳ�������ʱ�������ͨ��id���Ҷ���
    if(str == undefined) {
        str = document.getElementById(elementname).value;
    }
    
	if(len!=0 && realLength(str) > len){
		alert(fieldname + msg + len + "," + "(" + msg1 + ")");
		while(true){
			str = str.substring(0, str.length - 1);
			if(realLength(str) <= len){
				$GetEle(elementname).value = str;
				return;
			}
		}
	}
}
function checkLengthAndCut(elementname,len,fieldname,msg,msg1)
{
	len = len*1;
	var str = $GetEle(elementname).value;
	// ����$GetEle�����Ҳ�������ʱ�������ͨ��id���Ҷ���
    if(str==undefined)
        str=document.getElementById(elementname).value;
	if(len!=0 && realLength(str)>len){
		alert(fieldname+msg+len+"("+msg1+")");
		while(true){
			str = str.substring(0,str.length-1);
			if(realLength(str)<=len){
				$GetEle(elementname).value = str;
				return false;
			}
		}
	}
	return true;
}
function checkLengthfortext(elementname,len,fieldname,msg,msg1)
{
	len = len*1;
	var str = $GetEle(elementname).value;
	if(len!=0 && realLengthOnly(str)>len){
		alert(fieldname+msg+len+","+"("+msg1+")");
		var str2="";
		var flag = true;
		while(true){
			while(flag){
				if(str.length > len){
					str2 = str.substring(0,len);
				}else{
					str2 = str.substring(0,str.length/2);
				}
				str2 = str.substring(0,str.length/2);
				if(realLengthOnly(str2)>len){
					str=str2;
				}else{
					flag=false;
				}
			}
			if(realLengthOnly(str)<=len){
				$GetEle(elementname).value = str;
				return;
			}
			str = str.substring(0,str.length-1);
		}
	}
/*
 * delete by cyril on 2008-08-12 cut error var str=$GetEle(elementname).value;
 * 
 * var j=parseInt(realLength(str)); var len1=parseInt(len);
 * 
 * if (len1!=0) { if (j>len1) { alert(fieldname+msg+len+","+"("+msg1+")"); if
 * (len1<2) { len1=2; }
 * $GetEle(elementname).value=str.substring(0,parseInt(len1/2 - 1)); } }
 */
}

function checkLength4Read(elementname,spanname,len,fieldname,msg,msg1){
	len = len*1;
	var str = $GetEle(elementname).value;
	if(len!=0 && realLengthOnly(str)>len){


		alert(fieldname+msg+len+","+"("+msg1+")");
		var str2="";
		var flag = true;
		while(true){
			while(flag){
				if(str.length > len){
					str2 = str.substring(0,len);
				}else{
					str2 = str.substring(0,str.length/2);
				}
				if(realLengthOnly(str2)>len){
					str=str2;
				}else{
					flag=false;
				}
			}
			if(realLengthOnly(str)<=len){
				$GetEle(elementname).value = str;
				$GetEle(spanname).innerHTML = str;
				return;
			}
			str = str.substring(0,str.length-1);
		}
	}

}

function checkLengthbrow(elementname,spanname,len,fieldname,msg,msg1,demand)
{
var str=$GetEle(elementname).value;

var j=parseInt(realLength(str));
var len1=parseInt(len);

if (len1!=0)
{
if (j>len1)
{
	alert(fieldname+msg+len+","+"("+msg1+")");
	if (len1<2)
	{
		len1=2;
	}
	$GetEle(elementname).value="";
	
	if (demand==1)
	{
		$GetEle(spanname).innerHTML="<img src=\"/images/BacoError.gif\" align=absmiddle>";
	}
	else
	{
		$GetEle(spanname).innerHTML="";
	}

	

}
}
}


function checkLength1(elementname,len,fieldname,langu)
{var msg;
 var msg1;
 if (langu==7)
 {

	msg="�ı����Ȳ��ܳ���";
	msg1="1�������ַ�����2������";
 }
 else if (langu==9)
 {
	msg="�ı��L�Ȳ��ܳ��^"; 
	msg1="1�������ַ����2���L��";	
 }
 else
 {
 msg="text length can not exceed";
 msg1="one gb2312 char equals tow char";
 }
var str=elementname.value;

var j=parseInt(realLength(str));
var len1=parseInt(len);

if (len1!=0)
{
if (j>len1)
{
	alert(fieldname+msg+len+","+"("+msg1+")");
	if (len1<2)
	{
		len1=2;
	}
	elementname.value=str.substring(0,parseInt(len1/2 - 1));
}
}
}

/* һ��ҳ���ж��������ͬ���ı���ʱ���������������Ƿ�Ϊ���֣�����С���� */
function check_number(objectname){
   for( var i=0;i<document.getElementsByName(objectname).length;i++){
     if(checkinputnumber(document.getElementsByName(objectname)[i].value)){
         document.getElementsByName(objectname)[i].value = "";
     } 
   }
}
function checkinputnumber(objectname){
	valuechar = objectname.split("");
	isnumber = false ;
	for(i=0 ; i<valuechar.length ; i++) { 
	    charnumber = parseInt(valuechar[i]) ; 
	    if( isNaN(charnumber)&& valuechar[i]!=".") 
	    isnumber = true ;
	}
	return isnumber;
}
// ȡ�������������ĺ�ɫ��̾��
function checkinput2(elementname,spanid,viewtype){
	if (wuiUtil.isNullOrEmpty(viewtype)) {
		viewtype = $G(elementname).getAttribute("viewtype");
	}
	
	if(viewtype==1){
		var tmpvalue = "";
		try{
			tmpvalue = $GetEle(elementname).value;
		}catch(e){
			tmpvalue = $GetEle(elementname).value;
		}
		while(tmpvalue.indexOf(" ") >= 0){
			tmpvalue = tmpvalue.replace(" ", "");
		}
		while(tmpvalue.indexOf("\r\n") >= 0){
			tmpvalue = tmpvalue.replace("\r\n", "");
		}
		if(tmpvalue!=""){
			$GetEle(spanid).innerHTML = "";
		}else{
			$GetEle(spanid).innerHTML = "<IMG src='/images/BacoError.gif' align=absMiddle>";
			$GetEle(elementname).value = "";
		}
	}
}
function checkinput3(elementname,spanid,viewtype){
	if (viewtype == undefined || viewtype == null) {
		viewtype = elementname.getAttribute('viewtype');
		if (viewtype == undefined || viewtype == null) {
			try {
				var callerStr = checkinput3.caller.toString();
				var param = callerStr.substring(callerStr.indexOf("checkinput3("), callerStr.indexOf(".viewtype)")).split(",");
				
				var targetfield = jQuery.trim(param[param.length - 1]);
				viewtype = $G(targetfield).getAttribute("viewtype");
			} catch (e) {
				viewtype = 0;
			}
		}
	}
	
	if(viewtype==1){
		var tmpvalue = elementname.value;

		while(tmpvalue.indexOf(" ") >= 0){
			tmpvalue = tmpvalue.replace(" ", "");
		}
		while(tmpvalue.indexOf("\r\n") >= 0){
			tmpvalue = tmpvalue.replace("\r\n", "");
		}
		if(tmpvalue!=""){
			 spanid.innerHTML='';
		}else{
			spanid.innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
			elementname.value = "";
		}
    }
}
function ajaxinit(){
    var ajax=false;
    try {
        ajax = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            ajax = false;
        }
    }
    if (!ajax && typeof XMLHttpRequest!='undefined') {
    ajax = new XMLHttpRequest();
    }
    return ajax;
}
function changeshowattr(fieldid,fieldvalue,rownum,workflowid,nodeid){
    len = document.forms[0].elements.length;
    var ajax=ajaxinit();
    ajax.open("POST", "/workflow/request/WorkflowChangeShowAttrAjax.jsp", true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    ajax.send("workflowid="+workflowid+"&nodeid="+nodeid+"&fieldid="+fieldid+"&fieldvalue="+fieldvalue);
    // ��ȡִ��״̬
    ajax.onreadystatechange = function() {
        // ���ִ��״̬�ɹ�����ô�Ͱѷ�����Ϣд��ָ���Ĳ���
        if (ajax.readyState == 4 && ajax.status == 200) {
            try{
            var returnvalues=ajax.responseText;
            if(returnvalues!=""){
                var tfieldid=fieldid.split("_");
                var isdetail=tfieldid[1];
                var fieldarray=returnvalues.split("&");
                for(n=0;n<fieldarray.length;n++){
                    var fieldattrs=fieldarray[n].split("$");
                    var fieldids=fieldattrs[0];
                    var fieldattr=fieldattrs[1];
                    var fieldidarray=fieldids.split(",");
                    if(fieldattr==-1){ // û�������������ָ�ԭֵ�ͻָ�ԭ��ʾ����
                        for(i=0;i<len;i++){
                            for(j=0;j<fieldidarray.length;j++){
                                var tfieldidarray=fieldidarray[j].split("_");
                                if (tfieldidarray[1]==isdetail){
                                    if(rownum>-1){  // ��ϸ�ֶ�
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]+"_"+rownum&&$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum)){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum).value;
                                            if($GetEle('field'+tfieldidarray[0]+"_"+rownum+"span")){
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if(isedit==3){
                                                	document.forms[0].elements[i].setAttribute('viewtype','1');
                                                    if(document.forms[0].elements[i].value==""&&$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError.gif")<=0) $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
                                                    try{
														if(document.forms[0].elements[i].value==""&&$GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError.gif")<=0){
															$GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
															$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
														}
													}catch(e){}
                                                    if(checkstr_.indexOf("field"+tfieldidarray[0]+"_"+rownum+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0]+"_"+rownum;
                                                }
                                                if(isedit==2){
                                                	document.forms[0].elements[i].setAttribute('viewtype','0');
                                                    if($GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError.gif")>-1) $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                    try{
														if($GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError.gif")>-1){
															$GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
														}
													}catch(e){}
													$GetEle("needcheck").value=checkstr_.replace("field"+tfieldidarray[0]+"_"+rownum+",","");
                                                }
                                            }
                                        }
                                    }else{     // ���ֶ�
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]&&$GetEle('oldfieldview'+tfieldidarray[0])){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]).value;
                                            if($GetEle('field'+tfieldidarray[0]+"span")){
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if(isedit==3) {
                                                	document.forms[0].elements[i].setAttribute('viewtype','1');
                                                    if(document.forms[0].elements[i].value=="") $GetEle('field'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
                                                    try{
														if(document.forms[0].elements[i].value==""){
															$GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
															$GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
														}
													}catch(e){}
                                                    if(checkstr_.indexOf("field"+tfieldidarray[0]+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0];
                                                }
                                                if(isedit==2) {
                                                	document.forms[0].elements[i].setAttribute('viewtype','0');
                                                    if($GetEle('field'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError.gif")>-1) $GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
                                                    try{
														if($GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError.gif")>-1){
															$GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="";
														}
													}catch(e){}
													$GetEle("needcheck").value=checkstr_.replace("field"+tfieldidarray[0]+",","");
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(fieldattr==1){// Ϊ�༭����ʾ������Ϊ�༭
                        for(i=0;i<len;i++){
                            for(j=0;j<fieldidarray.length;j++){
                                var tfieldidarray=fieldidarray[j].split("_");
                                if (tfieldidarray[1]==isdetail){
                                    if(rownum>-1){  // ��ϸ�ֶ�
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]+"_"+rownum&&$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum)){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum).value;
                                            if(isedit>1&&$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span")){
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if($GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError.gif")>-1) $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
                                                try{
													if($GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError.gif")>-1){
														$GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
													}
												}catch(e){}
                                                $GetEle("needcheck").value=checkstr_.replace("field"+tfieldidarray[0]+"_"+rownum+",","");
                                                document.forms[0].elements[i].setAttribute('viewtype','0');
                                            }
                                        }
                                    }else{     // ���ֶ�
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]&&$GetEle('oldfieldview'+tfieldidarray[0])){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]).value;
                                            if(isedit>1&&$GetEle('field'+tfieldidarray[0]+"span")){
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if($GetEle('field'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError.gif")>-1) $GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
                                                try{
													if($GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML.indexOf("/images/BacoError.gif")>-1){
														$GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="";
													}
												}catch(e){}
                                                $GetEle("needcheck").value=checkstr_.replace("field"+tfieldidarray[0]+",","");
                                                document.forms[0].elements[i].setAttribute('viewtype','0');
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(fieldattr==2){// Ϊ�����ʾ������Ϊ�༭
                        for(i=0;i<len;i++){
                            for(j=0;j<fieldidarray.length;j++){
                                var tfieldidarray=fieldidarray[j].split("_");
                                if (tfieldidarray[1]==isdetail){
                                    if(rownum>-1){  // ��ϸ�ֶ�
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]+"_"+rownum&&$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum)){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]+"_"+rownum).value;
                                            if(isedit>1&&$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span")){
                                                if(document.forms[0].elements[i].value==""&&$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError.gif")<=0) $GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
                                                try{
													if(document.forms[0].elements[i].value==""&&$GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML.indexOf("/images/BacoError.gif")<=0){
														$GetEle('field_lable'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
														$GetEle('field'+tfieldidarray[0]+"_"+rownum+"span").innerHTML="";
													}
												}catch(e){}
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if(checkstr_.indexOf("field"+tfieldidarray[0]+"_"+rownum+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0]+"_"+rownum;
                                                document.forms[0].elements[i].setAttribute('viewtype','1');
                                            }
                                        }
                                    }else{     // ���ֶ�
                                        if(document.forms[0].elements[i].name=='field'+tfieldidarray[0]&&$GetEle('oldfieldview'+tfieldidarray[0])){
                                            isedit=$GetEle('oldfieldview'+tfieldidarray[0]).value;
                                            if(isedit>1&&$GetEle('field'+tfieldidarray[0]+"span")){
                                                if(document.forms[0].elements[i].value=="") $GetEle('field'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
                                                try{
													if(document.forms[0].elements[i].value==""){
														$GetEle('field_lable'+tfieldidarray[0]+"span").innerHTML="<IMG src='/images/BacoError.gif' align=absMiddle>";
														$GetEle('field'+tfieldidarray[0]+"span").innerHTML="";
													}
												}catch(e){}
                                                var checkstr_=$GetEle("needcheck").value+",";
                                                if(checkstr_.indexOf("field"+tfieldidarray[0]+",")<0) $GetEle("needcheck").value=checkstr_+"field"+tfieldidarray[0];
                                                document.forms[0].elements[i].setAttribute('viewtype','1');
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
                // alert($GetEle("needcheck").value);
            }catch(e){}
        }
    }
}
function  upWord()
{
if(top.document.body.style.zoom!=0) 
top.document.body.style.zoom*=1.1; 
else top.document.body.style.zoom=1.1;
}

function  lowWord()
{
if(top.document.body.style.zoom!=0) 
	top.document.body.style.zoom*=0.9; 
else top.document.body.style.zoom=0.9;
}

function changeToThousands(inputfieldname){
    sourcevalue = $GetEle(inputfieldname).value;
    if(sourcevalue.indexOf(".")<0)
        re = /(\d{1,3})(?=(\d{3})+($))/g;
    else
        re = /(\d{1,3})(?=(\d{3})+(\.))/g;
    tovalue = sourcevalue.replace(re,"$1,");
    $GetEle(inputfieldname).value = tovalue;
}

function changeToNormalFormat(inputfieldname){
    sourcevalue = $GetEle(inputfieldname).value;
    tovalue = sourcevalue.replace(/,/g,"");
    $GetEle(inputfieldname).value = tovalue;
}
function getFckText(fckValue){
	var textValue = "";
	try{
    	while(fckValue.indexOf("</p>") >= 0){
			fckValue = fckValue.replace("</p>", "_=+=_");
		}
		while(fckValue.indexOf("</P>") >= 0){
			fckValue = fckValue.replace("</P>", "_=+=_");
		}
		var div = document.createElement("div");
		div.innerHTML = fckValue;
		fckValue = div.innerText;

		while(fckValue.indexOf("_=+=_") >= 0){
			fckValue = fckValue.replace("_=+=_", "&dt;&at;");
		}
		textValue = fckValue;
	}catch(e){
	}
	return textValue;
}

// ***********************************************************************
// ������ ��checkMaxLength��TD9084��
// ���ܸ�Ҫ ����ָ���ַ������ֽڳ���ȡ������ʱ������ʾ����������ȥ��
// ����˵�� ��obj ��������
// ע�⣺�����maxlength��alt���趨��altΪ��Ϣ����
// ����ֵ ��
// ***********************************************************************
function checkMaxLength(obj){
	var tmpvalue = obj.value;
	var size = obj.maxLength;
	if(realLength(tmpvalue) > size){
		alert(obj.alt);
		while(true){
			tmpvalue = tmpvalue.substring(0,tmpvalue.length-1);
			if(realLength(tmpvalue)<=size){
				obj.value = tmpvalue;
				return;
			}
		}
	}
}
function doshowmrsndiv(fieldid){
	try{
		document.getElementById("mrsnspan"+fieldid).style.display = "";
		document.getElementById("mrsnaspan"+fieldid).style.display = "none";
	}catch(e){
		alert(e);
	}
}

function enablePhraseselect(){
	try{
		document.getElementById("phraseselect").disabled = true;
	}catch(e){}
}
function displayPhraseselect(){
	try{
		document.getElementById("phraseselect").disabled = false;
	}catch(e){}
}

function getEvent() {
	if (window.ActiveXObject) {
		return window.event;// �����ie
	}
	func = getEvent.caller;
	while (func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
					|| (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func = func.caller;
	}
	return null;
}

/**
 * ���ݱ�ʶ��name����id����ȡԪ�أ���Ҫ���ڽ��ϵͳ�кܶ�Ԫ��û��id���ԣ�
 * ȴ��js��ʹ��document.getElementById(name)����ȡԪ�ص����⡣
 * @param identity name����id
 * @return Ԫ��
 */
function $GetEle(identity, _document) {
	var rtnEle = null;
	if (_document == undefined || _document == null) _document = document;
	
	rtnEle = _document.getElementById(identity);
	if (rtnEle == undefined || rtnEle == null) {
		rtnEle = _document.getElementsByName(identity);
		if (rtnEle.length > 0) rtnEle = rtnEle[0];
		else rtnEle = null;
	}
	return rtnEle;
}
function autoFrameSize(down) { 
	var pTar = null; 
	if (document.getElementById){ 
		pTar = document.getElementById(down); 
	} else{ 
		eval('pTar = ' + down + ';'); 
	} 
	if (pTar && !window.opera){ 
		//begin resizing iframe 
//		pTar.style.display="block" 
		if (pTar.contentDocument && pTar.contentDocument.body.offsetHeight){ 
			//ns6 syntax 
			pTar.height = pTar.contentDocument.body.offsetHeight + 20; 
			pTar.width = pTar.contentDocument.body.scrollWidth + 20; 
		} else if (pTar.Document && pTar.Document.body.scrollHeight){ 
			//ie5+ syntax 
			pTar.height = pTar.Document.body.scrollHeight; 
			pTar.width = pTar.Document.body.scrollWidth; 
		} 
	} 
}