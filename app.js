// document.addEventListener('DOMContentLoaded', () => {

// })

const grid = document.querySelector('.grid')
const width = 8
const squares = []

const candyColors = [
    'pink',
    'yellow',
    'plum',
    'lightgreen',
    'lightblue',
    'orange'
]

// making Board

function createBoard() {
    for (let i=0; i < width*width; i++) {
        const square = document.createElement('div')
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundColor = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}

createBoard()
