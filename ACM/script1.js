
let nav = document.querySelector('nav')
let container = nav.querySelector('.container-fluid')
let gridContainer = document.querySelector('.container')
let dropDown = undefined //div for dropDown menu
let table = undefined//table for Grid layout
let chance = undefined;
let gridSize = undefined
let isComplete = undefined
// Creating container which contain Grid and Images
let row1 = document.createElement("div")
row1.classList.add("row")
let col = document.createElement('div')
col.classList.add("col")
row1.appendChild(col)


let row2 = document.createElement("div")
row2.classList.add("row","row2")
let col_6_o = document.createElement("div")
col_6_o.classList.add("col-6")
row2.appendChild(col_6_o)

let col_6_x = document.createElement("div")
col_6_x.classList.add("col-6")
row2.appendChild(col_6_x)


// let col_6_o = document.createElement('div')
// col_6_o.classList.add("col-1")
// row1.appendChild(col_6_o)
// let col_6_x = document.createElement('div')
// col_6_x.classList.add("col-1")
// row1.appendChild(col_6_x)

let imgo = document.createElement("img")
imgo.setAttribute("src","o.png")
imgo.setAttribute("alt","O")
col_6_o.appendChild(imgo)

let imgx = document.createElement("img")
imgx.setAttribute("src","x.png")
imgx.setAttribute("alt","x")
col_6_x.appendChild(imgx)
// Container Ends Here

/* Stop button */
/* <button type="button" class="btn btn-secondary">Secondary</button> */
let button = document.createElement('button')
button.setAttribute("type","button")
button.classList.add("btn","btn-secondary")
button.innerText = "Stop"
button.addEventListener("click",(e) =>{
    location.reload()
})
/* Stop Button Ends Here */


/****Dropdown menu for select the size of grid  *****/
dropDown = document.createElement('div')
container.appendChild(dropDown)
dropDown.classList.add('dropdown')
let a1 = document.createElement('a')
a1.setAttribute("href","#")
a1.setAttribute("role","button")
a1.setAttribute("data-bs-toggle","dropdown")
a1.setAttribute("aria-expanded","false")
a1.innerText = "Select Size"
a1.classList.add("btn", "btn-secondary", "dropdown-toggle")
dropDown.appendChild(a1)
let ul = document.createElement('ul')
ul.classList.add("dropdown-menu")
dropDown.append(ul)
let li = document.createElement('li')
ul.appendChild(li)


for(let size =3;size<15;size++){
    let li = document.createElement('li')
    ul.appendChild(li)
    let a2 = document.createElement('a')
    a2.classList.add("dropdown-item")
    a2.setAttribute("href","#")
    li.appendChild(a2)
    a2.innerText = size
    li.addEventListener('click',() => {
            gridSize = size
            createTable()
            gridContainer.appendChild(row1)
            gridContainer.appendChild(row2)
            document.body.appendChild(gridContainer)
            initialize()
            container.removeChild(dropDown)
            container.appendChild(button)
    })
}
/********DropDown Ends Here *****/


//Grid Layout

const createTable = () => {
    table = document.createElement('table')
    table.setAttribute("border",3)
    table.setAttribute("align","center")
    let tbody = document.createElement('tbody')
    table.appendChild(tbody)
    for(let i=0;i<gridSize;i++){
        let tr = document.createElement('tr')
        for(let j=0;j<gridSize;j++){
            let td = document.createElement('td')
            td.innerText = ``
            td.setAttribute("id",`${i}${j}`)
            td.setAttribute("scope","col")
            tr.appendChild(td)
            td.addEventListener("click",() => {
                elementClicked(td)
            })


            let img = document.createElement("img")
            img.setAttribute("src","n.png")
            img.setAttribute("alt","n")
            td.append(img)

        }
        tbody.appendChild(tr)
    }
    col.appendChild(table)
}
//End of Grid Layout

/* Initialilze the chance variable which take care of current chance is of player1 and player2*/

const initialize = () => {
    chance = false
    isComplete = false
    changePlayer()
}
const changePlayer = () => {
    if(chance)
        chance = false
    else    
        chance = true
    if(chance){
        col_6_o.classList.add("colorO")
        col_6_x.classList.remove("colorX")
    }else{
        col_6_x.classList.add("colorX")
        col_6_o.classList.remove("colorO")
    }
}

