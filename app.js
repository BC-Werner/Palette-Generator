// ----------------------------------- Global Variables -----------------------------------
const list = document.getElementById('colorList')
const button = document.querySelector('.randomize')
const overlay = document.querySelector('.overlay')

const max = Math.floor(255)
const min = Math.ceil(1)

let squares = []


// ----------------------------------- Functions -----------------------------------
function initializeSquares() {    
    for (let i = 0; i < 6; i++) {
        let newItem = document.createElement("li")
        newItem.classList.add('color')
    
        list.appendChild(newItem)

        squares.push({square: newItem, isLocked: false})
        
    }
}

function randomizeColors() {
    squares.forEach(sq => {
        if (sq.isLocked != true) {
            rNum = Math.floor(Math.random() * (max - min + 1) + min)
            rNum2 = Math.floor(Math.random() * (max - min + 1) + min)
            rNum3 = Math.floor(Math.random() * (max - min + 1) + min)
        
            sq.square.style.backgroundColor = `rgb(${rNum}, ${rNum2}, ${rNum3})`
        }
    })
}

function buttonControl() {
    randomizeColors()

    button.style.transform = "scale(0.9)"
    button.style.outlineStyle = "solid"
    button.style.outlineWidth = "3px"
    button.style.outlineColor = "#fff"
    button.style.outlineOffset = "2px"
    button.style.mozOutlineRadius = "4px"

    setTimeout(() => {
        button.style.transform = "scale(1)"
        button.style.outline = "none"
    }, 1000 * 0.15);
}

function copyToClipboard(value) {
    const text = document.createElement('textarea')
    text.value = value
    console.log(text.value)
    document.body.appendChild(text)
    text.select()
    document.execCommand('copy')
    document.body.removeChild(text)
}

function displayOverlay(color) {
    overlay.style.backgroundColor = color
    overlay.style.visibility = 'visible'
    overlay.style.opacity = '0.9'

    setTimeout(() => {
        overlay.style.visibility = 'hidden'
        overlay.style.opacity = '0'
    }, 1000 * 0.8);
}


// -----------------------------------Initialize -----------------------------------
initializeSquares()
randomizeColors()


// -----------------------------------Event Listeners -----------------------------------
button.addEventListener('click', buttonControl)
squares.forEach(sq => {
    sq.square.addEventListener('mouseenter', () => {
        sq.square.innerText = sq.square.style.backgroundColor
    })
    sq.square.addEventListener('mouseleave', () => {
        sq.square.innerText = ''
    })
    sq.square.addEventListener('click', () => {
        const text = document.createElement('textarea')
        text.value = sq.square.style.backgroundColor
        document.body.appendChild(text)
        text.select()
        document.execCommand('copy')
        document.body.removeChild(text)

        displayOverlay(text.value)
    })
})