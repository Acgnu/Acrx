//获取当前选中窗口
chrome.tabs.getSelected(null, function(tab){  
	var domain = getDomain(tab.url);
	$('#current_domain').text(domain);
	setAccount(domain);
 })
 
 //跳转到背景变更页
 $(function(){
	 $('.page_next').click(function(){
		location.href = "../theme/view.html";
	 });
 });

//点击“复制”事件
new ClipboardJS('.btn_copy', {
	text: function(trigger) {
		return $(trigger).prev().text();
	}
});

//检索账号
function setAccount(host){
	//$.post('https://wxzd.shop.tiaowulan.com/Alishopindex.do', {}, function(r){
	//	console.log(r);
	//}, 'json');
	
	//目前采用本地json的方式存储
	 $.getJSON('../../data/accounts.json', function(data){
		for(var h in data){
			if(data[h].domain == host){
				var htm = '';
				for(var accounts in data[h].accounts){
					var account = data[h].accounts[accounts];
					htm += '<li><hr /></li>';
					htm += '<li>可用账号：<span>' + account.account + '</span><button class = "btn_copy">复制</button><br/></li>';
					htm += '<li>可用密码：<span>' + account.pwd + '</span><button class = "btn_copy">复制</button></li>';
				}
				$('#account_ul').append(htm);
				return;
			}
		}
		$('#account_ul').append('<li>暂无可用账号</li>');
	 });
}