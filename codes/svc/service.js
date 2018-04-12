//chrome.browserAction.setPopup({tabId:2, popup:'codes/account/account.html'});
var remAccount = {};	//用于临时存储刚刚键入的账号密码以及域名信息

//chrome.tabs.onCreated.addListener(function(tab) {
//});

//当页面刷新的时候触发
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	//针对部分跳转的页面(例如百度)，重绘背景
	//chrome.tabs.executeScript(null, {file:"codes/svc/inject.js", allFrames: true});
	
	//更新完毕的时候触发
	if(changeInfo.status == 'complete'){
		if(!remAccount.pwd){
			return;
		}
		
		//alert(remAccount.account[0] + '\n' + remAccount.pwd);
		
		//chrome.pageAction.show(tabId);
		
		//可以在此保存
		//$.post('http://localhost:8032/Alishopindex.do', {}, function(r){
			
		//}, 'json');
		
		//使用之后就清空
		remAccount = {};
	}
});

//用于接收来自扩展的消息
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(sender.id == 'beinnhinfdmjbpcimapccnoacfbfhkin'){		//仅接收来自本扩展的消息
		remAccount.domain = request.domain.substring(request.domain.indexOf('.') + 1, request.domain.length);
		remAccount.account = request.account;
		remAccount.pwd = request.pwd;
	}
});