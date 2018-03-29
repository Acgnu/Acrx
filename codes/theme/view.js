$(function() {
	$('#picker').farbtastic(function(color){
		chrome.tabs.executeScript(null, {file:"codes/svc/inject.js", allFrames: true});
		$('#color').val(color)
	});
	
	//初始化数据
	chrome.storage.local.get(['type', 'val'], function(data){
		if(data){
			if(data.type == 'img'){
				$('#txAra').val(data.val);
			}else{
				$('#color').val(data.val);
			}
		}
	});
	
	//设置背景色
	$('#useToBg').click(function(e){
		var color = $('#color').val();
		if(color){
			saveClose({type:'color',val:color});
		}
	});
	
	//设置文字颜色
	$('#useToText').click(function(e){
		var color = $('#color').val();
		if(color){
			saveClose({tColor:color});
		}
	});
	
	//设置背景图片
	$('#useImg').click(function(e){
		var url = $('#txAra').val();
		if(url){
			saveClose({type:'img',val:url});
		}
	});
	
	//返回账号页
	$('#back').click(function(){
		location.href = "../account/account.html";
	});
	
	//重置
	$('#resetBg').click(function(){
		chrome.storage.local.remove(['type', 'val'], function(result){});
	});
});

//保存并关闭窗口
function saveClose(data){
	chrome.storage.local.set(data, function(result){
		chrome.tabs.executeScript(null, {file:"codes/svc/inject.js", allFrames: true});
		window.close();
	});
}