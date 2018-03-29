//chrome.tabs.executeScript(null,{code:"document.body.bgColor='red'"});
chrome.storage.local.get(['type', 'val', 'tColor'], function(data){
	if(data){
		var type = data.type;
		var val = data.val;
		var tColor = data.tColor;
		if(type && type == 'img'){
			document.body.style.backgroundImage="url('" + val + "')";
			document.body.style.backgroundSize="cover";
			document.body.style.backgroundRepeat="no-repeat";
			document.body.style.backgroundAttachment="fixed";
		}else if(type && type == 'color'){
			document.body.style.backgroundColor=val;
		}
		if(tColor){
			document.body.style.color = tColor;
		}
	}
});