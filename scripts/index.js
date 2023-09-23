let name = document.getElementById("name");

if (localStorage.getItem("username") !== ""){
    name.innerHTML = `${localStorage.getItem("username")}'s`
}