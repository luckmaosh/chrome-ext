chrome.windows.getCurrent(function (currentWindow) {
	console.log('当前窗口ID：' + currentWindow.id);
});

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	tabs.map(function (tab) {
		console.log("current tab:" + tab.url)
	});
});

// background.js
// 是否显示图片
var showImage;
chrome.storage.sync.get({showImage: true}, function(items) {
    showImage = items.showImage;
});

// web请求监听，最后一个参数表示阻塞式，需单独声明权限：webRequestBlocking
chrome.webRequest.onBeforeRequest.addListener(details => {
	// cancel 表示取消本次请求
	if (!showImage && details.type == 'image') return { cancel: true };
	// 简单的音视频检测
	// 大部分网站视频的type并不是media，且视频做了防下载处理，所以这里仅仅是为了演示效果，无实际意义
	if (details.type == 'media') {
		chrome.notifications.create(null, {
			type: 'basic',
			iconUrl: '../icons/ICON16.png',
			title: '检测到音视频',
			message: '音视频地址：' + details.url,
		});
	}
}, { urls: ["<all_urls>"] }, ["blocking"]);


chrome.tabs.query({
	currentWindow: true,
	pinned: false,
	highlighted: true

}, function (tabs) {

	var domain;
	var url;
	tabs.map(function (tab) {
		console.log("current tab title=" + tab.title + " url=" + tab.url)
		// tab.
		// tab.reload()
		url = tab.url;
		domain = tab.url.split('/'); //以“/”进行分割

		if (domain[2]) {

			domain = domain[2];

		} else {

			domain = ''; //如果url不正确就取空

		}
	})

	console.log("console")

	// 获取单个cookie
	chrome.cookies.getAll({
		url: 'https://test2-web.zhixuezhen.com/'
		// ,
		// name: '_ustat'
	},
		function (cookie) {

			console.log(cookie);
		});


	console.log("domain:" + domain);
	chrome.cookies.remove({
		url: url,
		name: 'jlbsessionid'
	}, function (res) {

		console.log("the cookie has been removed" + res)
		console.log(res)
	})

	// var cook = document.cookie;

	// alert(cook)
	// console.log(tabs);
}
)


// query tabs , and  SAVE MY TABS
chrome.tabs.query({
	currentWindow: true,
	pinned: false
}, function (tabs) {

	tabs = tabs.filter(function (tab) {
		return tab.url.indexOf('chrome://') === -1;
	});

	urlList.innerHTML = tabs.map(function (tab) {
		return '<li>' +
			'<label>帐号：15788998899</label>' +
			'<input id="demo" type="hidden" value="1577777"/>' +
			'<input id="switchAccount"  type="button" value="switch" class="btn"/>' +
			'</li>';
	}).join('');

	// 统计url数量
	counter.innerHTML = '<span>' + tabs.length + '</span> URL' + (tabs.length != 1 ? 's' : '');
});

function myFunction() {
	getElementById('demo').innerHTML = Date();
}

// $('switchAccount').click(function () {
//     console.log("switch account click")
// });

document.addEventListener('DOMContentLoaded', function () {
	$('check').bind('click', Tabs.checkall);
	$('add').bind('click', Tabs.configAddToBookmark);
	$('copy').bind('click', Tabs.copyToClipboard);

	$('create').bind('click', Tabs.configNewFolder);
	$('save').bind('click', Tabs.saveBookmark);
	$('cancel').bind('click', Tabs.cancelAddToBookmark);
	// $('switchAccount').bind('click', Tabs.switchAccount);
});

NodeList.prototype.forEach = Array.prototype.forEach;

NodeList.prototype.map = Array.prototype.map;

String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, '');
};

//判断当前环境，退出当前帐号，登录新的状态
function switchAccount2(str) {

	//获取cookie
	var cook = document.cookie;


}

function htmlEscape(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

function isUrl(s) {
	return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(s);
}