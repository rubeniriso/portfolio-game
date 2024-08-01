const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.style = "background-color: black"
canvas.width = 1600
canvas.height = 800
const zoom = 2.5
const offset = {
    x: 0,
    y: -400
}
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 20){
    collisionsMap.push(collisions.slice(i, 20 + i))
}

class Boundary {
    static height = 32 * zoom
    static width = 32 * zoom
    constructor({position, zoom}) {
        this.position = position
        this.width = zoom * 32
        this.height = zoom * 32
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
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
                    zoom: zoom
                })
            )
        }
    })
})
console.log(boundaries);
class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.velocity = velocity
        this.image = image
    }

    draw() {
        c.drawImage(
            this.image, 
            0, 
            0, 
            this.image.width / 4, 
            this.image.height, 
            canvas.width / 2 - this.image.width / 4 / 2, 
            canvas.height / 2 - this.image.height  / 2,
            this.image.width / 4, 
            this.image.height      
        )
    }
}


const map = new Image()
map.src = './img/maps/habitacion.png'

const background = new Sprite(
    {
        position: {
            x: offset.x,
            y: offset.y,
    },
    image: map
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const playerImage = new Image()
playerImage.src = './img/playerDown32.png'

const movables = [background, boundaries]

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
  
    if (playerImage.position.x + playerImage.width)
    if (keys.w.pressed){
        background.position.y += 6  

    }
    if (keys.s.pressed){
        background.position.y -= 6  

    }
    if (keys.a.pressed){
        background.position.x += 6  

    }
    if (keys.d.pressed){
        background.position.x -= 6   

    }
}
animate()

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})


