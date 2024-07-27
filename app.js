// document.addEventListener('DOMContentLoaded', () => {

// })

const grid = document.querySelector('.grid')
const width = 8
const squares = []
let score = 0

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

// drop candies once some have benn cleared

function dropDown() {
    for (let i = 0; i < 55; i++) {
        if (squares[i + width].style.backgroundColor === '') {
            squares[i + width].style.backgroundColor = squares[i].style.backgroundColor
            squares[i].style.backgroundColor = ''
            // Po zakończeniu przesuwania kwadratów, sprawdź pierwszy rząd i nadaj losowy kolor pustym kwadratom
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            const isFirstRow = firstRow.includes(i)
            if (isFirstRow && squares[i].style.backgroundColor === '') {
                let randomColor = Math.floor(Math.random() * candyColors.length)
                squares[i].style.backgroundColor = candyColors[randomColor]
            }
        }
    }
}

// Checking for matches
// check for 4 row or column

function checkRowForFour() {
    for (let i = 0; i < 60; i++) {
        let rowOfFour = [i, i + 1, i + 2, i + 3]
        let decidedColor = squares[i].style.backgroundColor
        let isBlank = squares[i].style.backgroundColor === ''

        // zapobiegamy by nam się nasze ROW nie złamało pod koniec wersu
        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 4;
            rowOfFour.forEach(index => squares[index].style.backgroundColor = '');
        }

    }
}
checkRowForFour()

function checkColumnForFour() {
    for (let i = 0; i < 39; i++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        let decidedColor = squares[i].style.backgroundColor
        let isBlank = squares[i].style.backgroundColor === ''

        if (columnOfFour.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 4;
            columnOfFour.forEach(index => squares[index].style.backgroundColor = '');
        }

    }
}
checkColumnForFour()

// check for 3 row or column

function checkRowForThree() {
    for (let i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2]
        // pobierany jest kolor pierwszego kwadratu (decidedColor) i sprawdzane jest, czy jest on pusty (czyli czy kwadrat jest pusty). To jest zapisywane w zmiennej isBlank.
        let decidedColor = squares[i].style.backgroundColor
        let isBlank = squares[i].style.backgroundColor === ''

        // zapobiegamy by nam się nasze ROW nie złamało pod koniec wersu
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (notValid.includes(i)) continue

        if (rowOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            rowOfThree.forEach(index => squares[index].style.backgroundColor = '');
        }

    }
}
checkRowForThree();

function checkColumnForThree() {
    for (let i = 0; i < 45; i++) {
        let columnOfThree = [i, i + width, i + width * 2]
        // pobierany jest kolor pierwszego kwadratu (decidedColor) i sprawdzane jest, czy jest on pusty (czyli czy kwadrat jest pusty). To jest zapisywane w zmiennej isBlank.
        let decidedColor = squares[i].style.backgroundColor
        let isBlank = squares[i].style.backgroundColor === ''

        if (columnOfThree.every(index => squares[index].style.backgroundColor === decidedColor && !isBlank)) {
            score += 3;
            columnOfThree.forEach(index => squares[index].style.backgroundColor = '');
        }

    }
}
checkColumnForThree();

// teraz ustawiamy funkcje, że jeżeli mamy puste przestrzenie to one takie pozostaną
window.setInterval(function () {
    dropDown()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
}, 100)
// warto tutaj dodać jakiś przycisk aktywujący tą funkcje lub dodający inną funkcjonalnośc - no cóz, wszystko przed nami ! :)
