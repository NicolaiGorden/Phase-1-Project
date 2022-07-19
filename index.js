const weaponMenu = document.querySelector("#menu")
const menuButton = document.querySelector("#Toggle")

document.addEventListener("DOMContentLoaded", () => {

    const arButton = document.querySelector("#Assault-Rifles");
    const smgButton = document.querySelector("#SMGs");
    const lmgButton = document.querySelector("#LMGs");
    const marksmanButton = document.querySelector("#Marksman-Weapons");
    const sniperButton = document.querySelector("#Snipers");
    const shotgunButton = document.querySelector("#Shotguns");
    const pistolButton = document.querySelector("#Pistols");
    const healthButton = document.querySelector("#Health")

    arButton.addEventListener("click", () => buttonClick("ar"))
    smgButton.addEventListener("click", () => buttonClick("smg"))
    lmgButton.addEventListener("click", () => buttonClick("lmg"))
    marksmanButton.addEventListener("click", () => buttonClick("marksman"))
    sniperButton.addEventListener("click", () => buttonClick("sniper"))
    shotgunButton.addEventListener("click", () => buttonClick("shotgun"))
    pistolButton.addEventListener("click", () => buttonClick("pistol"))
    healthButton.addEventListener("click", () => buttonClick("health"))
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
        arr.map(e => {
            const div = `<div class = 'rack-object' draggable="true">
            <div class="rack-image"><img draggable="false" src="${e.image}"></div>
            <div class="text">${e.name}</div>
            </div>`
            weaponMenu.innerHTML += div
        })

        const weapons = document.querySelectorAll(".rack-object")

        if (type === "ar" || type === "smg" || type === "lmg" || type === "marksman" || type === "sniper" || type === "shotgun" || type === "pistol"){
            for (let i = 0; i < weapons.length; i++){
                weapons[i].addEventListener("dragstart", () => console.log("drag"))
                weapons[i].addEventListener("dragend",  () =>{
                    const nodes = document.querySelectorAll( ":hover")
                    const arr = []
    
                    nodes.forEach((e)=>{
                        arr.push(e.id)
                    })
    
                    if (arr.includes('primary')){
                        const primaryBox = document.getElementById('primary')
                        const name = weapons[i].childNodes[3].innerHTML
                        const img = weapons[i].childNodes[1].firstChild.src
    
                        primaryBox.innerHTML = `<div class="text">${name}</div>
                        <div class="image"><img src=${img}></div>`
    
                    } else if (arr.includes('secondary')){
                        const secondaryBox = document.getElementById('secondary')
                        const name = weapons[i].childNodes[3].innerHTML
                        const img = weapons[i].childNodes[1].firstChild.src
    
                        secondaryBox.innerHTML = `<div class="text">${name}</div>
                        <div class="image"><img src=${img}></div>`
                    }
                })
            }
        } else if (type === "health" || type === "grenades" || type === "ammo") {
            //for each one, do the same as above except for backpack
            for (let i = 0; i < weapons.length; i++){
                weapons[i].addEventListener("dragstart", () => console.log("drag"))
                weapons[i].addEventListener("dragend",  () =>{
                    const nodes = document.querySelectorAll(":hover")
                    const arr = []
                    console.log(nodes)
                })
            }
        }

    };

    function get(t){
        //if type is a weapon, fetch weapons, if type is an item, fetch items
        if (t === "ar" || t === "smg" || t === "lmg" || t === "marksman" || t === "sniper" || t === "shotgun" || t === "pistol"){
            fetch('http://localhost:3000/weapons')
            .then(res => res.json())
            .then(data => fill(data[t]))
        } else if (t === "health" || t === "grenades" || t === "ammo"){
            fetch('http://localhost:3000/items')
            .then(res => res.json())
            .then(data => fill(data[t]))
        }
    };

    get(type);
}

function buttonClick(type){
    if (weaponMenu.style.display === "none") {
        console.log("closed")
        weaponMenu.style.display = "block"
        menuButton.style.display = "block"
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
        menuButton.style.display = "none"
    }
}