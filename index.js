const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')   
canvas.style = "background-color: black"
canvas.width = getWidth()-10
canvas.height = getHeight()-16
const sceneImage = new Image('./assets/img/maps/habitacion.png')
const scene = new Scene(sceneImage)
const offset = {
    x: -canvas.width/2,
    y: -canvas.height/2
}

var socials = document.getElementById('socials')

const speed = 6
const playerDownImage = new Image()
playerDownImage.src = './assets/img/playerDown32.png'

const playerUpImage = new Image()
playerUpImage.src = './assets/img/playerUp32.png'

const playerLeftImage = new Image()
playerLeftImage.src = './assets/img/playerLeft32.png'

const playerRightImage = new Image()
playerRightImage.src = './assets/img/playerRight32.png'

const interactButtonImage = new Image()
interactButtonImage.src = './assets/img/interact.png'

const fireplaceMap = []
for (let i = 0; i < fireplaceArray.length; i += 36){
    fireplaceMap.push(fireplaceArray.slice(i, 36 + i))
}
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
                    color: 'rgba(0, 255, 0, 0)'
                })
            )
        }
    })
})

const deskMap = []
for (let i = 0; i < deskArray.length; i += 36){
    deskMap.push(deskArray.slice(i, 36+i))
}
const desk = []
deskMap.forEach((row, i) => {
    row.forEach((col, j) => {
        if (col === 1818) {
            desk.push(
                new Interactable({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y,
                    },
                    zoom: zoom,
                    color: 'rgba(0, 255, 0, 0)'
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
                    color: 'rgba(255, 0, 0, 0.5)'
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
const dialogModal = new DialogModal({})

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
map.src = './assets/img/maps/habitacion.png'
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: map
})

const foregroundImage = new Image()
foregroundImage.src = './assets/img/maps/foreground.png'
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage
})

const movables = [background, foreground, ...fireplace, ...desk, ...boundaries]
let isInteractableSceneActive = false
let isInDesk = false
let lastKey = ''
let isDialogActive = false
function animate() {
    socials.style.display = 'none'
    scene.animationId = window.requestAnimationFrame(animate)
    if (isInteractableSceneActive) return
    
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()
    fireplace.forEach((square) => {
        square.draw()
    })
    desk.forEach((square) => {
        square.draw()
    })
    dialogModal.draw()
    interactButton.draw()
    
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
        isDialogActive = true
    } else {
        dialogModal.text = ''
    }
    isInDesk = false
    for (let i = 0; i < desk.length; i++){
        const deskSquare = desk[i]
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: {...deskSquare, position: {
                    x: deskSquare.position.x,
                    y: deskSquare.position.y
                }}
            })
        ){
            isInDesk = true
            break
        }
    } 

    if (isInDesk || isInFireplace) {
        interactButton.active = true
    } else {
        interactButton.active = false
        dialogModal.active = false
        isDialogActive = false
    }
    movingFunctions()
}



async function movingFunctions () {
    let moving = true
    player.moving = false
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

