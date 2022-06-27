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
    //map through all divs in backpack and fill them with shield cells
}

//when you click on an item in the item list, run a function that temporarily saves the item's name and image in two variables.
//that way you can target those variables while dragging, and they will only take up space for a second.