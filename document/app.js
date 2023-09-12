const d = new Date();
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January","February","March","April","May","June","July","August","September","October","November","September"];
var timeData = {
    whichDay: days[d.getDay()],
    whichMonth: months[d.getMonth()],
    whichYear: d.getFullYear(),
    whichDate: d.getDate(),
    whichTime: `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}
var totalTimeFormat = `${timeData.whichTime} ${timeData.whichDay}, ${timeData.whichMonth} ${timeData.whichDate}, ${timeData.whichYear}`;

    // HTML ELEMENTS
var page = document.getElementById("page");
var backgroundSheet = document.getElementById("background");
var documentTitleInput = document.getElementById("document-title-input");
var documentLettersizeInput = document.getElementById("document-lettersize-input");
var documentLinespaceInput = document.getElementById("document-linespace-input");
var documentFontInput = document.getElementById("document-font-input");
var manifest = document.getElementById("manifest");

    // CREATE DATA
var doc = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    textColor: "black",
    textSize: "12px",
    font: "IBM Plex Sans",
    lineSpace: 1,
    keyboard: "latin",
    align: "left"
};
var file = {
    folder: null,
    idNumber: null,
    docName: null,
    content: null
}
    // "<URL> #/ USERNAME / FILE / FOLDER / FILE_NUMBER" FORMAT
var filePath = window.location.hash.split("/")[1];
    // GET USER NAME FROM URL
var user = window.location.hash.split("#")[1].split("/")[0];
    // SET FILE_PATH T0 "USERNAME / FILE / FOLDER / FILE_NUMBER"
if (filePath.indexOf("file/") != -1) {
    file = {
        folder: filePath.split("file/")[1].split("/")[0],
            // GET FOLDER NAME FROM URL ^
        idNumber: filePath.slice(filePath.lastIndexOf("/"), filePath.length),
            // GET FILE ID NUMBER ^
        docName: localStorage.getItem(`${file.folder}/${file.idNumber}/name`),
            // GET DOCUMENT NAME ^
        content: localStorage.getItem(`${file.folder}/${file.idNumber}/content`)
            // GET ACTUAL WRITTEN DOCUMENT CONTENT TO DISPLAY ON PAGE ^
    } 
} else if (filePath === "new") {
    file = {
        folder: "main",
        idNumber: Math.round(Math.random() * (10**9)),
        docName: "Untitled document",
        content: ""
    }
    filePath = `file/${file.folder}/${file.idNumber}`;
    localStorage.setItem(`${filePath}/name`, docName);
    localStorage.setItem(`${filePath}/content`, "");
}

//load correct app icon sizes
if (navigator.platform.toLowerCase().indexOf("mac") != -1) {
    manifest.href = "apple-manifest.json";
}
function applyCSS(elmnt,cssSpecification,cssStyle) {
    elmnt.style.cssSpecification = cssStyle;
}
function save() {
        // STORE DOCUMENT CONTENT AND NAME
    localStorage.setItem(`${filePath}/content`, page.value);
    localStorage.setItem(`${filePath}/name`, documentTitleInput.value);

        // UPDATE DOCUMENT STYLE
    var pageLayers = [page,backgroundSheet];
        // TEXT_SIZE INPUT
    doc.textSize = documentLettersizeInput.value;
    for (let i = 0; i < pageLayers.length; i++) {
        applyCSS(pageLayers[i].style,fontSize,doc.textSize);
    }
        // LINE_SPACE INPUT
    doc.lineSpace = documentLinespaceInput.value;
    for (let i = 0; i < pageLayers.length; i++) {
        applyCSS(pageLayers[i].style,lineHeight,doc.lineSpace);
    }
        // FONT NAME INPUT
    doc.font = documentFontInput.value;
    for (let i = 0; i < pageLayers.length; i++) {
        applyCSS(pageLayers[i].style,fontFamily,doc.font);
    }
}
function text() {
	backgroundSheet.innerHTML = `<p>${page.value}</p>`;
    save();
}

page.addEventListener("keyup", text);

    // ADD ONKEYUP FUNCTION TO UPDATE DETAILS FROM ANY INPUT ELEMENT
for (let i = 0; i < document.getElementsByTagName("input").length; i++) {
    document.getElementsByTagName("input")[i].addEventListener("keyup", save);
}