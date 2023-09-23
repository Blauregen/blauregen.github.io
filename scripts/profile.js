let profilePictureInput = document.getElementById("profileImageUpload");
let profilePicture = document.getElementById("profilePicture");
let usernameBox = document.getElementById("username");
let emailBox = document.getElementById("email");
let changeBox = document.getElementById("changeBox");
let recentUploadsBox = document.getElementById("fileList");
let fileDownload = document.getElementById("fileDownload");
let newUsernameInput;
let oldPasswordInput;
let newPasswordInput;
let newEmailInput;
let schematicUploads;
profilePictureInput.addEventListener("change", profilePictureChange, false);
currentAccount = JSON.parse(localStorage.getItem("currentAccount"));

function profilePictureChange() {
    profilePicture.src = URL.createObjectURL(profilePictureInput.files[0]);
    currentAccount.profilePic = profilePicture.src;
    localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
    for (let i = 0; i < accounts.length; i++) {
        if (currentAccount.username === accounts[i].username) {
            accounts[i].profilePic = currentAccount.profilePic;
            localStorage.setItem("accounts", JSON.stringify(accounts));
        }
    }
}

function changeUsername() {
    changeBox.style.opacity = "1";
    changeBox.innerHTML = "<div id='close' onclick='closeChangeBox()'><div class='leftright'></div><div class='rightleft'></div></div><input type='text' id='newUsername' placeholder='New Username'><button onclick='saveUsername()' id='submitUsernameChange'>Save</button>"
    newUsernameInput = document.getElementById("newUsername");
    newUsernameInput.addEventListener("keypress", enterkeyUsername, false);
}

function changeEmail() {
    changeBox.style.opacity = "1";
    changeBox.innerHTML = "<div id='close' onclick='closeChangeBox()'><div class='leftright'></div><div class='rightleft'></div></div><input type='email' id='newEmail' placeholder='New Email'><button onclick='saveEmail()' id='submitEmailChange'>Save</button>"
    newEmailInput = document.getElementById("newEmail");
    newEmailInput.addEventListener("keypress", enterkeyEmail, false);
}

function changePassword() {
    changeBox.style.opacity = "1";
    changeBox.innerHTML = "<div id='close' onclick='closeChangeBox()'><div class='leftright'></div><div class='rightleft'></div></div><input type='password' id='oldPassword' placeholder='Old Password'><input type='password' id='newPassword' placeholder='New Password'><button onclick='savePassword()' id='submitPasswordChange'>Save</button>"
    oldPasswordInput = document.getElementById("oldPassword");
    newPasswordInput = document.getElementById("newPassword");
    oldPasswordInput.addEventListener("keypress", enterkeyPassword, false);
}

function enterkeyUsername(e) {
    console.log(e.keyCode)
    if (e.keyCode === 13) {
        saveUsername()
    }
}

function enterkeyEmail(e) {
    console.log(e.keyCode)
    if (e.keyCode === 13) {
        saveEmail()
    }
}

function enterkeyPassword(e) {
    console.log(e.keyCode)
    if (e.keyCode === 13) {
        savePassword()
    }
}

function saveUsername() {
    let newUsername = document.getElementById("newUsername").value;
    if (newUsername === "") {
        alert("Username can't be empty!");
        return;
    }
    for (let i = 0; i < accounts.length; i++) {
        if (newUsername === accounts[i].username) {
            alert("Username already taken!");
            return;
        }
    }
    for (let i = 0; i < accounts.length; i++) {
        if (currentAccount.username === accounts[i].username) {
            console.log("test")
            accounts[i].username = newUsername;
            localStorage.setItem("accounts", JSON.stringify(accounts));
        }
    }
    currentAccount.username = newUsername;
    localStorage.setItem("currentAccount", JSON.stringify(currentAccount));

    location.reload();
}

function saveEmail() {
    let newEmail = document.getElementById("newEmail").value;
    if (newEmail === "") {
        alert("Email can't be empty!");
        return;
    }

    let containsAt = false;
    for (let i = 0; i < newEmail.length; i++) {
        if (newEmail[i] === "@") {
            containsAt = true;
        }
    }
    if (!containsAt) {
        alert("Invalid email!");
        return;
    }

    for (let i = 0; i < accounts.length; i++) {
        if (currentAccount.username === accounts[i].username) {
            accounts[i].email = newEmail;
            localStorage.setItem("accounts", JSON.stringify(accounts));
        }
    }
    currentAccount.email = newEmail;
    localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
    location.reload();
}

function savePassword() {
    let oldPassword = document.getElementById("oldPassword").value;
    let newPassword = document.getElementById("newPassword").value;
    if (oldPassword === "" || newPassword === "") {
        alert("Password filed can't be empty!");
        return;
    }
    for (let i = 0; i < accounts.length; i++) {
        if (currentAccount.username === accounts[i].username) {
            if (oldPassword === accounts[i].password) {
                accounts[i].password = newPassword;
                localStorage.setItem("accounts", JSON.stringify(accounts));
                currentAccount.password = newPassword;
                localStorage.setItem("currentAccount", JSON.stringify(currentAccount));
                location.reload();
            } else {
                alert("Wrong old password!");
                return;
            }
        }
    }
}

function closeChangeBox() {
    changeBox.style.opacity = "0";
    setTimeout(function () {
        changeBox.innerHTML = "";
    }, 500);
}

function generateProfile() {
    if (currentAccount.profilePic === null || currentAccount.profilePic === "") {
        profilePicture.src = "../media/standardProfilePicture.jpg"
    } else {
        profilePicture.src = "../media/testfiles/profilePic.png"
    }
    usernameBox.innerHTML += currentAccount.username;
    emailBox.innerHTML += currentAccount.email;
    for (let i = 0; i < currentAccount.schemFiles.length; i++) {
        recentUploadsBox.innerHTML += `
        <div onclick="downloadStoredFile(this)">
            <img src="../media/Document.png" alt="Document">
            <p class="schemName">${currentAccount.schemFiles[i].name}</p>
        </div>
        `
    }
}

function downloadStoredFile(itemName) {
    itemName = itemName.children[1].innerHTML
    for (let i = 0; i < currentAccount.schemFiles.length; i++) {
        if (itemName === currentAccount.schemFiles[i].name) {
            fileDownload.href = "../media/testfiles/mountain-hut-aventus.schematic"
            fileDownload.click()
            return;
        }
    }
}

generateProfile()