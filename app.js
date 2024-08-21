const grid = document.querySelector('.grid')
const width = 8
const squares = []
let score = 0

const candyColors = [
    'url(images/blue-candy.png)',
    'url(images/green-candy.png)',
    'url(images/red-candy.png)',
    'url(images/orange-candy.png)',
    'url(images/yellow-candy.png)',
    'url(images/purple-candy.png)'
]

// making Board
function createBoard() {
    // looping it 64 times 
    for (let i = 0; i < width * width; i++) {
        const square = document.createElement('div')
        square.setAttribute('draggable', true)
        // SUPER useful! Add a unique id to the square
        square.setAttribute('id', i)
        let randomColor = Math.floor(Math.random() * candyColors.length)
        square.style.backgroundImage = candyColors[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}
createBoard()

// drag a candy, we use inbuilt methods
let colorBeingDragged
let colorBeingReplaced
let squareIdBeingDragged
let squareIdBeingReplaced

squares.forEach(square => square.addEventListener('dragstart', dragStart))
squares.forEach(square => square.addEventListener('dragend', dragEnd))
squares.forEach(square => square.addEventListener('dragover', dragOver))
squares.forEach(square => square.addEventListener('dragenter', dragEnter))
squares.forEach(square => square.addEventListener('dragleave', dragLeave))
squares.forEach(square => square.addEventListener('drop', dragDrop))

function dragStart() {
    colorBeingDragged = this.style.backgroundImage
    squareIdBeingDragged = parseInt(this.id)
    console.log(this.id, 'dragStart')
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragOver')
}

function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragEnter')
}

function dragLeave() {
    console.log(this.id, 'dragLeave')
}

function dragDrop() {
    console.log(this.id, 'drop')
    colorBeingReplaced = this.style.backgroundImage
    squareIdBeingReplaced = parseInt(this.id)
    // kluczowe linijki, jezeli ruch jest dozwolony, to zamieniamy kolory
    this.style.backgroundImage = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
}

function dragEnd() {
    console.log(this.id, 'dragEnd')
    // Sprawdzamy, czy ruch jest dozwolony
    let validMoves = [
        squareIdBeingDragged - 1, // lewo
        squareIdBeingDragged + 1, // prawo
        squareIdBeingDragged - width, // góra
        squareIdBeingDragged + width // dół
    ]
    // .includes(): Jest to metoda wbudowana w JavaScript dla tablic, która sprawdza, czy dana wartość znajduje się w tablicy. Zwraca true lub false
    let validMove = validMoves.includes(squareIdBeingReplaced)

    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
        console.log('Ruch jest dozwolony')
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
        squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
        console.log('Ruch jest nielegalny, cofnięcie ruchu')
    } else squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
}

// checking for matching
// check row for three

function checkRowForThree() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2]
        let decidedColor = squares[i].style.backgroundImage
        // super zabieg logiczny!
        const isBlank = squares[i].style.backgroundImage === ''
// .every(): Sprawdza, czy każdy element w tablicy spełnia określony warunek. Zwraca true, jeśli wszystkie elementy tablicy spełniają warunek; w przeciwnym razie false.
        if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            // Wykonuje podaną funkcję dla każdego elementu tablicy.
            rowOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForThree()

// check column for three

function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
        // używamy width, bo indeksy obok siebie s rozne!
        let columnOfThree = [i, i + width, i + width*2]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            columnOfThree.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkColumnForThree()

window.setInterval(function() {
    checkRowForThree()
    checkColumnForThree()
}, 100)