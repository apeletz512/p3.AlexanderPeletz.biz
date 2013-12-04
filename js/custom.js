
activateTab();

function activateTab() {

	//reset all tabs to default/inactive
	var allTabs = document.getElementsByTagName("li");
	for (i = allTabs.length - 1; i >= 0; i--) {
		if ((allTabs[i].id == "loginTab") || (allTabs[i].id == "logoutTab")) {
			allTabs[i].setAttribute("class", "pull-right");
		}
		else if (allTabs[i].id) {
			allTabs[i].setAttribute("class", "");
		}
	}	

	//now check what page we're on by finding a unique element on that page
	var currentTab;
	
	if (document.getElementById("loginBtn")) {
		currentTab = document.getElementById("loginTab");
		currentTab.setAttribute("class", "active pull-right");
	}
	else if (document.getElementById("signupBtn")) {
		currentTab = document.getElementById("signupTab");
		currentTab.setAttribute("class", "active");
	}
	else if (document.getElementById("homeHdr")) {
		currentTab = document.getElementById("homeTab");
		currentTab.setAttribute("class", "active");
	}
	else if (document.getElementById("profileHdr")) {
		currentTab = document.getElementById("profileTab");
		currentTab.setAttribute("class", "active");
	}
	else if (document.getElementById("settings")) {
		currentTab = document.getElementById("settingsTab");
		currentTab.setAttribute("class", "active");
	}
	else if (document.getElementById("others")) {
		currentTab = document.getElementById("findOthersTab");
		currentTab.setAttribute("class", "active");
	}
/*
	if ((currentTab.id == "logoutTab") || (currentTab.id = "loginTab")) {
		currentTab.setAttribute("class","active pull-right");
		window.alert("if - setActive - "+ currentTab.id);
	}
	
	else {
		currentTab.setAttribute("class", "active");
		window.alert("else - setActive - " + currentTab.id);
	}
*/
}
