document.addEventListener("DOMContentLoaded", () => {
    console.log(document.getElementById('primary').innerHTML)
    retrieveData();
})

function retrieveData(){
    fetch('http://localhost:3000/weapons')
        .then(res => res.json())
        .then(data => initializeWeapons(data))
    fetch('http://localhost:3000/items')
        .then(res => res.json())
        .then(data => initializeBackpack(data))
}

function initializeWeapons(weapons){
    const primary = `<div class="text">${weapons.pistol[2].name}</div>
    <div class="image"><img src=${weapons.pistol[2].image}></div>`
    const secondary = `<div class="text">${weapons.shotgun[3].name}</div>
    <div class="image"><img src=${weapons.shotgun[3].image}></div>`
    const primaryBox = document.getElementById('primary')
    const secondaryBox = document.getElementById('secondary')

    primaryBox.innerHTML = primary
    secondaryBox.innerHTML = secondary
}

function initializeBackpack(items){
    [...document.getElementsByClassName('item-box')].map(i=>{
        i.innerHTML = `<img class = 'item-image' src="${items.health[0].image}" alt ="${items.health[0].name}"></img>`
    })
}

//when you click on an item in the item list, run a function that temporarily saves the item's name and image in two variables.
//that way you can target those variables while dragging, and they will only take up space for a second.