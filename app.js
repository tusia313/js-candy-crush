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

// drop candies once someone has been cleared them
function moveDown() {
    // sprawdzanie elementów do rzędu poniżej, czyli wypada nam ostatni rzad 
    for (i = 0; i < 55; i++) {
        // Jeśli element poniżej jest pusty to ma wykonać się następujaco:
        if (squares[i + width].style.backgroundImage === '') {
            // 1.Ten pusty kwadrat wypełniamy kolorem
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            // 2.A ponad nim puste - w końcu on spada w dół :)
            squares[i].style.backgroundImage = ''
        }
    }

      // Uzupełnianie braków na górze
      for (let i = 0; i < width; i++) {
        if (squares[i].style.backgroundImage === '') {
            // Tworzymy nowy cukierek na górze, np. losując jego kolor
            let randomCandy = Math.floor(Math.random() * candyColors.length);
            squares[i].style.backgroundImage = candyColors[randomCandy];
        }
    }
       // alterantywna wersja, gdyby logika była trudniejsza
    // const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
    // const isFirstRow = firstRow.includes(i)
    // if (isFirstRow && squares[i].style.backgroundImage === '') {
    //     let randomCandy = Math.floor(Math.random() * candyColors.length);
    //         squares[i].style.backgroundImage = candyColors[randomCandy];
    // }
}
moveDown()

// checking for matching
// check row for three
function checkRowForThree() {
    for (i = 0; i < 61; i++) {
        let rowOfThree = [i, i + 1, i + 2]
        let decidedColor = squares[i].style.backgroundImage
        // super zabieg logiczny!
        const isBlank = squares[i].style.backgroundImage === ''
        // .every(): Sprawdza, czy każdy element w tablicy spełnia określony warunek. Zwraca true, jeśli wszystkie elementy tablicy spełniają warunek; w przeciwnym razie false.

        // zastasowanie .includes i continue
        const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
        if (notValid.includes(i)) continue

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
        let columnOfThree = [i, i + width, i + width * 2]
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

// check row for four
function checkRowForFour() {
    for (i = 0; i < 60; i++) {
        let rowOfFour = [i, i + 1, i + 2, i + 3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
        if (notValid.includes(i)) continue

        if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 4
            rowOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkRowForFour()

// check column for four
function checkColumnForFour() {
    for (i = 0; i < 46; i++) {
        let columnOfFour = [i, i + width, i + width * 2, i + width * 3]
        let decidedColor = squares[i].style.backgroundImage
        const isBlank = squares[i].style.backgroundImage === ''
        if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
            score += 3
            columnOfFour.forEach(index => {
                squares[index].style.backgroundImage = ''
            })
        }
    }
}
checkColumnForFour()


window.setInterval(function () {
    moveDown()
    checkRowForFour()
    checkColumnForFour()
    checkRowForThree()
    checkColumnForThree()
    moveDown()
}, 150)