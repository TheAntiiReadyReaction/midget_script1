var reloaded = false;

if(!location.href.includes("?action=edit")) newPage();

async function edit(){
	if(getCookie("botWait") == "true") await new Promise(resolve => setTimeout(resolve, 15000)); // 15 sec
	document.cookie = "botWait=; expires=Thu, 18 Dec 2099 12:00:00 UTC; path=/"

	// sets cookie for page name
	document.cookie = `botTitle=${document.getElementsByClassName("ve-init-mw-desktopArticleTarget-title")[0].innerText}; expires=Thu, 18 Dec 2099 12:00:00 UTC; path=/`;

	// saves page
	document.getElementsByClassName("oo-ui-buttonElement-button")[19].click();
}

async function newPage(){
	window.location.href = `https://${new URL(location.href).host}/wiki/${Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}?action=edit`;
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
		}
	}
	return "";
}

setInterval(function(){
	// reloads if bot detected
	if(!reloaded && document.body.innerText.includes("As an anti-abuse measure, you are limited from performing this action too many times in a short space of time, and you have exceeded this limit. Please try again in a few minutes.")){
		reloaded = true;
		document.cookie = "botWait=true; expires=Thu, 18 Dec 2099 12:00:00 UTC; path=/"
		location.reload();
	} else if(!reloaded && !document.getElementsByClassName("ve-init-mw-progressBarWidget-bar")[0]){
		edit();
	}
}, 0);