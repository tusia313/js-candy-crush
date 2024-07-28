

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
    // looping it 64 times 
    for(let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
        console.log(square)
    }
}

createBoard()

// drag a candy

