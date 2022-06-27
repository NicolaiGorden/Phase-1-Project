document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded!")
    retrieveData();
})

function retrieveData(){
    fetch('http://localhost:3000/weapons')
        .then(res => res.json())
        .then(data => console.log(data))
}