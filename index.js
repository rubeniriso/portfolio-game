const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')   
canvas.style = "background-color: black"
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const offset = {
    x: -window.innerWidth/2,
    y: -window.innerHeight/2
}
const speed = 6
const playerDownImage = new Image()
playerDownImage.src = './img/playerDown32.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp32.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft32.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight32.png'

const interactButtonImage = new Image()
interactButtonImage.src = './img/interact.png'

const fireplaceMap = []
for (let i = 0; i < fireplaceArray.length; i += 36){
    fireplaceMap.push(fireplaceArray.slice(i, 36 + i))
}
let currentDialog = ''
const fireplace = []
fireplaceMap.forEach((row, i) => {
    row.forEach((col, j) => {
        if (col === 1818) {
            fireplace.push(
                new Interactable({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    zoom: zoom,
                    color: 'rgba(0, 255, 0)'
                })
            )
        }
    })
})

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 36){
    collisionsMap.push(collisions.slice(i, 36 + i))
}

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((col, j) => {
        if (col === 1816) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    zoom: zoom,
                    color: 'rgba(255, 0, 0, 0)'
                })
            )
        }
    })
})

function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y 
    )
}
const dialogModal = new DialogModal({
    text: 'henlo'
})
const player = new Sprite({
    position: {
        x: canvas.width / 2 - 384 / 4 / 2, 
        y: canvas.height / 2 - 136  / 2,
    },
    image: playerDownImage,
    frames: {
        max: 4
    },  
    sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
    },
    active: true
})
const interactButton = new Sprite({
    position: {
        x: canvas.width / 2 - 63, 
        y: canvas.height / 2 - 120,
    },
    image: interactButtonImage,
    active: false
})

const map = new Image()
map.src = './img/maps/habitacion.png'
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: map
})

const foregroundImage = new Image()
foregroundImage.src = './img/maps/foreground.png'
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage
})
const movables = [background, foreground, ...fireplace, ...boundaries]
let lastKey = ''
function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()
    fireplace.forEach((square) => {
        square.draw()
    })
    dialogModal.draw()
    interactButton.draw()
    let moving = true
    player.moving = false
    let isInFireplace = false
    for (let i = 0; i < fireplace.length; i++){
        const fireplaceSquare = fireplace[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {...fireplaceSquare, position: {
                    x: fireplaceSquare.position.x,
                    y: fireplaceSquare.position.y
                }}
            })
        ){
            
            isInFireplace = true
            break
        }
    }   
    if (isInFireplace) {
        dialogModal.text = dialogues['fireplace']
        interactButton.active = true
    } else {
        dialogModal.text = ''
        interactButton.active = false
        dialogModal.active = false
    }
    if (keys.w.pressed && lastKey === 'w'){
        for (let i = 0; i < boundaries.length; i++){
            player.moving = true
            player.image = player.sprites.up
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + speed
                    }}
                })
            ){
                moving = false
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += speed
            })
        }
    }
    if (keys.s.pressed && lastKey === 's'){
        player.moving = true
        player.image = player.sprites.down
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - speed
                    }}
                })
            ){
                moving = false
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y -= speed 
            })
        }
    }
    if (keys.a.pressed && lastKey === 'a'){
        for (let i = 0; i < boundaries.length; i++){
            player.moving = true
            player.image = player.sprites.left
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x + speed,
                        y: boundary.position.y 
                    }}
                })
            ){
                moving = false
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x += speed
            })
        }
    }
    if (keys.d.pressed && lastKey === 'd'){
        player.moving = true
        player.image = player.sprites.right
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x - speed,
                        y: boundary.position.y
                    }}
                })
            ){
                moving = false
                break
            }
        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.x -= (speed)
            })
        }
    }
}
animate()

