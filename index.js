const weaponMenu = document.querySelector("#menu")

document.addEventListener("DOMContentLoaded", () => {

    const arButton = document.querySelector("#Assault-Rifles");
    const smgButton = document.querySelector("#SMGs");
    const lmgButton = document.querySelector("#LMGs");
    const marksmanButton = document.querySelector("#Marksman-Weapons");
    const sniperButton = document.querySelector("#Snipers");
    const shotgunButton = document.querySelector("#Shotguns");
    const pistolButton = document.querySelector("#Pistols");
    const menuButton = document.querySelector("#Toggle");

    //button click function that takes in arguments depending on button to callback on in event listener goes outside of this event listener
    arButton.addEventListener("click", () => buttonClick("ar"))
    smgButton.addEventListener("click", () => buttonClick("smg"))
    lmgButton.addEventListener("click", () => buttonClick("lmg"))
    marksmanButton.addEventListener("click", () => buttonClick("marksman"))
    sniperButton.addEventListener("click", () => buttonClick("sniper"))
    shotgunButton.addEventListener("click", () => buttonClick("shotgun"))
    pistolButton.addEventListener("click", () => buttonClick("pistol"))
    menuButton.addEventListener("click", () => closeMenu())

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
        i.innerHTML = `<img class = 'item-image' src="${items.health[2].image}" alt ="${items.health[0].name}"></img>`
    });
}

function fillHeader(type){
    function fill(arr){
        //maps through array and += new html to header
        arr.map(e => {
            const div = `<div class = 'rack-object'>
            <div class="rack-image"><img src="${e.image}"></div>
            <div class="text">${e.name}</div>
            </div>`
            weaponMenu.innerHTML += div
        })
    };
    function get(t){
        fetch('http://localhost:3000/weapons')
            .then(res => res.json())
            .then(data => fill(data[t]))
    };
    get(type);
}

function buttonClick(type){
    //if header is closed, open it and run fillHeader()
    //if header is open, empty it and run fillHeader()
    if (weaponMenu.style.display === "none") {
        console.log("closed")
        weaponMenu.style.display = "block"
        fillHeader(type)
    } else {
        weaponMenu.innerHTML = ""
        fillHeader(type)
    }
}

function closeMenu(){
    if(weaponMenu.style.display === "block") {
        weaponMenu.innerHTML = ""
        weaponMenu.style.display = "none"
    }
}

//when you click on an item in the item list, run a function that temporarily saves the item's name and image in two variables.
//that way you can target those variables while dragging, and they will only take up space for a second.