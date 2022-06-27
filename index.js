document.addEventListener("DOMContentLoaded", () => {
    console.log(document.getElementById('primary').innerHTML)
    retrieveData();
})

function retrieveData(){
    fetch('http://localhost:3000/weapons')
        .then(res => res.json())
        .then(data => initializeWeapons(data))
}
//data.ars[0].name
//data.smgs[0].name

function initializeWeapons(weapons){
    const primary = `${weapons.ars[0].name.toUpperCase()}
    <img src=${weapons.ars[0].image}>`
    const secondary = `${weapons.smgs[0].name.toUpperCase()}
    <img src=${weapons.smgs[0].image}>`
    const primaryBox = document.getElementById('primary')
    const secondaryBox = document.getElementById('secondary')

    primaryBox.innerHTML = primary
    secondaryBox.innerHTML = secondary
}

function initializeBackpack(){
    
}