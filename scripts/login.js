let storageAccounts = localStorage.getItem("accounts");
let accounts = JSON.parse(storageAccounts);
let loggedIn = localStorage.getItem("loggedIn");
let navList = document.getElementById("navList")
let loginButton = document.createElement('li');
let body = document.getElementsByTagName("body")[0]

let loginBox
let loginPart
let registerPart
let usernameLoginInput
let passwordLoginInput
let usernameRegisterInput
let passwordRegisterInput
let emailRegisterInput

if (loggedIn === null || loggedIn === 'false'){
    loginButton.innerHTML = '<div onclick="openLogin()" id="login">Login</div>'
    navList.appendChild(loginButton)
    generateLogin()

    loginBox = document.getElementById("loginBox");
    loginPart = document.getElementById("loginPart");
    registerPart = document.getElementById("registerPart");
    usernameLoginInput = document.getElementById("loginUsername");
    passwordLoginInput = document.getElementById("loginPassword");
    usernameRegisterInput = document.getElementById("registerUsername");
    passwordRegisterInput = document.getElementById("registerPassword");
    emailRegisterInput = document.getElementById("registerEmail");


    usernameRegisterInput.addEventListener("keypress", enterkeyRegister, false)
    passwordRegisterInput.addEventListener("keypress", enterkeyRegister, false)
    emailRegisterInput.addEventListener("keypress", enterkeyRegister, false)
    usernameLoginInput.addEventListener("keypress", enterkeyLogin, false)
    passwordLoginInput.addEventListener("keypress", enterkeyLogin, false)

}
else if (document.title === "AIOL - Profile"){
    loginButton.innerHTML = '<a href="../index.html" onclick="logout()">Logout</a>'
    navList.appendChild(loginButton)
}

else {
    if (document.title === "Minecraft AIOL"){
        loginButton.innerHTML = '<a href="./pages/profile.html">Profile</a>'
    }
    else {
        loginButton.innerHTML = '<a href="./profile.html">Profile</a>'
    }
    navList.appendChild(loginButton)
}

function generateLogin() {
    body.innerHTML += `
    <div id="loginBox" class="loginHidden">

        <div id="close" onclick="closeLogin()">
            <div class="leftright"></div>
            <div class="rightleft"></div>
        </div>

        <div id="loginPart">
            <p id="loginTitle">Login to AIOL</p>
            <form method="GET">
                <input type="text" name="username" id="loginUsername" placeholder="Username" required>
                <input type="password" name="password" id="loginPassword" placeholder="Password" required>
                <input type="button" value="Login" id="loginButton" onclick="login()">
            </form>
            <div id="changeToRegister" onclick="changeToRegister()">Don't have an account? <span>Register!</span></div>
        </div>
        <div id="registerPart">
            <p id="loginTitle">Register at AIOL</p>
            <form method="get">
                <input type="text" name="username" id="registerUsername" placeholder="Username" required>
                <input type="email" name="email" id="registerEmail" placeholder="Email Adress" required>
                <input type="password" name="password" id="registerPassword" placeholder="Password" required>
                <input type="button" value="Register" id="registerButton" onclick="register()">
            </form>
            <div id="changeToLogin" onclick="changeToLogin()">Already have an account? <span>Log in!</span></div>
        </div>
    </div>
    `
}

function openLogin() {
    loginBox.classList.remove("loginHidden")
    loginBox.classList.add("loginShown")
}
function closeLogin() {
    loginBox.classList.remove("loginShown")
    loginBox.classList.add("loginHidden")
}

function changeToRegister() {
    loginPart.style.opacity = "0"
    loginPart.style.display = "none"
    registerPart.style.display = "block"
    registerPart.style.opacity = "1"
}

function changeToLogin() {
    registerPart.style.opacity = "0"
    registerPart.style.display = "none"
    loginPart.style.display = "block"
    loginPart.style.opacity = "1"
}

function enterkeyLogin(e) {
    if (e.keyCode === 13) {
        login()
    }
}

function enterkeyRegister(e) {
    if (e.keyCode === 13) {
        register()
    }
}

function login() {
    if (localStorage.getItem("accounts") === null){
        alert("You don't have an account yet! Please register first!")
        return;
    }

    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].username === username) {
            if (accounts[i].password === password) {
                localStorage.setItem("loggedIn", "true")
                localStorage.setItem("username", username)
                localStorage.setItem("currentAccount", JSON.stringify(accounts[i]))
                currentAccount = accounts[i]
                location.reload()
                return;
            }
            else {
                alert("Wrong password!")
                return;
            }
        }
    }

    alert("No account with this username found! Maybe try registering first? =)")
}

function register() {
    let tempObject = {
        username: document.getElementById("registerUsername").value,
        email: document.getElementById("registerEmail").value,
        password: document.getElementById("registerPassword").value,
        profilePic: "",
        schemFiles: []
    }
    if (localStorage.getItem("accounts") !== null) {
        accounts = JSON.parse(localStorage.getItem("accounts"))
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].username === tempObject.username) {
                alert("Username already taken! Maybe try another one? =)")
                return;
            }
        }
        accounts.push(tempObject)
        localStorage.setItem("accounts", JSON.stringify(accounts))
        localStorage.setItem("loggedIn", "true")
        localStorage.setItem("username", tempObject.username)
        localStorage.setItem("currentAccount", JSON.stringify(tempObject))
        location.reload()
    }
}

function setTestAccounts() {
    let tempSchematic = {
        file: {},
        name: "TestSchematic",
    }
    let user1 = {
        username: "Blauregen",
        email: "blub123@blub.at",
        password: "1234",
        profilePic: "",
        schemFiles: []
    }
    let user2 = {
        username: "BlueTimeAFK",
        email: "blah@blub.at",
        password: "12345",
        profilePic: "",
        schemFiles: []
    }
    let user3 = {
        email:"blaui@testmail.at",
        password:"0000",
        profilePic:"blob:http://127.0.0.1:3000/89818588-c022-472e-a163-d0379c3e9123",
        username: "Blauiii",
        schemFiles: [tempSchematic]
    }

    accounts = [user1, user2, user3]
    localStorage.removeItem("accounts")
    localStorage.setItem("accounts", JSON.stringify(accounts))
    localStorage.removeItem("currentAccount")
    logout()
}

function logout() {
    localStorage.setItem("loggedIn", "false")
    localStorage.setItem("username", "")
    location.reload()
    localStorage.setItem("currentAccount", "")
}
