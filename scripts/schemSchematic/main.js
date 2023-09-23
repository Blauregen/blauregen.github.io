let file = null;
let blob = null;
let name = null;


let uploadText = document.getElementById("uploadText")
let dropbox = document.getElementById("uploadLabel")
let inputBox = document.getElementById("schematicUpload");
let downloadBox = document.getElementById("downloadBox");
let fileDownload = document.getElementById("fileDownload");
let currentAccount;

dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
inputBox.addEventListener("input", select, false);

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

    console.log("File dropped");
    file = e.dataTransfer.files[0];
    handleFiles(file);
}

function select(e) {
    file = e.srcElement.files[0];
    handleFiles(file);
}

function handleFiles(file) {
    console.log('Processing ' + file.name);
    let fr = new FileReader();
    fr.onload = function () {
        schemtoschematic(fr.result, function (data) {
            name = file.name;

            if (~name.lastIndexOf('.')) {
                name = name.substr(0, name.lastIndexOf('.'));
            }

            name += '.schematic';

            blob = new Blob([data], {type: 'application/nbt'});
            uploadText.classList.remove("withoutInput")
            uploadText.classList.add("withInput")
            dropbox.innerHTML += `
                <img src="../media/Document.png" alt="Document" id="file">
                <p id="fileName">${file.name}</p>
            `
            dropbox.classList.remove("DLBDisabled")
            dropbox.classList.add("DLBEnabled")
            downloadBox.innerHTML += `
                <p class="withInput" id="downloadText">Download your converted file here</p>
                <img src="../media/Document.png" alt="Document" id="file">
                <p id="fileName">${name}</p>
            `
            downloadBox.style.display = "inherit"
            if (localStorage.getItem("loggedIn") === "true") {
                upload()
            }
        });
    };
    fr.readAsArrayBuffer(file);
}

function download() {
    fileDownload.href = window.URL.createObjectURL(blob);
    fileDownload.download = name;
    fileDownload.click()
}

function upload() {
    currentAccount = localStorage.getItem("currentAccount");
    if (currentAccount.schemFiles === null) {
        currentAccount.schemFiles = [];
    } else {
        currentAccount = JSON.parse(currentAccount);
    }
    currentAccount.schemFiles.push({
        name: name,
        file: blob
    })
    localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
    for (let i = 0; i < accounts.length; i++) {
        if (currentAccount.username === accounts[i].username) {
            accounts[i] = currentAccount;
            localStorage.setItem("accounts", JSON.stringify(accounts));
            return;
        }
    }
}