const elementClicked = async(td) => {
    if(isComplete) return
    if(!(td.classList.contains("colorX") || td.classList.contains("colorO"))){
        if(chance){
            let i = td.querySelector('img')
            td.removeChild(i);
            let img = document.createElement("img")
            img.setAttribute("src","o.png")
            img.setAttribute("alt","o")
            td.append(img)
            td.classList.add('colorO')
            
        }else{
            let i = td.querySelector('img')
            td.removeChild(i);
            let img = document.createElement("img")
            img.setAttribute("src","x.png")
            img.setAttribute("alt","x")
            td.classList.add("colorX")
            td.append(img)
        }
        if(checkGame(td)){
            
            if(!isComplete){
                win()   
            }else{
                let h = document.createElement("h1");
                h.setAttribute('align','Center')
                h.innerText = `--GAME DRAW--`
                document.body.appendChild(h)
            }
            setTimeout(() => {  gameFinished() }, 5000)
        }else{
            changePlayer()
        }  
    }
} 

const checkGame = td => {
    let id = td.id
    let r=Number(id.charAt(0))
    let c = Number(id.charAt(1))
    if(checkRow(r)){
        // gameFinished palyer wins
        colorRow(r)
        return true
    }
    if(checkCol(c)){
        //gameFinished player wins
        colorCol(c)
        return true
    }
    if(checkDiagnols()){
        //game finished player wins
        return true
    }
    for(let i=0;i<gridSize;i++){
        for(let j=0;j<gridSize;j++){
            let block =table.querySelector(`[id='${i}${j}']`)
            if(!(block.classList.contains("colorX") || block.classList.contains("colorO"))){
                return false;
            }
        }
    }
    isComplete = true;
    return true;
}
const colorRow = rN => {
    for(let i=0;i<gridSize;i++){
        let block =table.querySelector(`[id='${rN}${i}']`)
        block.classList.add('colorW')
    }
}
const colorCol = cN => {
    for(let i=0;i<gridSize;i++){
        let block =table.querySelector(`[id='${i}${cN}']`)
        block.classList.add('colorW')
    }
}
const colorDiagonal = isPrinciple => {
    for(let i=0;i<gridSize;i++){
        let c = isPrinciple?i:gridSize-1-i
        let block =table.querySelector(`[id='${i}${c}']`)
        block.classList.add('colorW')
    }
}
const checkRow = rN => {
    let className = undefined
    if(chance)
        className = "colorO"
    else
        className = "colorX"

    for(let j=0;j<gridSize;j++){
        let block =table.querySelector(`[id='${rN}${j}']`)
        // console.log(block)
        if(!(block.classList.contains(className)))
            return false;
    }
    return true;
    
}
const checkCol = cN => {
    let className = undefined
    if(chance)
        className = "colorO"
    else
        className = "colorX"

    for(let j=0;j<gridSize;j++){
        let block =table.querySelector(`[id='${j}${cN}']`)
        if(!(block.classList.contains(className)))
            return false;
    }
    return true;
}
const checkDiagnols = () => {
    //principle diangonal
    if(checkPricipleDiagonal()){
        colorDiagonal(true)
        return true
    }
    //non-principle diagonal
    if(checkNonPrincipleDiagonal()){
        colorDiagonal(false)
        return true
    }
    return false
}
const checkPricipleDiagonal = () => {
    let className = undefined
    if(chance)
        className = "colorO"
    else
        className = "colorX"

    for(let i=0;i<gridSize;i++){
        let block =table.querySelector(`[id='${i}${i}']`)
        if(!(block.classList.contains(className)))
            return false
    }
    return true
}
const checkNonPrincipleDiagonal = () => {
    let className = undefined
    if(chance)
        className = "colorO"
    else
        className = "colorX"
    for(let i=0;i<gridSize;i++){
        let block =table.querySelector(`[id='${i}${gridSize-1-i}']`)
        if(!(block.classList.contains(className)))
            return false
    }
    return true
}
const gameFinished = () =>{
    location.reload()
}
const win = () => {
    isComplete = true;
    if(chance){
        // console.log("O Wins")
        col_6_o.classList.add("colorW")
    }else{
        // console.log("X Wins")
        col_6_x.classList.add("colorW")
    }
    let h = document.createElement("h1");
    h.setAttribute('align','Center')
    h.innerText = `${chance ? 'O':'X'} WINS`
    document.body.appendChild(h)
    for(let i=0;i<gridSize;i++){
        for(let j=0;j<gridSize;j++){
            let block =table.querySelector(`[id='${i}${j}']`)
            block.removeEventListener('click',elementClicked)
        }
    }
}
