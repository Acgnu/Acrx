/*工具js，需要引用JQ*/

/**
截取二级域名
link: www.abc.com.cn
return: abc.com.cn
**/
function getDomain(link){
	var reg = /^http(s)?:\/\/\w*\.(.*?)\//
	var regResult = reg.exec(link);
	//console.log(regResult)
	if(regResult[2].indexOf('.') == -1){
		reg = /^http(s)?:\/\/(.*?)\//
		regResult = reg.exec(link);
	}
	return regResult[2];
}

/** 
* @param hex 例如:"#23ff45" 
* @param opacity 透明度 
* @returns {string} 
*/ 
function hexToRgba(hex, opacity) { 
return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
}

/** 
* @param rgb 例如:rgb(1, 2, 3)
* @param opacity 透明度 
* @returns {string} 
*/ 
function rgbToRgba(rgb, opacity) { 
	return "rgba" + rgb.substring(3, rgb.indexOf(')')) + ", " + opacity + ")";
}