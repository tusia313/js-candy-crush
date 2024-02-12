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
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundColor = candyColors[randomColor]
        square.setAttribute('draggable', true)
        square.setAttribute('id', i)
        grid.appendChild(square)
        squares.push(square)
        console.log(this.id)
    }
}
createBoard()

// drag a candy

let colorBeingDragged

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart() {
    colorBeingDragged = this.style.backgroundColor
    console.log(colorBeingDragged)
    console.log(this.id, 'dragStart')
}

function dragEnd() {
    console.log(this.id, 'dragEnd')
}

function dragOver() {
    console.log(this.id, 'dragOver')
}

function dragEnter() {
    console.log(this.id, 'dragEnter')
}

function dragLeave() {
    console.log(this.id, 'dragLeave')
}

function dragDrop() {
    console.log(this.id, 'dragDrop')
}