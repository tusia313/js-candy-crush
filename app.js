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
    colorBeingDragged = this.style.backgroundColor
    squareIdBeingDragged = parseInt(this.id)
    console.log(colorBeingDragged)
    console.log(this.id, 'dragStart')
}

function dragEnter(e) {
    e.preventDefault()
    console.log(this.id, 'dragEnter')
}

function dragOver(e) {
    e.preventDefault()
    console.log(this.id, 'dragOver')
}

function dragLeave() {
    console.log(this.id, 'dragLeave')
}

function dragDrop() {
    console.log(this.id, 'dragDrop')
    colorBeingReplaced = this.style.backgroundColor
    squareIdBeingReplaced = parseInt(this.id)
    this.style.backgroundColor = colorBeingDragged
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
}

function dragEnd() {
    console.log(this.id, 'dragEnd')
// what is valid moves? te wartości reprezentują możliwe ruchy w grze, które wynikają z przeciągnięcia kwadratu. Na przykład, jeśli gracz przeciągnie kwadrat na prawo, to możliwe ruchy będą kwadraty znajdujące się o jeden w lewo, jeden w górę, jeden w prawo oraz jeden w dół od przeciągniętego kwadratu

    let validMoves = [
        squareIdBeingDragged - 1,
        squareIdBeingDragged - width,
        squareIdBeingDragged + 1,
        squareIdBeingDragged + width
    ]
// jest to przydatne, jeśli chcesz sprawdzić, czy ruch dokonany przez gracza jest dopuszczalny, tj. czy kwadrat, na który gracz chce przesunąć element, jest jednym z możliwych ruchów na podstawie aktualnego stanu gry.
    let validMove = validMoves.includes(squareIdBeingReplaced)
// Następnie, warunek if (squareIdBeingReplaced && validMove) sprawdza, czy squareIdBeingReplaced istnieje i czy ruch jest uznawany za prawidłowy (czyli jeśli validMove jest true). Jeśli tak, to znaczy, że ruch jest dopuszczalny, więc squareIdBeingReplaced jest ustawiany na null. W ten sposób uniemożliwia się dalsze przetwarzanie tej zmiennej w przypadku powtórzenia ruchu lub ruchu, który nie jest dopuszczalny.

// Natomiast, warunek else if (squareIdBeingReplaced && !validMove) sprawdza, czy squareIdBeingReplaced istnieje i czy ruch nie jest uznawany za prawidłowy (czyli jeśli validMove jest false). Jeśli tak, oznacza to, że gracz próbuje wykonać ruch, który nie jest dozwolony. W takim przypadku kolor przeciąganego kwadratu (squareIdBeingDragged) zostaje przywrócony do oryginalnego koloru, a kolor kwadratu docelowego (squareIdBeingReplaced) zostaje zachowany.

// Ostatecznie, jeśli żaden z powyższych warunków nie jest spełniony, oznacza to, że nie ma squareIdBeingReplaced, co sugeruje, że nie było przeciągnięcia na kwadrat. W tym przypadku kolor przeciągniętego kwadratu (squareIdBeingDragged) jest po prostu przywracany do oryginalnego koloru.
    if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null
    } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
    } else squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
} 

// Checking for matches
function checkForThree() {
    for (let i = 0; i < 61; i++) {
        let rowOfThree = [i, i+1, i+2]
        // pobierany jest kolor pierwszego kwadratu (decidedColor) i sprawdzane jest, czy jest on pusty (czyli czy kwadrat jest pusty). To jest zapisywane w zmiennej isBlank.
        let decidedColor = squares[i].style.backgroundColor
        let isBlank = squares[i].style.backgroundColor === ''

        if(rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            rowOfThree.forEach(squares[index].style.backgroundColor = '')
        }

    }
}

