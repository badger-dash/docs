var page = document.getElementById("page");
var backgroundSheet = document.getElementById("background");

function text() {
	backgroundSheet.innerHTML = `<p>${page.value}</p>`;
}

page.addEventListener("keyup", text);