document.addEventListener("DOMContentLoaded", () => {
    console.log(document.getElementById('primary').innerHTML)
    retrieveData();
})

function retrieveData(){
    fetch('http://localhost:3000/weapons')
        .then(res => res.json())
        .then(data => initializeWeapons(data))
}

function initializeWeapons(weapons){
    const primary = `<div class="text">${weapons.ars[0].name.toUpperCase()}</div>
    <div class="image"><img src=${weapons.ars[0].image}></div>`
    const secondary = `<div class="text">${weapons.smgs[0].name.toUpperCase()}</div>
    <div class="image"><img src=${weapons.smgs[0].image}></div>`
    const primaryBox = document.getElementById('primary')
    const secondaryBox = document.getElementById('secondary')

    primaryBox.innerHTML = primary
    secondaryBox.innerHTML = secondary
}

function initializeBackpack(){
    
}