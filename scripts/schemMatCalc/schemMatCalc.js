let dropbox = document.getElementById("dropbox");
let inputBox = document.getElementById("schemUpload");
let outputBox = document.getElementById("outputBox");
let clearBox = document.getElementById("clearBox");
let blockInfo = document.getElementById("blockInfo");
let specifiedBlockInfo = document.getElementById("infos");
let blockName = document.getElementById("blockNameOverview");
let recipe = document.getElementById("recipe");

let files;
let fileString;
let fileStrings;
let schemMats = [];

dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
inputBox.addEventListener("input", handleFiles, { once: false });
clearBox.addEventListener("click", clear, false);

function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
}

function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
}

function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    handleFiles(e);
}

function clear() { // Clears the outputBox
    outputBox.innerHTML = "";
    files = null;
}

function createBlockInterface() { // Creates single block interface in the outputBox
    outputBox.innerHTML = ""
    for (let i = 0; i < schemMats.length; i++) {
        outputBox.innerHTML +=
            `<div class="output" onclick="showInfo(this)">
        <img src="../media/blocks/${schemMats[i].BlockName}.webp" alt="Block" id="block">
        <p id="blockName">${schemMats[i].BlockName}</p>
        <p id="doubleChests">Doppelkisten: ${schemMats[i].DKs}</p>
        <p id="stacks">Stacks: ${schemMats[i].Stacks}</p>
        <p id="pieces">Stück: ${schemMats[i].Stück}</p>
        </div></a>`
    }
}

function handleFiles(e) { // Handles the file input
    files = null;
    fileString = null;
    fileStrings = null;
    schemMats = [];
    console.log(e);
    setTimeout(clear, 1)

    if (e.type === "drop") {
        console.log("File dropped");
        files = e.dataTransfer.files;
        readFile();
    }
    else if (e.type === "input") {
        console.log("File selected");
        files = e.target.files;
        readFile();
    }

    function readFile() {
        if (files) {
            var r = new FileReader();
            r.onload = function (e) {
                fileString = r.result;
                console.log("File loaded");
            }
            r.readAsText(files[0]);
            
        } else {
            alert("Failed to load file");
        }
        e.target.value = "";
        console.log(e.target.value);
    }
    
    setTimeout(calculate, 1);
}

function calculate() {
    if (fileString == null) {
        console.log("No file selected");
        return;
    }

    let tempObject
    let pattern = /\s{2,}/g;

    fileStrings = fileString.split("\r\n");
    fileStrings.length = fileStrings.length - 1;

    for (let i = 0; i < fileStrings.length; i++) {
        let tempString = fileStrings[i].split(pattern);

        if (tempString[0] === "Carpet") tempString[0] = "White Carpet";

        let blocks = tempString[1];

        let DKs = Math.floor(blocks / (64 * 54));
        blocks = blocks - (DKs * 64 * 54);

        let Stacks = Math.floor(blocks / 64);
        blocks = blocks - (Stacks * 64);

        tempObject = {
            BlockName: tempString[0],
            DKs: DKs,
            Stacks: Stacks,
            Stück: blocks
        }

        schemMats.push(tempObject);
    }
    createBlockInterface();
}

function showInfo(block) {
    blockInfo.classList.add("blockInfoShown");
    blockInfo.classList.remove("blockInfoHidden");
    blockName.innerHTML = block.children[1].innerHTML;
    recipe.src = `../media/blocks/recipes/${block.children[1].innerHTML}.png`;
}

function closeInfo() {
    blockInfo.classList.add("blockInfoHidden");
    blockInfo.classList.remove("blockInfoShown");
}